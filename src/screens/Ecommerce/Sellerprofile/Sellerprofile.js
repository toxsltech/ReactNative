import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Dash from 'react-native-dash';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { isEmpty } from '../../../utils/globals';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import showNotification from '../../../utils/services'
import { androidHeight, iosHeight } from '../../../utils/constants';

const options = {
    title: 'Select Picture',
    quality: 0.75,
    storageOptions: {
        skipBackup: true,
    },
};
export default class Sellerprofile extends Component {
    constructor() {
        super();
        this.state = {
            fullNameOfSeller: '',
            business: '',
            description: '',
            lat: 30.6496,
            long: 76.7567,
            address: '',
            Image: '',
            storeName: "",
            source: '',
            loadingback: false
        }
    }
    post = () => {
        const { fullNameOfSeller, business, description, lat, long, address, storeName, source } = this.state
        if (this.verifyCredentials()) {
            this.setState({ loadingback: true })
            this.props.sellerProfile(fullNameOfSeller, business, description, lat, long, address, storeName, source).then(() => this.afterPost())
        }
    }

    verifyCredentials = () => {
        const { fullNameOfSeller, business, description, lat, long, address, storeName, Image } = this.state;
        if (isEmpty(fullNameOfSeller.trim())) {
            alert('Please enter user name');
            return false;
        } else if (isEmpty(business.trim())) {
            alert('Please enter business');
            return false;
        } else if (isEmpty(storeName.trim())) {
            alert('Please enter store name');
            return false;
        }
        else if (isEmpty(address.trim())) {
            alert('Please enter address');
            return false;
        }
        else if (isEmpty(description.trim())) {
            alert('Please enter description');
            return false;
        }
        return true;
    };
    afterPost = () => {
        this.setState({ loadingback: false })
        if (this.props.SellerResponse.data.success) {
            showNotification("success", 'Seller request send successfully');
            this.props.navigation.navigate('Setting')
        } else {
            showNotification("danger", this.props.SellerResponse.data.message);
        }
    }
    getImage = async () => {
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
                this.setState({ Image: ImgSource, source: ImgSource });
            }
        });
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
                {this.state.loadingback && (
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            position: 'absolute',
                            zIndex: 1000,
                        }}>
                        <ActivityIndicator
                            color={'white'}
                            size={'large'}
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                top: 0,
                                bottom: 0,
                            }}
                        />
                    </View>
                )}
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('23') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 140 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: wp('4.5'), }}>Seller Profile</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                </View>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}>
                    <View style={{ flex: 6, }}>

                        <View style={styles.imageContainerBox}>

                            <View style={styles.imageBoxBottomContainer} />
                            <TouchableOpacity
                                onPress={this.getImage}
                                style={styles.imageContainer}>
                                <Image
                                    source={
                                        this.state.Image
                                            ? { uri: this.state.Image.uri }
                                            : require('../../../assets/images/model.jpg')
                                    }
                                    style={styles.image}
                                />

                                <Image
                                    source={require('../../../assets/icons/camera.png')}
                                    style={styles.cameraIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.textmainview}>
                            <Text style={styles.textmain}>Full Name</Text>
                            <TextInput
                                placeholder='Please enter your name...'
                                onChangeText={(fullNameOfSeller) => this.setState({ fullNameOfSeller })}
                                style={styles.textinput}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this.nameTextInput.focus();
                                }}
                            />
                        </View>
                        <Dash
                            dashGap={5}
                            style={{ width: '100%', }}
                            dashColor='#bdc3c7'
                            dashThickness={1}
                        />
                        <View style={styles.textmainview}>

                            <Text style={styles.textmain}>Business Name</Text>
                            <TextInput
                                ref={(input) => {
                                    this.nameTextInput = input;
                                }}
                                placeholder='Please enter your Business name...'
                                onChangeText={(business) => this.setState({ business })}
                                onSubmitEditing={() => {
                                    this.emailTextInput.focus();
                                }}
                                returnKeyType={'next'}
                                style={styles.textinput}
                            />
                        </View>
                        <Dash
                            dashGap={5}
                            style={{ width: '100%', }}
                            dashColor='#bdc3c7'
                            dashThickness={1}
                        />
                        <View style={styles.textmainview}>

                            <Text style={styles.textmain}>Store Name</Text>
                            <TextInput
                                ref={(input) => {
                                    this.emailTextInput = input;
                                }}
                                placeholder='Please enter store name...'
                                onChangeText={(storeName) => this.setState({ storeName })}
                                style={styles.textinput}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this.numberTextInput.focus();
                                }}
                            />
                        </View>
                        <Dash
                            dashGap={5}
                            style={{ width: '100%', }}
                            dashColor='#bdc3c7'
                            dashThickness={1}

                        />
                        <View style={styles.textmainview}>

                            <Text style={styles.textmain}>Location</Text>
                            <TextInput
                                ref={(input) => {
                                    this.numberTextInput = input;
                                }}
                                placeholder='Please enter your Location'
                                onChangeText={(address) => this.setState({ address })}
                                returnKeyType={'next'}
                                onSubmitEditing={() => {
                                    this.addressTextInput.focus();
                                }}
                                style={styles.textinput}
                            />
                        </View>
                        <Dash
                            dashGap={5}
                            style={{ width: '100%', }}
                            dashColor='#bdc3c7'
                            dashThickness={1}
                        />

                        <View style={styles.textmainview}>

                            <Text style={styles.textmain}>Description</Text>
                            <TextInput
                                ref={(input) => {
                                    this.addressTextInput = input;
                                }}
                                placeholder='Please write description'
                                onChangeText={(description) => this.setState({ description })}
                                returnKeyType={'done'}
                                multiline={true}
                                style={{ ...styles.textinput, maxHeight: 100 }}
                            />
                        </View>
                        <Dash
                            dashGap={5}
                            style={{ width: '100%', }}
                            dashColor='#bdc3c7'
                            dashThickness={1}
                        />
                        <View style={{ alignItems: 'center', }}>
                            <TouchableOpacity onPress={() => this.post()}>
                                <View style={styles.button}>
                                    <Text style={{ fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>Send Request</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginVertical: wp('9')
    },
    textmain: {
        // color: '#bdc3c7',
        fontSize: wp('4')
    },
    textmainview: {
        marginHorizontal: wp('6'),
        marginTop: wp('4'),
       
    },
    textinput: {
    
        paddingVertical: 15,
        width: wp('60'),
        fontFamily: 'Poppins-Medium',
        fontSize: wp('3.5'),
        // paddingBottom:10,
    },
    imageContainerBox: {
        height: hp('18'),
        // backgroundColor: '#ffce31',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBoxTopContainer: {
        height: hp('9'),
        width: '100%',
        backgroundColor: '#ffce31',
    },
    imageBoxBottomContainer: {
        height: hp('9'),
        width: '100%',

        backgroundColor: 'white',
    },
    imageContainer: {
        height: wp('23'),
        width: wp('23'),
        borderRadius: wp('23'),
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // borderWidth: 4,
        // borderColor: '#ecf0f1'
    },
    image: {
        height: wp('23'),
        width: wp('23'),
        borderRadius: wp('23'),
        flex: 1,

    },
    cameraIcon: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        position: 'absolute',

    },
})
