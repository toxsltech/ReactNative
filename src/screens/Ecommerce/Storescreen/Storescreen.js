
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, ImageBackground, TouchableOpacity, StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-shadow-cards';
import { BASE_URL } from '../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { androidHeight, iosHeight } from '../../../utils/constants';


export default class Storescreen extends Component {
    constructor() {
        super()
        this.state = {
            productdata: [],
            heart: false,
            storeImage: '',
            sellerName: '',
            storeName: '',
            storeData: [],
            bussinessName: '',
            userId: ''
        }
    }

    componentDidMount = async () => {
        const { sellerId } = this.props.route.params
        this.props.onGetStore(sellerId).then(() => this.afterStoreProfile())
        this.setData()
        this.Store(sellerId)
        const USERID = await AsyncStorage.getItem('USERID')
        this.setState({ userId: USERID })
    }

    setData = async () => {
        try {
            await AsyncStorage.setItem('store', 'true')
        } catch (e) {
            showNotification("danger", e);

        }
    }

    Store = async (id) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'auth/sellerDetail/' + id, {
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
                const storeName = data.map((item) => item.storeName)
                const bussinessName = data.map((item) => item.business)
                const image = data.map((item) => item.storeImage)
                const sellerName = data.map((item) => item.fullNameOfSeller)

                this.setState({ storeData: data, bussinessName: bussinessName, storeName: storeName, storeImage: image[0], sellerName: sellerName })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }

    afterStoreProfile = () => {
        const Info = this.props.storeResponse ? this.props.storeResponse.data : '';
        this.setState({ productdata: Info })
    }

    Seller = (item) => {

        return (
            <View style={{ marginHorizontal: wp('3') }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                    <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{item.storeName}</Text>
                    <Text style={{ color: '#bdc3c7', fontSize: 12 }}>{item.sellerName}</Text>
                    <Text style={{ color: '#025960', marginVertical: 10 }}>All Products</Text>
                </View>
            </View>
        )
    }
    Addwishlist = (id) => {
        let body = {
            product: id,
            isFav: this.state.heart
        }
        this.props.onWishlist(body).then(() => this.afterWishlist())
    }

    afterWishlist = () => {
        const Info = this.props.WishlistResponse ? this.props.WishlistResponse.data : '';
        const { sellerId } = this.props.route.params
        this.props.onGetStore(sellerId).then(() => this.afterStoreProfile())

    }

    Deletewishlist = (id) => {
        this.props.onDeleteWishlist(id).then(() => this.afterdeleteWishlist())
    }

    afterdeleteWishlist = () => {
        const Info = this.props.DeleteWishlistResponse ? this.props.DeleteWishlistResponse.data : '';
        const { sellerId } = this.props.route.params
        this.props.onGetStore(sellerId).then(() => this.afterStoreProfile())
    }

    Product = (item) => {
        const data = item.images.map((item) => BASE_URL + item)

        return (
            <View style={{ flex: 4, }}>
                <View style={{ flexDirection: 'row' }}>
                    <Card
                        elevation={6}
                      
                        style={styles.card}>
                        <View style={{ marginHorizontal: wp('0'), }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item._id, images: data })}
                            >
                                <ImageBackground style={styles.backimagefirst} source={{ uri: BASE_URL + item.images[0] }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ heart: !this.state.heart })
                                        setTimeout(() => {
                                            !item.isFavourite ?
                                                this.Addwishlist(item._id)
                                                :
                                                this.Deletewishlist(item._id)
                                        }, 10);
                                    }}>
                                        <Image style={{ height: wp('7'), width: wp('7') }} source={
                                            !item.isFavourite ?
                                                require('../images/store/hearthalf.png')
                                                : require('../images/store/heartfull.png')
                                        }
                                        />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </TouchableOpacity>
                            <View style={styles.cart1text}>
                                <View style={{ width: 110 }}>
                                    <Text style={styles.cart1text1}>{item.title}</Text>
                                    <Text style={styles.cart1text2}>{item.subcategory.title}</Text>
                                </View>
                                <View>
                                    <Text style={styles.cartprice}>${item.afterDiscount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>
            </View>
        )
    }

    render() {
        const { sellerId } = this.props.route.params

        return (
            <View style={{
                flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight
            }}>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{width:200}} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, }}>Seller Store Profile</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            {this.state.userId != sellerId ?
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatMessages', { sellerId: sellerId, user_name: this.state.sellerName })}>
                                    <Image style={styles.msgicon} source={require("../images/store/1.png")} />
                                </TouchableOpacity> : null}
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={{ flex: 7 }}>
                    {this.state.storeImage ?
                        <Image style={styles.mainimage} source={{ uri: BASE_URL + this.state.storeImage }} />
                        : <Image style={styles.mainimage11} source={require('../images/images.png')} />
                    }

                    <View style={{ marginHorizontal: wp('3'), height: wp('30'), marginBottom: wp('4') }}>
                        <View style={{ flex: 1, marginTop: 15 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{this.state.storeName}</Text>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#bdc3c7', padding: 2 }}>(Store Name)</Text>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#bdc3c7', }}>{this.state.bussinessName}</Text>
                                <Text style={{ fontSize: 14, color: '#bdc3c7', padding: 2 }}>(Bussiness Name)</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#025960', }}>@{this.state.sellerName}</Text>
                                {/* <Text style={{ fontSize: 12, color: '#bdc3c7', padding: 2 }}>(Bussiness Name)</Text> */}
                            </View>
                            <Text style={{ color: '#025960', marginVertical: 10, fontSize: 16, fontWeight: 'bold' }}>All Products</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, width: wp('100'), flex: 1, }}>


                        {this.state.productdata != '' ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                keyExtractor={(item) => item.id}
                                data={this.state.productdata}
                                renderItem={({ item }) =>
                                    this.Product(item)
                                }
                                bounces={false}
                            />
                            : <Text style={{ textAlign: 'center', marginTop: 50 }}>No product found !!</Text>}


                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backimagefirst: {
        height: hp('18'),
        width: wp('40'),

        marginBottom: 10,
        overflow: 'hidden',
        alignItems: 'flex-end',
        padding: 10,
    },
    card: {
        margin: 5,
        width: wp('46'),
        height: wp('50'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageheart: {
        height: wp('9'),
        width: wp('9')
    },
    msgicon: {
        height: wp('7'),
        width: wp('7')
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        marginHorizontal: 10,
        tintColor: '#025960'
    },
    mainimage: {
        height: wp('50'),
        width: wp('100%'),

    },
    mainimage11: {
        height: wp('50'),
        width: wp('100%'),

    },
    cart1text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    cart1text1: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        height: 15
    },
    cart1text2: {
        fontSize: 10,
        color: '#bdc3c7',
        fontFamily: 'Poppins-Regular',
    },
    cartprice: {
        color: '#025960',
        textAlign: 'right',
        fontSize: 11,
        fontFamily: 'Poppins-SemiBold',
        height: 16
    },
    buybutton: {
        backgroundColor: '#025960',
        width: 46,
        borderRadius: 50,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buytext: {
        textAlign: 'center',
        fontSize: 9,
        color: 'white'
    }
})

