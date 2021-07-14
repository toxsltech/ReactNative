import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, Image, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Alert, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/env';
import { isEmpty, PanNumber } from '../../utils/globals'
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { androidHeight, iosHeight } from '../../utils/constants';

export default class Newcard extends Component {
    constructor() {
        super()
        this.state = {
            cardnumber: '',
            expiredate: '',
            expMonth: '',
            cvc: '',
            name: '',
            data: [
                { name: 'erg' }
            ],
            paymentMethod: 'Stripe',
            header: 'Add New Card',
            cardNumber: '',
            customerId: "",
            cardData: [],
            loadingImage: false
        }
    }
    componentDidMount = async () => {
        var customerId = await AsyncStorage.getItem('customerId');
        this.setState({ customerId: customerId })
        this.getData()
    }
    getData = async () => {
        try {
            const getCard = await AsyncStorage.getItem('getCard')
            if (getCard == 'true') {
                await AsyncStorage.setItem('getCard', 'false')
                const { item } = this.props.route.params
                this.setState({
                    cardnumber: 'XXXXXXXXXXXX' + item.last4,
                    expMonth: item.exp_month.toString(),
                    expiredate: item.exp_year.toString(),
                    header: 'Card'
                })
            }
        } catch (e) {
        }
    }
    verifyCredentials = () => {
        const { cardnumber, name, cvc, expiredate, expMonth } = this.state;
        if (isEmpty(cardnumber.trim())) {
            alert('Please enter card number');
            return false;
        } else if (isEmpty(name.trim())) {
            alert('Please enter name');
            return false;
        } else if (isEmpty(expMonth.trim())) {
            alert('Please enter expiry month');
            return false;
        } else if (isEmpty(expiredate.trim())) {
            alert('Please enter expiry date');
            return false;
        } else if (isEmpty(cvc.trim())) {
            alert('Please enter cvc');
            return false;
        }
        else if (parseInt(expMonth.slice(0, 2)) > 12) {
            alert('Month not valid, Please enter valid month');
            return false;
        }
        else if (parseInt(expiredate.slice(0, 10)) < new Date().getFullYear()) {
            alert('Year not valid, Please enter valid year');
            return false;
        }
        return true;
    };



    goToNext = async () => {
        const { body } = this.props.route.params
        const found = body.find(element => element.last4 == this.state.cardnumber.slice(15, 19));
        if (body.length >= 3) {
            this.setState({ loadingImage: false })
            alert('Maximum 3 cards added')
        } else if (found == undefined) {
            const { cardnumber, expiredate, expMonth, cvc, name, paymentMethod, customerId } = this.state;
            this.setState({ cardNumber: cardnumber, expYear: expiredate, expMonth: expMonth, cvc: cvc, name: name })
            const ccNumber = cardnumber.replace(/\s?/g, '')
            if (this.verifyCredentials()) {
                this.setState({ loadingImage: true })
                var token = await AsyncStorage.getItem('token');
                fetch(BASE_URL + 'order/createCard/', {
                    method: 'POST',
                    headers: {
                        'x-token': `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "cardNumber": ccNumber,
                        "expMonth": expMonth,
                        "expYear": expiredate,
                        "cvc": cvc,
                        "customerId": customerId
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        this.setState({ loadingImage: false })
                        if (json.status == 410) {
                            alert(json.message)
                        }
                        else {
                            Alert.alert(
                                'Alert',
                                'Your Card Successfully Added',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            this.props.navigation.navigate('PaymentCard')
                                        },
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                    }
                    )
                    .catch(err => {
                    })
            }
        } else {
            this.setState({ loadingImage: false })
            alert('Card Already Exist')
        }
    }
    _handlingCardNumber(number) {
        this.setState({ cardnumber: number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim() })
    }
    Card = (item) => {
        return (

            <View style={{ margin: 25 }}>

                <Text style={styles.maintext}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this._handlingCardNumber(text)}
                    value={this.state.cardnumber}
                    maxLength={19}
                    placeholder='XXXX XXXX XXXX XXXX'
                    autoCompleteType='cc-number'
                    keyboardType='numeric'
                    returnKeyType='done'

                />

                <View style={{ borderWidth: 0.6, borderColor: '#bdc3c7', marginBottom: 10 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: wp('40'), }}>
                        <Text style={styles.maintext}>Expiry Date</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <TextInput
                                style={{ ...styles.input1 }}
                                value={this.state.expMonth}
                                autoCompleteType='cc-exp-month'
                                keyboardType="numeric"
                                maxLength={2}
                                placeholder='MM'
                                ref="input_1"
                                onChangeText={expMonth => {
                                    this.setState({ expMonth })
                                    if (expMonth && expMonth.length == 2) {
                                        this.yearRef.focus();
                                    }
                                }}
                            />

                            <Text style={{
                                color: '#bdc3c7',
                                fontSize: 25,
                            }}>/</Text>

                            <TextInput style={{ padding: 0, width: wp('10') }}
                                ref={yearRef => this.yearRef = yearRef}
                                onChangeText={(expiredate) => this.setState({ expiredate })}
                                value={this.state.expiredate}
                                autoCompleteType='cc-exp-year'
                                keyboardType='numeric'
                                maxLength={4}
                                placeholder='YYYY'
                                returnKeyType='done'

                            />
                        </View>
                        <View style={{ borderWidth: 0.6, borderColor: '#bdc3c7', marginBottom: 10 }}></View>

                    </View>
                    <View style={{ marginLeft: 30, width: wp('40') }}>

                        <Text style={{
                            color: '#bdc3c7',
                            fontSize: 18
                        }}> cvc</Text>
                        <TextInput style={{ ...styles.input }}
                            onChangeText={(cvc) => this.setState({ cvc })}
                            value={this.state.cvc}
                            keyboardType='numeric'
                            maxLength={3}
                            placeholder='Enter cvc'
                            returnKeyType='done'
                        />
                        <View style={{ borderWidth: 0.6, borderColor: '#bdc3c7', marginBottom: 10 }}></View>

                    </View>
                </View>

                <Text style={styles.maintext}>Account Holder Name</Text>
                <View style={{ flexDirection: 'row' }}>

                    <TextInput
                        style={{
                            height: Platform.OS === 'ios' ? wp('9') : 0,
                            paddingTop: 2, width: wp('60'),
                        }}
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                        placeholder='Enter name'

                    />

                </View>
                <View style={{ borderWidth: 0.6, borderColor: '#bdc3c7', marginBottom: 10 }}></View>
            </View>

        )
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight }}>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                {this.state.loadingImage && (
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
                        <TouchableOpacity style={{ width: 160 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18 }}>{this.state.header}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>


                                <Image style={styles.homeicon} source={require("./images/store/home.png")} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>


                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}>

                    <View style={{ flex: 6, paddingTop: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <Image style={styles.image} source={require('./images/newcard.png')} />
                        </View>
                        <View style={{ height: hp('42'), }}>
                            <FlatList
                                bounces={false}
                                keyExtractor={(item) => item.id}
                                data={this.state.data}
                                renderItem={({ item }) =>
                                    this.Card(item)
                                }
                            />
                        </View>
                        <View style={{ alignItems: 'center' }}>

                            <TouchableOpacity onPress={() => this.goToNext()} >
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17 }}>Save</Text>
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
    image: {
        height: Platform.OS === 'ios' ? hp('28') : hp('25'),
        width: wp('100'),
        resizeMode: 'contain'
    },
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: hp('1')
    },
    maintext: {
        color: '#bdc3c7',
        fontSize: 15,
        // marginBottom: 15
    },
    input: {
        padding: 0,
        width: wp('60'),
        height: Platform.OS === 'ios' ? wp('8') : 0
        // marginBottom: 10
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'
    },
    input1: {
        padding: 0,
        // width: wp('7'),
        height: Platform.OS === 'ios' ? wp('9') : 0

    },
})
