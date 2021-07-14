
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../themes/Fonts';
import InputField from '../../components/InputField';
import MessageBubble from '../../ecommerceComponents/MessageBubble'
import ImagePicker from 'react-native-image-picker';
import { BASE_URL } from '../../utils/env'
import showNotification from '../../utils/services'
import AsyncStorage from '@react-native-async-storage/async-storage';


const options = {
    title: 'Select Picture',
    quality: 0.75,
    storageOptions: {
        skipBackup: true,
    },
};

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: [],
            text: '',
            payload: null,
            userId: ""
        };
    }

    componentDidMount = async () => {
        setInterval(() => {
            this.getMessage()
        }, 200);
        const USERID = await AsyncStorage.getItem('USERID')
        this.setState({ userId: USERID })
    }

    pickPayload = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                let ImgSource = {
                    name:
                        response.fileName !== null ? response.fileName : response.fileName,
                    type: 'image/*',
                    uri: response
                        ? Platform.OS === 'android'
                            ? response.uri
                            : response.uri.replace('file://', '')
                        : null,
                };
                if (!ImgSource.name) {
                    ImgSource.name = 'img';
                }
                const source = { uri: response.uri };
                this.setState({ payload: ImgSource });
            }
        });
    };
    getMessage = async () => {
        const { chatId } = this.props.route.params
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'chat/chatDetails/' + chatId, {
            method: 'GET',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }

        })
            .then((response) => response.json())
            .then((json) => {

                this.setState({ chat: json.text })
            }
            )
            .catch(err => {

                showNotification("danger", err.message);
            })
    }

    sendMessage = async () => {
        const { sellerId } = this.props.route.params;
        const { text, payload } = this.state;
        this.setState({ loadingVideoback: true })
        var token = await AsyncStorage.getItem('token');
        let formData = new FormData()
        formData.append('message', text)
        formData.append('receiverId', sellerId)
        formData.append('image', payload);

        fetch(BASE_URL + 'chat/sendMessage/', {
            method: 'POST',
            headers: {
                'x-token': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            body: formData

        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    loadingVideoback: false,
                    text: '',
                    payload: null,
                    chatId: json.message._id
                })
                this.getMessage()
                setTimeout(() => {
                    this.flatList.scrollToEnd({ animated: true });
                }, 200);
            }
            )
            .catch(err => {
                this.setState({ loadingVideoback: false })
                showNotification("danger", err.message);
            })
    }

    render() {
        const { chat, payload } = this.state;
        const { user_name } = this.props.route.params;

        return (
            <Container style={{ flex: 1, paddingTop: 25 }}>
                <AppHeader
                    titleLeftAlign
                    containerStyle={styles.header}
                    left={
                        <View style={styles.leftIconContainer}>
                            <Image
                                source={require('../../assets/icons/left_chevron2.png')}
                                style={styles.HeaderleftIcon}
                            />
                        </View>
                    }
                    leftPress={() => this.props.navigation.goBack()}
                    body={
                        <ResponsiveText style={styles.headertitle}>
                            {user_name}
                        </ResponsiveText>
                    }
                />
                <View style={styles.clearFix} />
                <FlatList
                    ref={(ref) => (this.flatList = ref)}
                    data={chat}
                    contentContainerStyle={styles.contentContainer}
                    keyExtractor={(item, index) => `${index}`}
                    onContentSizeChange={() => { this.flatList.scrollToEnd({ animated: true }) }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <MessageBubble
                                sent_by={item.senderId._id}
                                profile_image={item.profile_image}
                                type={item.messageType}
                                text={item.message}
                                image_url={item.image}
                                seen={item.isRead}
                                USERID={this.state.userId}
                            />
                        );
                    }}
                />
                {payload && (
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            bottom: 80,
                        }}>
                        <View style={{ height: 60, width: 60, marginLeft: 20 }}>
                            <Image
                                source={{ uri: this.state.payload.uri }}
                                style={{ height: 60, width: 60, borderRadius: 5 }}
                            />
                            <TouchableOpacity
                                onPress={() => this.setState({ payload: null })}
                                style={styles.imageCrossContainer}>
                                <Image
                                    source={require('../../assets/icons/cross.png')}
                                    style={styles.crossIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                <View style={styles.sendInputContainer}>
                    <InputField
                        CameraPress={this.pickPayload}
                        CameraIcon={true}
                        placeholder={'Write your message here ...'}
                        inputField={{ fontSize: wp('3.3') }}
                        containerStyle={styles.SendInput}
                        value={this.state.text}
                        right={
                            <View style={styles.sendButton}>
                                <Image
                                    source={require('../../assets/icons/ic_send.png')}
                                    style={styles.sendIcon}
                                />
                            </View>
                        }

                        rightPress={
                            this.state.text.trim().length > 0 || this.state.payload
                                ? this.sendMessage
                                : null
                        }
                        rightStyle={{ padding: 0, marginRight: -5 }}
                        onChangeText={(e) => this.setState({ text: e })}
                    />
                </View>
            </Container>
        );
    }
}

export default Messages;

const styles = {
    header: {},
    leftIconContainer: {
        padding: 7,
    },
    HeaderleftIcon: {
        height: wp('3.5'),
        width: wp('3.5'),
        resizeMode: 'contain',
        // backgroundColor: 'red'
    },
    headerNotificationIcon: {
        height: wp('8'),
        width: wp('8'),
        resizeMode: 'contain',
    },
    headertitle: {
        fontFamily: Fonts.OpenSansRegular,
        fontSize: 5.5,
    },
    clearFix: {
        height: wp('0.4'),
        backgroundColor: '#E1E1E1',
        // marginBottom:wp('4')
    },
    sendInputContainer: {
        height: wp('20'),
        width: wp('100'),
        bottom: 0,
        borderTopWidth: wp('0.3'),
        borderTopColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SendInput: {
        width: wp('91'),
        backgroundColor: '#F2F2F2',
        paddingLeft: wp('4'),
        borderWidth: 0,
        borderRadius: wp('10'),
        height: wp('13'),
        paddingRight: 2,

    },
    sendButton: {
        height: wp('10'),
        width: wp('10'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        height: wp('10'),
        width: wp('10'),
        resizeMode: 'contain',
    },
    contentContainer: {
        flexGrow: 1,
        paddingVertical: wp('2.2'),
    },
    imageCrossContainer: {
        backgroundColor: '#0089FF',
        position: 'absolute',
        height: 28,
        width: 28,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        right: -5,
        top: -5,
        borderWidth: 1,
        borderColor: 'white',
    },
    crossIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        tintColor: 'white',
    },
};


