
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, StatusBar, Modal, ImageBackground, Alert, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../utils/env';
import showNotification from '../../../utils/services'
import { androidH4, iosHeight } from '../../../utils/constants';


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
      customer: '',
      cardNumber: '',
      customerId: ''
    }
  }
  componentDidMount = async () => {
    this.props.onGetUserProduct().then(() => this.afterGetCart())
    var customerId = await AsyncStorage.getItem('customerId');
    this.setState({ customerId: customerId })
    this.getcards(customerId)
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.getcards(this.state.customerId)
    });
  }

  afterGetCart = () => {
    const Info = this.props.getUserProductResponse ? this.props.getUserProductResponse.data : '';
    this.setState({ customer: 'cus_JiYeYleysnQoWM' })
  }

  addProduct = () => {
    const { body, addressId } = this.props.route.params
    const { cardId, customerId, name } = this.state
    const amount = body.orderData.map((item) => item.price).toString()
    const data = Object.assign(body, { addressId: addressId });
    const data1 = Object.assign(body, {
      addressId: addressId,
      cardId: cardId ? cardId : '',
      customerId: customerId ? customerId : '',
      amount: parseInt(amount),
      name: name,
      country: "US",
      address: "San Francisco",
    });

    if (this.verifyCredentials()) {
      this.setState({ loadingback: true })
      this.state.check4 == true ? this.props.AddToProduct(data).then(() => this.afterAddToProduct()) :
        this.props.AddToProductOnline(data1).then(() => this.afterAddToProductOnline())
    }
  }

  verifyCredentials = () => {
    const { check4, check2 } = this.state;
    if (check4 == false && check2 == '') {
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
  getcards = async (custmer) => {
    const { cardNumber, cardId } = this.props.route.params
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
        this.setState({ cardNumber: cardNumber ? cardNumber : data.data[0].last4, cardId: cardId ? cardId : data.data[0].id })
      }
      )
      .catch(err => {

      })
  }
  render() {
    const { check1, check2, check3, check4, cardNumber } = this.state
    const { body, status } = this.props.route.params

    return (
      <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidH4 }}>

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
        <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

            <TouchableOpacity style={{ width: 200 }} onPress={() => this.props.navigation.goBack()}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <IonIcon name="chevron-back-outline" size={22} color='black' />
                <Text style={{ fontSize: 18, }}>Payment Method</Text>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                <Image style={styles.homeicon} source={require("../images/store/home.png")} />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <View style={{ flex: 6 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: wp('20') }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('0'), width: wp('75'), paddingLeft: wp('4.8') }}>
                <Image style={{ ...styles.imagebutton, width: wp('14') }} source={require('../images/paypal.png')} />
                <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', justifyContent: 'space-around', marginLeft: wp('8') }}>Paypal</Text>
              </View>
              <TouchableOpacity onPress={() => this.setState({ check1: false, check2: true, check4: false, check3: false })}>
                {check1 ?
                  <Image style={{ ...styles.imagebutton, }} source={require('../images/paymentbutton1.png')} /> :
                  <Image style={{ ...styles.imagebutton, }} source={require('../images/paymentbutton2.png')} />
                }
              </TouchableOpacity>
            </View>


            <View style={{ borderWidth: 0.5, width: wp('90'), borderColor: '#bdc3c7', }}></View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: wp('20') }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('0'), width: wp('75'), paddingLeft: wp('4.8'), }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: wp('0'), width: wp('75'), }}
                  onPress={() => {

                    this.props.navigation.navigate('PaymentCard', { custmer: this.state.custmer, body: body })
                  }}
                >
                  <Image style={{ ...styles.imagebutton, }} source={require('../images/visa.png')} />
                  <Text style={{ fontSize: 16, fontFamily: 'Poppins-Medium', justifyContent: 'space-around', marginLeft: wp('8') }}>Credit/Debit Card</Text>

                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.state.cardNumber != '' ? this.setState({ check1: false, check2: true, check4: false, check3: false }) : alert('Please add card')
                }}
              >
                {
                  check2 ?
                    < Image style={{
                      ...styles.imagebutton,
                    }
                    } source={require('../images/paymentbutton1.png')} /> :
                    <Image style={{ ...styles.imagebutton, }} source={require('../images/paymentbutton2.png')} />
                }
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', marginLeft: wp('-10'), marginTop: wp('-5') }}>******{cardNumber ? cardNumber : '****'}</Text>

            <View style={{ borderWidth: 0.5, width: wp('90'), borderColor: '#bdc3c7' }}></View>



            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: wp('20') }}>
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
              <StatusBar
                translucent backgroundColor="transparent"
                barStyle='dark-content'
                hidden={true}
              />
              <ImageBackground style={{ height: hp('100'), width: wp('100') }}
                source={require('../images/success/success.png')}
              >

              </ImageBackground>
            </View>
          </Modal>
        </View>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
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
    width: wp('10')
  },
  homeicon: {
    height: wp('7'),
    width: wp('7'),
    tintColor: '#025960'
  },
})
