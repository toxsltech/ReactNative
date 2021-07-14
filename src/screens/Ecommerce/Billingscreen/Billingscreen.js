import React, { Component } from 'react'
import {
    Text, StyleSheet, View, Image, FlatList, TouchableOpacity, TextInput, StatusBar, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, KeyboardÍ
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { isEmpty, isValidEmail, PhoneRegex, Pin } from '../../../utils/globals'
import { BASE_URL } from '../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class Billingscreen extends Component {
    constructor() {
        super()
        this.state = {
            address1: '',
            address2: '',
            country: '',
            pincode: '',
            name: '',
            email: '',
            mobileNumber: '',
            getDetail: [],
            billingdate: [
                { name: '', email: '', phone: '', address: '', }
            ],
            id: '',
            loadingback: false,
            keyboardOffset: 0,
        }
    }
    componentDidMount = async () => {
        const { address } = this.props.route.params
        this.setState({
            id: address.id,
            name: address.name ? address.name : '',
            email: address.email ? address.email : '',
            mobileNumber: address.mobileNumber ? address.mobileNumber : '',
            address1: address.address1 ? address.address1 : '',
            address2: address.address2 ? address.address2 : '',
            country: address.country ? address.country : '',
            pincode: address.pincode ? address.pincode : '',

        });
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );

    }

    _keyboardDidShow(event) {
        this.setState({
            keyboardOffset: event.endCoordinates.height,
        })
    }

    _keyboardDidHide() {
        this.setState({
            keyboardOffset: 0,
        })
    }

    verifyCredentials = () => {
        const { name, email, mobileNumber, address1, country, pincode } = this.state;
        if (isEmpty(name.trim())) {
            alert('Please enter name');
            return false;
        } else if (isEmpty(mobileNumber.trim())) {
            alert('Please enter phone number');
            return false;
        } else if (!mobileNumber.match(PhoneRegex)) {
            alert('Please enter valid phone number');
            return false;
        } else if (isEmpty(email.trim())) {
            alert('Please enter email address');
            return false;
        } else if (!isValidEmail(email.trim())) {
            alert('Please enter valid email address');
            return false;
        } else if (isEmpty(address1.trim())) {
            alert('Please enter address1');
            return false;
        } else if (isEmpty(country.trim())) {
            alert('Please enter country');
            return false;
        } else if (isEmpty(pincode.trim())) {
            alert('Please enter pincode');
            return false;
        } else if (!pincode.match(Pin)) {
            alert('Please enter valid pin number');
            return false;
        }
        return true;
    };

    editDetail = async (id) => {
        const USERID = await AsyncStorage.getItem('USERID')
        const { name, email, mobileNumber, address1, address2, country, pincode } = this.state;
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'auth/updateAddress/' + id, {
            method: 'PUT',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'mobileNumber': mobileNumber,
                'address1': address1,
                'address2': address2,
                'country': country,
                'pincode': pincode,
                'userId': USERID
            })
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json ? json.data : ''
                this.props.navigation.navigate('Address')
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }
    goToPayment = async () => {
        this.addAddress()
    }
    goToUpdate = () => {
        this.editDetail(this.state.id)
    }
    addAddress = async () => {
        const { name, email, mobileNumber, address1, address2, country, pincode } = this.state;
        const USERID = await AsyncStorage.getItem('USERID')
        const { body } = this.props.route.params

        if (this.verifyCredentials()) {
            this.setState({ loadingback: true })
            var token = await AsyncStorage.getItem('token');
            fetch(BASE_URL + 'auth/addAdress/', {
                method: 'POST',
                headers: {
                    'x-token': `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'mobileNumber': mobileNumber,
                    'address1': address1,
                    'address2': address2,
                    'country': country,
                    'pincode': pincode,
                    'userId': USERID
                })

            })
                .then((response) => response.json())
                .then((json) => {
                    const data = json ? json.data : ''
                    this.setState({ loadingback: false })

                    Alert.alert(
                        'Alert',
                        'Your address is saved successfully.',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    this.props.navigation.navigate('Address')

                                },
                            }
                        ],
                        { cancelable: false }
                    )
                }
                )
                .catch(err => {
                    showNotification("danger", err.message);
                })
        }
    };

    getDetail = async (id) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'auth/getAddress/' + id, {
            method: 'GET',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json ? json.data : ''
                this.setState({
                    name: data.name ? data.name : '',
                    email: data.email ? data.email : '',
                    mobileNumber: data.mobileNumber ? data.mobileNumber : '',
                    address1: data.address1 ? data.address1 : '',
                    address2: data.address2 ? data.address2 : '',
                    country: data.country ? data.country : '',
                    pincode: data.pincode ? data.pincode : '',

                });

            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }

    Billing = (item) => {

        return (


            <View style={{ margin: 25 }}>
                <Text style={styles.maintext}>Full Name</Text>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.nameTextInput.focus();
                    }}
                />
                <View style={styles.view1}></View>

                <Text style={styles.maintext}>Email Address</Text>

                <TextInput
                    ref={(input) => {
                        this.nameTextInput = input;
                    }}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                    autoCompleteType='email'
                    onSubmitEditing={() => {
                        this.emailTextInput.focus();
                    }}
                    returnKeyType={'next'}

                />
                <View style={styles.view1}></View>



                <Text style={styles.maintext}>Phone Number</Text>

                <TextInput
                    ref={(input) => {
                        this.emailTextInput = input;
                    }}
                    style={styles.textInput}
                    onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                    keyboardType={'number-pad'}
                    value={this.state.mobileNumber}
                    returnKeyType='done'
                    onSubmitEditing={() => {
                        this.numberTextInput.focus();
                    }}
                />
                <View style={styles.view1}></View>


                <Text style={styles.maintext}>Address </Text>


                <TextInput
                    style={styles.textInput}
                    ref={(input) => {
                        this.numberTextInput = input;
                    }}
                    onChangeText={(address1) => this.setState({ address1 })}
                    value={this.state.address1}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.addressTextInput.focus();
                    }}
                />


                <View style={styles.view1}></View>

                <Text style={styles.maintext}>State</Text>


                <TextInput
                    ref={(input) => {
                        this.addressTextInput = input;
                    }}
                    style={styles.textInput}
                    onChangeText={(address2) => this.setState({ address2 })}
                    value={this.state.address2}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.address2TextInput.focus();
                    }}
                />

                <View style={styles.view1}></View>


                <Text style={styles.maintext}>Country</Text>



                <TextInput
                    style={styles.textInput}
                    ref={(input) => {
                        this.address2TextInput = input;
                    }}
                    onChangeText={(country) => this.setState({ country })}
                    value={this.state.country}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.address3TextInput.focus();
                    }}
                />


                <View style={styles.view1}></View>
                <Text style={styles.maintext}>Pin Code</Text>



                <TextInput
                    style={styles.textInput}
                    ref={(input) => {
                        this.address3TextInput = input;
                    }}
                    keyboardType={'number-pad'}
                    onChangeText={(pincode) => this.setState({ pincode })}
                    value={this.state.pincode}
                    returnKeyType={'done'}
                />

                <View style={styles.view1}></View>
            </View>

        )
    }
    render() {
        const { address } = this.props.route.params
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight

                }}>
                    <View style={{
                        borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', height: wp('22'),
                        paddingRight: 20
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            <TouchableOpacity style={{ width: 220 }} onPress={() => this.props.navigation.goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />
                                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-Regular' }}>BIlling Person Detail</Text>

                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                    <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}>
                        <View style={{ flex: 6 }}>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={styles.image} source={require('../images/billingimage.png')} />
                            </View>
                            <View style={{ height: '60%' }}>
                                <FlatList
                                    bounces={false}
                                    keyExtractor={(item) => item.id}
                                    data={this.state.billingdate}
                                    renderItem={({ item }) =>
                                        this.Billing(item)
                                    }
                                />
                            </View>
                            {address == undefined ?
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.goToPayment()}
                                    >
                                        <View style={styles.button}>

                                            <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular' }}>Next</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View> :
                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.goToUpdate()}
                                    >
                                        <View style={styles.button}>
                                            <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular' }}>Update</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>}
                        </View>

                    </KeyboardAwareScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: hp('20'),
        width: wp('100'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
    },
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginVertical: hp('1')
    },
    maintext: {
        color: '#bdc3c7',
        fontSize: wp('3'),
        fontFamily: 'Poppins-Medium'
    },
    imagebutton: {
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
        height: hp('8'),
        width: wp('8'),
        marginLeft: wp('20')
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'
    },
    textInput:
    {
        // padding: 0,
        paddingVertical: 5,
        width: wp('60'),
        fontFamily: 'Poppins-Medium',
        fontSize: wp('3.5'),
        paddingBottom: 10,
    },

    view1: {
        // borderWidth: 0.5,
        marginVertical: 10,
        // borderColor: '#bdc3c7',
        borderBottomColor: '#bdc3c7',
        borderBottomWidth: 1,
    }

})