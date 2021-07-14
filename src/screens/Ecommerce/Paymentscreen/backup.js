import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, StatusBar, Modal, ImageBackground, Alert, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Paymentscreen extends Component {
    constructor() {
        super()
        this.state = {
            check1: false,
            check2: false,
            show: false,
            check4: false,
            loadingback: false,
            check3: false,
            customer: ''
        }
    }
    componentDidMount = () => {
        this.props.onGetUserProduct().then(() => this.afterGetCart())
    }
    afterGetCart = () => {
        const Info = this.props.getUserProductResponse ? this.props.getUserProductResponse.data : '';
    }

    addProduct = () => {
        const { body, addressId, dataCard } = this.props.route.params
        const amount = dataCard ? body.orderData.map((item) => item.price).toString() : ''
        const data = Object.assign(body, { addressId: addressId });
        const data1 = Object.assign(body, {
            addressId: addressId,
            cardNumber: dataCard ? dataCard.cardNumber : '', cvc: dataCard ? dataCard.cvc : '',
            expMonth: dataCard ? dataCard.expMonth : '', expYear: dataCard ? dataCard.expYear : '',
            name: dataCard ? dataCard.name : '', paymentMethod: dataCard ? dataCard.paymentMethod : '',
            amount: parseInt(amount),
            country: "US", address: "San Francisco",
        });


        if (this.verifyCredentials()) {
            this.setState({ loadingback: true })
            this.state.check4 == true ? this.props.AddToProduct(data).then(() => this.afterAddToProduct()) :
                this.props.AddToProductOnline(data1).then(() => this.afterAddToProductOnline())
        }
    }

    verifyCredentials = () => {
        const { check4, check3, check2 } = this.state;
        if (check4 == false && check3 == false && check2 == false) {
            alert('Please select one method');
            return false
        }
        return true;
    };

    afterAddToProductOnline = async () => {
        this.setState({ loadingback: false })
        const Info = this.props.addProductOnlineResponse ? this.props.addProductOnlineResponse : '';
        Info.success == true ?
            Alert.alert(
                'Alert',
                'Your Order Confirmation Successfully Completed',
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.props.navigation.navigate('Newhome')
                        },
                    }
                ],
                { cancelable: false }
            )
            : alert(Info.data.message)
    }

    afterAddToProduct = () => {
        this.setState({ loadingback: false })
        const Info = this.props.addProductResponse ? this.props.addProductResponse : '';
        Info.success == true ?
            Alert.alert(
                'Alert',
                'Your Order Confirmation Successfully Completed',
                [
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.props.navigation.navigate('Newhome')
                        },
                    }
                ],
                { cancelable: false }
            )
            : alert('Something Wrong')
    }

    modal = () => {
        setTimeout(() => {
            this.setState({ show: false })
            this.props.navigation.navigate('Newhome')
        }, 2000);
    }

    render() {
        const { check1, check2, check3, check4 } = this.state
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
                <View style={{ flex: 1, borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity style={{ width: 50, alignItems: 'center' }} onPress={() => this.props.navigation.goBack()}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, }}>Payment Method</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>

                                <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={{ flex: 6 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: wp('75') }}>
                                <TouchableOpacity
                                // onPress={() => this.setState({ check1: true, check2: false, })}
                                >
                                    <Image style={styles.image} source={require('../images/paymentimage4.png')} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                            // onPress={() => this.setState({ check1: true, check2: false, })}
                            >
                                {check1 ?
                                    <Image style={styles.imagebutton} source={require('../images/paymentbutton1.png')} /> : <Image style={styles.imagebutton} source={require('../images/paymentbutton2.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 0.3, width: wp('90'), borderColor: '#bdc3c7', }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: wp('75') }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ check3: false, check2: true, check1: false, check4: false })
                                        { check2 ? this.props.navigation.navigate('PaymentCard', { custmer: this.state.custmer }) : null }
                                    }}
                                >
                                    <Image style={styles.image} source={require('../images/paymentimage5.png')} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.setState({ check1: false, check2: true, check4: false, check3: false })}
                            >
                                {check2 ?
                                    <Image style={styles.imagebutton} source={require('../images/paymentbutton1.png')} /> : <Image style={styles.imagebutton} source={require('../images/paymentbutton2.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 0.3, width: wp('90'), borderColor: '#bdc3c7' }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ width: wp('75') }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ check3: true, check2: false, check1: false, check4: false })
                                        this.props.navigation.navigate('Newcard')
                                    }}>
                                    <Image style={styles.image} source={require('../images/paymentimage6.png')} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setState({ check3: true, check2: false, check1: false, check4: false })
                                { check3 ? this.props.navigation.navigate('Newcard') : null }
                            }}>

                                <Image style={styles.imagebutton} source={require('../images/paymentbutton3.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderWidth: 0.3, width: wp('90'), borderColor: '#bdc3c7' }}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('0'), width: wp('75'), paddingLeft: wp('4.8') }}>

                                <Image style={{ ...styles.imagebutton, }} source={require('../images/money.png')} />
                                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', justifyContent: 'space-around', marginLeft: wp('8') }}>Cash on Delivery</Text>
                            </View>


                            <TouchableOpacity onPress={() => this.setState({ check1: false, check2: false, check3: false, check4: true })}>
                                {check4 ?
                                    <Image style={{ ...styles.imagebutton, }} source={require('../images/paymentbutton1.png')} /> :
                                    <Image style={{ ...styles.imagebutton, }} source={require('../images/paymentbutton2.png')} />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this.addProduct()
                            }}
                            >
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17 }}>Finish</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        visible={this.state.show}
                        transparent={true}
                        animationType='slide'
                    >
                        <View style={{ flex: 1 }}>
                          
                            <ImageBackground style={{ height: hp('100'), width: wp('100') }}
                                source={require('../images/success/success.png')}
                            >

                            </ImageBackground>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "center",
        height: hp('13'),
        width: wp('80')
    },
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: hp('20')
    },
    imagebutton: {
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
        height: hp('8'),
        width: wp('8')
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'
    },
})