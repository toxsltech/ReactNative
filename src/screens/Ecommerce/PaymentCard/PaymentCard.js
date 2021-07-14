
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../../utils/env';
import Fonts from '../../../themes/Fonts'
import RadioButton from 'react-native-radio-button'
import Swipeable from 'react-native-swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { androidHeight, iosHeight } from '../../../utils/constants';


export default class PaymentCard extends Component {
    constructor() {
        super()
        this.state = {
            cards: [],
            cardNumber: '',
            customerId: '',
            cardId: '',
            dots: 0,

        }
    }
    componentDidMount = async () => {
        var customerId = await AsyncStorage.getItem('customerId');
        this.setState({ customerId: customerId })
        this.cards(this.state.customerId)
        this.getData()
        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.cards(this.state.customerId)
        });

    }
    getData = async () => {
        try {
            await AsyncStorage.setItem('getCard', 'true')
        } catch (err) {
            showNotification("danger", err);

        }
    }

    cards = async (custmer) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'order/cardDetails' + '?customerId=' + custmer, {
            method: 'GET',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json ? json.data : ''
                this.setState({ cards: data.data, cardId: data.data[0].id, cardNumber: data.data[0].last4 })
            }
            )
            .catch(err => {
            });
    }
    getcards = async (custmer) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'order/cardDetails' + '?customerId=' + custmer, {
            method: 'GET',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json ? json.data : ''
                this.setState({ cards: data.data, cardId: '' })
            }
            )
            .catch(err => {
            });
    }
    Delete = async (id) => {

        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'order/deleteCard' + '?customerId=' + this.state.customerId + '&cardId=' + id, {
            method: 'DELETE',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.getcards(this.state.customerId)
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            });
    }

    renderRightButtons(id) {

        return [
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.Delete(id)}>
                <View style={styles.deleteContainer}>
                    <Text style={styles.deleteText}>Delete</Text>
                </View>
            </TouchableOpacity>
            ,
        ];
    }
    Address = (item, index) => {

        return (
            <Swipeable
                rightButtons={this.renderRightButtons(item.id)}
                rightButtonWidth={75}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: wp('5'), marginVertical: wp('1') }}>
                        <View style={{ marginLeft: wp('2'), height: wp('14'), flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: wp('2'), justifyContent: 'center', alignItems: 'center', marginTop: wp('2') }}>
                                <RadioButton
                                    size={16}
                                    innerColor={'#f4d03f'}
                                    outerColor={'#f4d03f'}
                                    animation={'bounceIn'}
                                    isSelected={index == this.state.dots}
                                    onPress={() => this.setState({ dots: index, cardId: item.id, customerId: item.customer, cardNumber: item.last4, name: item.name })}
                                />
                            </View>
                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Newcard', { item: item })}> */}
                            <Text style={{ fontSize: wp('4.7'), marginLeft: wp('4'), fontFamily: Fonts.OpenSansRegular }}>{item.funding.toUpperCase()} CARD</Text>

                            {/* </TouchableOpacity> */}
                        </View>
                        <Text style={{ fontSize: wp('3.5'), marginLeft: wp('14'), width: wp('100'), fontFamily: 'Poppins-Regular', marginBottom: wp('2'), width: wp('70') }}>Card Number : XXXX XXXX XXXX {item.last4}</Text>
                        <View style={{ borderWidth: 0.3, marginVertical: 10, borderColor: '#bdc3c7' }}></View>
                    </View>
                </View>
            </Swipeable>
        )
    }
    goToPayment = async () => {
        const { cardId, customerId, cardNumber } = this.state;
        const { body } = this.props.route.params
        cardId == undefined || cardId == '' ? alert('Please add card') :
            this.props.navigation.navigate('Paymentscreen', { body: body, cardId: cardId, customerId: customerId, cardNumber: cardNumber, status: cardId })

    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight


                }}>
                    <View style={{
                        borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', height: wp('20'),
                        paddingRight: 20
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            <TouchableOpacity style={{ width: 200 }} onPress={() => this.props.navigation.goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />
                                    <Text style={{ fontSize: 24, fontFamily: Fonts.SourceSansProRegular, fontWeight: 'normal' }}>Select Card</Text>

                                </View>
                            </TouchableOpacity>
                            <View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 6 }}>
                        <ScrollView bounces={false}>
                            <View style={{ marginLeft: wp('3'), height: wp('14'), flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ marginLeft: wp('3'), height: wp('14'), flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => this.props.navigation.navigate('Newcard', { body: this.state.cards ? this.state.cards : '' })} >
                                    <Image style={styles.imagebutton} source={require('../images/paymentbutton3.png')} />
                                    <Text style={{ fontSize: wp('4.5'), marginLeft: wp('2'), fontFamily: Fonts.OpenSansRegular }}>Add New Card</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.view1}></View>
                            <View style={{ marginLeft: wp('5') }}>
                                <Text style={{ fontSize: wp('4.5'), fontFamily: 'Poppins-Regular' }}>Saved Cards</Text>
                            </View>

                            <View style={{}}>


                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={this.state.cards}
                                    renderItem={({ item, index }) =>
                                        this.Address(item, index)
                                    }
                                    bounces={false}
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
            </View >
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: hp('25'),
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
    },

    optionText: {
        fontFamily: Fonts.OpenSansRegular,
        fontSize: wp('0.8'),
        color: '#797d7f',

    },
    threeDots: {
        height: wp('5'),
        width: wp('5'),
        resizeMode: 'contain',
    },
    options: {
        width: wp('30'),
        backgroundColor: 'white',
        borderRadius: wp('1'),
        position: 'absolute',
        zIndex: 15,
        right: wp('8.5'),
        top: wp('10'),
        elevation: 6,
    },
    optionItem: {
        alignItems: 'center',
        paddingVertical: wp('3'),
        borderBottomWidth: wp('0.3'),
        marginHorizontal: wp('3'),
        borderBottomColor: '#D2D2D2',
        justifyContent: 'center',
    },
    deleteContainer: {
        borderColor: "red",
        borderWidth: 0.5,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        width: 70,
        height: "80%",
        backgroundColor: "#fe386b",

        justifyContent: "center",
        alignItems: 'center',
    },
    deleteText: {
        color: '#fff'
    }
})
