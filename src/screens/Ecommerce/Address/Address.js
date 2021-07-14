
import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../../../themes/Fonts'
import ResponsiveText from '../../../components/ResponsiveText'
import RadioButton from 'react-native-radio-button'
import showNotification from '../../../utils/services'
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class Address extends Component {
    constructor() {
        super()
        this.state = {
            addressDetail: [],
            isOptionOpen: false,
            dots: 0,
            check1: false,
            Id: '',
            address1: '',
            address2: '',
            country: '',
            pincode: '',
            name: '',
            email: '',
            mobileNumber: '',

        }
    }
    componentDidMount = async () => {
        const USERID = await AsyncStorage.getItem('USERID')
        this.setState({ Id: USERID })
        this.getDetail(USERID)

        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.getDetail(USERID)
            this.setState({ isOptionOpen: false })

        });

    }

    getDetail = async (id) => {
        this.props.onGetAddress(id).then(() => this.afterGetAddress())
    }
    afterGetAddress = () => {
        const data = this.props.getaddressResponse ? this.props.getaddressResponse.data : '';
        this.setState({ addressDetail: data, addressId: data[0]._id })
    }
    editDetail = (item) => {
        const { body } = this.props.route.params
        const address = {
            id: item._id,
            name: item.name ? item.name : '',
            email: item.email ? item.email : '',
            mobileNumber: item.mobileNumber ? item.mobileNumber : '',
            address1: item.address1 ? item.address1 : '',
            address2: item.address2 ? item.address2 : '',
            country: item.country ? item.country : '',
            pincode: item.pincode ? item.pincode : '',
        }
        this.props.navigation.navigate('Billingscreen', { body: body, address: address })
    }

    deleteDetail = async (id) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'auth/deleteAddress/' + id, {
            method: 'DELETE',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                this.getDetail(this.state.Id)
                this.setState({ isOptionOpen: false })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);

            })
    }

    Address = (item, index) => {

        return (
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    marginLeft: wp('5'),
                    marginVertical: wp('1')
                }}>
                    <Text style={{
                        fontSize: wp('3.6'),
                        fontFamily: Fonts.SourceSansProRegular
                    }}>DELIVER TO</Text>

                    <View style={{ marginLeft: wp('2'), height: wp('14'), flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: wp('2'), marginTop: wp('4'), justifyContent: 'center', alignItems: 'center' }}>
                            <RadioButton
                                size={16}
                                innerColor={'#f4d03f'}
                                outerColor={'#f4d03f'}
                                animation={'bounceIn'}
                                isSelected={index == this.state.dots}
                                onPress={() => this.setState({ dots: index, addressId: item._id, isOptionOpen: false })}
                            />
                        </View>

                        <Image style={{
                            resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
                            height: hp('4'),
                            width: wp('4'),
                            marginLeft: wp('4'),
                            tintColor: '#025960'
                        }} source={require("../images/store/home.png")} />
                        <Text style={{ fontSize: wp('4.7'), marginLeft: wp('4'), fontFamily: Fonts.OpenSansRegular }}>{item.name}</Text>
                    </View>
                    <Text style={{ fontSize: wp('3.5'), marginLeft: wp('20'), width: wp('70'), fontFamily: 'Poppins-Regular', marginVertical: wp('-3'), marginBottom: wp('2'), width: wp('70') }}>{item.address1},{item.address2},{item.country}</Text>
                    <View style={{
                        borderWidth: 0.3,
                        marginVertical: 10,
                        borderColor: '#bdc3c7',
                    }}></View>
                </View>
                {index == this.state.dots && this.state.isOptionOpen && (
                    <View style={styles.options}>
                        <View>
                            <TouchableOpacity onPress={() => this.editDetail(item)} style={styles.optionItem}>
                                <ResponsiveText style={styles.optionText}>Edit</ResponsiveText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.deleteDetail(item._id)} style={[styles.optionItem, { borderBottomWidth: 0 }]}>
                                <ResponsiveText style={styles.optionText}>Delete</ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: -20 }}>
                    <TouchableOpacity
                        style={{ width: 30 }}
                        onPress={() => this.setState({ dots: index, isOptionOpen: !this.state.isOptionOpen })}>
                        <Image
                            source={require('../../../assets/icons/dots.png')}
                            style={styles.threeDots}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    goToPayment = async () => {
        const { body } = this.props.route.params
        const { addressId } = this.state
        addressId == undefined || addressId == '' ? alert('Please add address') :
            this.props.navigation.navigate('Paymentscreen', { body: body, addressId: addressId })
    }

    render() {
        const { body } = this.props.route.params
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
                            <TouchableOpacity style={{ width: 240 }} onPress={() => this.props.navigation.goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />
                                    <Text style={{ fontSize: 24, fontFamily: Fonts.SourceSansProRegular, fontWeight: 'normal' }}>Select an address</Text>
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
                                    onPress={() => this.props.navigation.navigate('Billingscreen', { body: body })} >
                                    <Image style={styles.imagebutton} source={require('../images/paymentbutton3.png')} />
                                    <Text style={{ fontSize: wp('4.5'), marginLeft: wp('2'), fontFamily: Fonts.OpenSansRegular }}>Add Address</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.view1}></View>
                            <View style={{ marginLeft: wp('5') }}>
                                <Text style={{ fontSize: wp('4.5'), fontFamily: 'Poppins-Regular' }}>Saved Address</Text>
                            </View>


                            <View style={{}}>
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={this.state.addressDetail}
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

})
