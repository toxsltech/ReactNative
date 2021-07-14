import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { isEmpty, isValidEmail, PhoneRegex, Pin } from '../../../utils/globals'
import { BASE_URL } from '../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'

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
        }
    }
    componentDidMount = async () => {
        const id = await AsyncStorage.getItem('id')
        this.getDetail(id)
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

    goToPayment = async () => {
        const { name, email, mobileNumber, address1, address2, country, pincode } = this.state;
        const USERID = await AsyncStorage.getItem('USERID')

        const { body } = this.props.route.params
        if (this.verifyCredentials()) {
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
                    const id = json ? json.data._id : ''
                    AsyncStorage.setItem('id', id);
                    this.props.navigation.navigate('Paymentscreen', { body: body })
                }
                )
                .catch(err => {
                    showNotification("danger", err);
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
                showNotification("danger", err);
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
                />
                <View style={styles.view1}></View>
                <View style={styles.textInput}></View>
                <Text style={styles.maintext}>Email Address</Text>

                <TextInput style={styles.textInput}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    keyboardType={'email-address'}
                />
                <View style={styles.view1}></View>


                <Text style={styles.maintext}>Phone Number</Text>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
                    keyboardType={'number-pad'}
                    value={this.state.mobileNumber}
                />
                <View style={styles.view1}></View>
                <Text style={styles.maintext}>Address </Text>
                <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>

                    <TextInput style={styles.textInput}
                        onChangeText={(address1) => this.setState({ address1 })}
                        value={this.state.address1}
                    />

                </View>
                <View style={styles.view1}></View>
                <Text style={styles.maintext}>State</Text>
                <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>
                    <TextInput style={styles.textInput}
                        onChangeText={(address2) => this.setState({ address2 })}
                        value={this.state.address2}
                    />
                </View>
                <View style={styles.view1}></View>
                <Text style={styles.maintext}>Country</Text>
                <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>

                    <TextInput style={styles.textInput}
                        onChangeText={(country) => this.setState({ country })}
                        value={this.state.country}
                    />

                </View>
                <View style={styles.view1}></View>
                <Text style={styles.maintext}>Pin Code</Text>
                <View style={{ flexDirection: 'row', height: 30, alignItems: 'center' }}>

                    <TextInput style={styles.textInput}
                        onChangeText={(pincode) => this.setState({ pincode })}
                        value={this.state.pincode}
                    />

                </View>
                <View style={styles.view1}></View>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    paddingTop: 22
                }}>
                    <View style={{
                        borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', height: wp('20'),
                        paddingRight: 20
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <TouchableOpacity style={{ width: 50, alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, fontFamily: 'Poppins-Regular' }}>BIlling Person Detail</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                    <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 6 }}>
                        <ScrollView>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={styles.image} source={require('../images/billingimage.png')} />
                            </View>
                            <View style={{}}>
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={this.state.billingdate}
                                    renderItem={({ item }) =>
                                        this.Billing(item)
                                    }
                                />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => this.goToPayment()}

                                >
                                    <View style={styles.button}>
                                        <Text style={{ fontSize: 17, fontFamily: 'Poppins-Regular' }}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: hp('25'),
        width: wp('100'),
        resizeMode: 'center'
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
        padding: 0,
        width: wp('60'),
        fontFamily: 'Poppins-Medium',
        fontSize: wp('3.5')
    },
    view1: {
        borderWidth: 0.8,
        marginVertical: 10,
        borderColor: '#bdc3c7'
    }

})