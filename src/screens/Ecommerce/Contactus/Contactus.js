import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Dash from 'react-native-dash';
import { isEmpty, isValidEmail } from '../../../utils/globals';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class Contactus extends Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            Email: '',
            message: '',

            loadingback: false
        }
    }
    verifyCredentials = () => {
        const { fullName, Email, message } = this.state;
        if (isEmpty(fullName.trim())) {
            alert('Please enter name');
            return false;
        }
        else if (isEmpty(Email.trim())) {
            alert('Please enter email');
            return false;
        }
        else if (!isValidEmail(Email.trim())) {
            alert('Please enter valid email address');
            return false;
        }
        else if (isEmpty(message.trim())) {
            alert('Please enter your message');
            return false;
        }

        return true;
    };
    post = () => {
        const { fullName, email, message } = this.state
        if (this.verifyCredentials()) {
            this.setState({ loadingback: true })
            this.props.isContact(fullName, email, message).then(() => this.afterisContact())
        }
    }
    afterisContact = () => {
        this.setState({ loadingback: false })
        Notifier.showNotification({
            title: 'Your Request is successfully received ',
            Component: NotifierComponents.Alert,
            componentProps: {
                alertType: 'success',
                titleStyle: {
                    paddingVertical: 25,
                }
            },
        });
        this.props.navigation.navigate('Setting')
    }
    componentDidMount = () => {
        this.props.onGetProfile().then(() => this.afterGetProfile());
    }
    afterGetProfile = () => {

        const data = this.props.getprofileResponse ? this.props.getprofileResponse.data : ''
        this.setState({ fullName: data.userName, Email: data.email })

    }
    render() {
        const { loadingback, fullName, Email } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight }}>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                {loadingback && (
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
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 140 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: wp('4.5'), }}>Contact Us</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                </View>


                <View style={{ flex: 6 }}>
                    <View style={{ ...styles.textmainview, marginTop: wp('8') }}>
                        <Text style={styles.textmain}>Full Name</Text>
                        <Text style={styles.textinput}>{fullName}</Text>

                    </View>
                    <Dash
                        dashGap={5}
                        style={{ width: '100%', }}
                        dashColor='#bdc3c7'
                        dashThickness={1}
                    />
                    <View style={styles.textmainview}>
                        <Text style={styles.textmain}>Email</Text>
                        <Text style={styles.textinput}>{Email}</Text>
                    </View>
                    <Dash
                        dashGap={5}
                        style={{ width: '100%', }}
                        dashColor='#bdc3c7'
                        dashThickness={1}
                    />
                    <View style={styles.textmainview}>

                        <Text style={styles.textmain}>Message</Text>
                        <TextInput
                            ref={(input) => {
                                this.MessageTextInput = input;
                            }}
                            placeholder='Please write message'
                            onChangeText={(message) => this.setState({ message })}
                            returnKeyType={'done'}
                            multiline={true}
                            style={{ ...styles.textinput, maxHeight: 100 }}
                            placeholderTextColor='#d0d3d4'
                        />
                    </View>
                    <Dash
                        dashGap={5}
                        style={{ width: '100%', }}
                        dashColor='#bdc3c7'
                        dashThickness={1}
                    />
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.post()}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>Submit </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textmain: {
        color: '#717d7e',
        fontSize: wp('4')
    },
    textmainview: {
        marginHorizontal: wp('6'),
        marginTop: wp('6')
    },
    textinput: {
        padding: 0,
        fontFamily: 'Poppins-Regular',
        marginVertical: wp('2'),
        fontSize: wp('3.5')
    },
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginVertical: wp('9')
    },
})
