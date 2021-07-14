import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, TextInput, TouchableOpacity, Alert, ScrollView, Modal, ActivityIndicator ,StatusBar} from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BASE_URL } from '../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class CartList extends Component {
    constructor() {
        super();
               
               
        this.state = {
            text: 1,
            cartdata: [],
            product: '',
            quantity: '',
            sleeve: '',
            size: '',
            color: '',
            price: '',
            paymentMethod: '',
            booked_by: '',
            titlename: '',
            imagedate: [],
            buy: [],
            cartarray: [],
            totalPrice: '',
            totalQuantity: 0,
            Quantity: 0,
            cartmodal: false,
            cartfilterdata: [],
            count: 0,
            loadingback: false,
            loadingback1: true,

            inc: false,
            discount: 0,
            totalDiscount: '',
            totalitem: 0
        }
    }
    componentDidMount = () => {
        this.setdata()
        this.props.onGetCart().then(() => this.afterGetCart())
    }
    setdata = async () => {
        try {
            await AsyncStorage.setItem('cart', 'true')
        } catch (e) {
            showNotification("danger", e);

        }
    }

    afterGetCart = () => {
        this.setState({ cartarray: [] })
        const Info = this.props.getcartResponse ? this.props.getcartResponse.data : '';
        this.setState({ cartdata: Info, loadingback1: false })
        const total = Info.map((item) => item.product.afterDiscount * item.quantity)
        const currentProductPrice = Info.map((item) => (item.product.currentProductPrice - item.product.afterDiscount) * item.quantity)
        const currentProductPrice1 = Info.map((item) => item.product.currentProductPrice * item.quantity)
        const totaldiscount = Info.map((item) => item.product.discountPercent * item.quantity)
        const totalQuantity = Info.map((item) => item.product.quantity)
        const Quantity = Info.map((item) => item.quantity)
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = total.reduce(reducer)
        const totalPrice2 = currentProductPrice1.reduce(reducer)
        const totalPrice1 = currentProductPrice.reduce(reducer)
        const Quantity1 = Quantity.reduce(reducer)
        const totalDiscount = (totalPrice1 / totalPrice2 * 100).toFixed(2)
        this.setState({ totalPrice: totalPrice, totalQuantity: totalQuantity, Quantity: Quantity, loadingback: false, totalDiscount: totalDiscount, totalitem: Quantity1 })
        Info.map((item) => (

            this.state.cartarray.push({
                product: item._id,
                quantity: item.quantity,
                sleeve: item.sleeve,
                size: item.size,
                color: item.color,
                price: item.product.afterDiscount,
                titlename: item.product.title,
                product: item.product,
                booked_by: item.addedBy,
                paymentMethod: 'cash',
                discount: item.product.discountPercent == 'N/A' ? '' : item.product.discountPercent,
                sellerId: item.product.addedBy

            })
        ))

    }
    Delete = (id) => {
        Alert.alert(
            'Alert',
            'Are you sure you want to remove the product from cart',
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        this.setState({ loadingback: false })
                    },
                    style: "cancel"
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        this.goDelete(id)
                    },
                }
            ],
            { cancelable: false }
        );
    }
    goDelete = async (id) => {
        var token = await AsyncStorage.getItem('token');

        fetch(BASE_URL + 'cart/delete/' + id, {
            method: 'DELETE',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ loadingback: false })
                this.props.onGetCart().then(() => this.afterGetCart())
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }
    goToNext = () => {
        const Info = this.props.getcartResponse ? this.props.getcartResponse.data : '';
        const a = this.state.Quantity.map((item, index) => this.state.Quantity[index] <= this.state.totalQuantity[index] ? true : false)
        if (a.find(element => element == false) == false) {
            Info.map((item) => {
                if (item.quantity > item.product.quantity) {
                    this.state.cartfilterdata.push(item)
                }
            })
            this.setState({ cartfilterdata: this.state.cartfilterdata, cartmodal: true, loadingback: false })
        } else {
            this.setState({ loadingback: false })
            const body = {
                orderData: this.state.cartarray
            }
            this.props.navigation.navigate('Address', { body: body })
        }
    }

    countt = (item) => {
        item.quantity <= 1 ? this.goDelete(item._id) :
            this.props.EditToCart(item.product._id, item.quantity, this.state.inc).then(() => this.afterEditToCart())
    }

    countPlus = (item) => {
        let incre = !this.state.inc
        this.props.EditToCart(item.product._id, item.quantity, incre).then(() => this.afterEditToCart())
    }

    afterEditToCart = () => {
        this.props.onGetCart().then(() => this.afterGetCart())
    }

    cartdata = (item) => {
        const data = item.product.images.map((item) => BASE_URL + item)
        return (
            item.product ? (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item.product._id, images: data })} >
                            <Image style={styles.cartimage} source={{ uri: item.product ? BASE_URL + item.product.images[0] : '' }} />
                        </TouchableOpacity>
                        <View>
                            <View style={{ marginLeft: wp('3') }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: wp('4'), fontFamily: 'Poppins-SemiBold', width: wp('40') }}>{item.product ? item.product.title : ''}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ loadingback: true })
                                        this.Delete(item._id)
                                    }}>
                                        <Image
                                            source={require('../../../assets/icons/delete.png')}
                                            style={styles.headerSingleButton1}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#025960', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>Size : </Text>
                                    <Text style={{ color: '#a6acaf', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>{item.size}</Text>
                                </View>
                                <Text style={{ color: '#025960', fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>Price : ${item.product ? item.product.afterDiscount : ''}</Text>

                                {item.product.discountPercent == 'N/A' || item.product.discountPercent == undefined ?
                                    null
                                    :
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#025960', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>Discount : </Text>
                                        <Text style={{ color: '#a6acaf', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>{item.product ? item.product.discountPercent : ''} %</Text>

                                    </View>}

                                <Text style={{ color: '#025960', fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>Quantity: </Text>
                                <View style={styles.view10}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ loadingback: true })
                                        this.countPlus(item)
                                    }}
                                    >
                                        <Image style={styles.count} source={require('../images/storprofile/plus.png')} />
                                    </TouchableOpacity>
                                    <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ loadingback: true })
                                        this.countt(item)
                                    }}
                                    >
                                        <Image style={styles.count} source={require('../images/storprofile/min.png')} />
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>
                    </View>
                    <View style={styles.view31}></View>

                </View>
            ) : null
        )
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white',}}>
                   <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
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
                {this.state.loadingback1 && (
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                            position: 'absolute',
                            zIndex: 1000,
                        }}>

                    </View>
                )}
                <View style={styles.view3}>
                    <View style={styles.view4}>
                        <View style={styles.view5}>
                            <TouchableOpacity style={{ width: 110 }} onPress={() => this.props.navigation.goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />
                                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-Regular' }}>Cart</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                    <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {this.state.cartdata.length > 0 ?

                        <ScrollView bounces={false}>

                            <View style={styles.main1}>
                                <View>
                                    <View style={{ marginHorizontal: 20 }}>
                                        <FlatList
                                            bounces={false}
                                            keyExtractor={(item) => item.id}
                                            data={this.state.cartdata}
                                            renderItem={({ item }) =>
                                                this.cartdata(item)
                                            }
                                        />
                                    </View>
                                </View>

                                <View style={{ marginHorizontal: 20 }}>
                                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: wp('4.5'), fontFamily: 'Poppins-SemiBold' }}>Bill Details</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Total Items</Text>

                                        <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>{this.state.totalitem}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Delivery Charges</Text>
                                        <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Free</Text>
                                    </View>

                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Total Discount</Text>
                                        <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>{this.state.totalDiscount ? this.state.totalDiscount : 0} %</Text>
                                    </View> */}

                                    <View style={styles.view32}></View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: wp('4.5'), fontFamily: 'Poppins-SemiBold' }}>Amount Payable</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: wp('4.5'), fontFamily: 'Poppins-SemiBold' }}>${this.state.totalPrice}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ loadingback: true })
                                            this.goToNext()
                                        }}
                                        >
                                            <View style={styles.button}>
                                                <Text style={{ fontSize: 17, fontFamily: 'Poppins-SemiBold' }}>Check Out</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        :
                        <View style={{ flex: 1, margin: wp('10'), }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: wp('40'), width: wp('40'), backgroundColor: '#f9e79f', borderRadius: wp('10'), alignItems: 'center', justifyContent: 'center', }}>
                                    <Image style={{ height: wp('25'), width: wp('25') }} source={require('../images/carts.png')} />
                                </View>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', marginHorizontal: wp('2'), width: "50%" }}>Oops! It seems your basket is empty !</Text>
                            </View>
                        </View>}
                </View>
                <Modal
                    visible={this.state.cartmodal}
                    transparent={true}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', }}>
                        <View style={{ flex: 1, backgroundColor: 'white', margin: wp('2') }}>
                            <View style={styles.view4}>
                                <View style={styles.view5}>
                                    <View style={styles.view6}>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ cartmodal: false, cartfilterdata: [] })}>
                                            <Image style={{ ...styles.homeicon, tintColor: "#f1c644" }} source={require("../../../assets/icons/cancel.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginHorizontal: wp('4') }}>
                                <View style={{ borderWidth: 1, borderColor: '#cd6155', padding: wp('2'), borderRadius: wp('2'), marginVertical: wp('6') }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', color: '#cd6155' }}>Some item in your order are not deliverable to the selected address</Text>
                                </View>
                                <View style={{ height: '77%' }}>
                                    <FlatList
                                        data={this.state.cartfilterdata}
                                        renderItem={({ item }) => (
                                            <View >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item?.product._id, images: item.product.images.map((item) => BASE_URL + item) })} >
                                                        <Image style={styles.cartimage} source={{ uri: BASE_URL + item?.product?.images[0] }} />
                                                    </TouchableOpacity>
                                                    <View>
                                                        <View style={{ marginLeft: wp('3') }}>

                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: wp('4'), fontFamily: 'Poppins-SemiBold', width: wp('40') }}>{item?.product?.title}</Text>

                                                            </View>
                                                            <Text style={{ color: '#a6acaf', fontSize: wp('3.5') }}>{item.size}</Text>
                                                            <Text style={{ color: '#025960', fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>${item?.product?.currentProductPrice}</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={{ color: '#025960', fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>MaxQuantity: </Text>
                                                                <Text style={{ color: '#025960', fontSize: wp('4'), fontFamily: 'Poppins-SemiBold' }}>{item?.product.quantity}</Text>
                                                            </View>

                                                        </View>


                                                    </View>
                                                </View>
                                                <View style={styles.view31}></View>
                                            </View>
                                        )} />

                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    mainheader: {
        flex: 1,
        borderBottomWidth: 0.8,
        borderBottomColor: '#bdc3c7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20
    },
    main1: {
        flex: 6,
        marginTop: 30
    },
    text: {
        fontSize: 20,
        marginHorizontal: 10

    },
    cartimage: {
        height: wp('40'),
        width: wp('38'),
        resizeMode: 'cover',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 40,
        marginBottom: 10
    },
    homeicon: {
        height: wp('6'),
        width: wp('6'),
        tintColor: '#025960'
    },
    carticon: {
        height: wp('7'),
        width: wp('8'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',


    },
    count: {
        height: wp('6'),
        width: wp('6')
    },
    view31: {
        borderWidth: 0.5,
        borderColor: '#cecece',
        marginVertical: 20
    },
    view32: {
        borderWidth: 0.5,
        borderColor: '#cecece',
        marginVertical: 10
    },
    headerSingleButton1: {
        height: wp('5'),
        width: wp('5'),
        resizeMode: 'contain',
        tintColor: "#a6acaf"
    },
    view3: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight


    },
    view4: {
        justifyContent: 'center',
        borderBottomWidth: 0.7,
        borderColor: '#d5d5d5',
        height: wp('20'),
        paddingRight: 20
    },
    view5: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    view6: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    view7: {
        fontSize: 21,
        fontWeight: 'bold',
        maxWidth: wp('80')
    },
    view10: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
})
