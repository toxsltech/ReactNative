/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, TextInput, FlatList, ImageBackground } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SliderBox } from "react-native-image-slider-box";
import { BASE_URL } from '../../../utils/env';
import { RefreshControl } from 'react-native';
import ResponsiveText from '../../../components/ResponsiveText'
import Fonts from '../../../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { androidHeight, iosH5 } from '../../../utils/constants';

export default class Newhome extends Component {
    constructor() {
        super()
        this.state = {
            inputtext: '',
            images: [],
            dailydate: [],
            recommenededdate: [],
            bestdealsdate: [],
            healthdate: [],
            bakingdate: [],
            isFetching: false,
            cartCount: 0,
        }
    }

    componentDidMount() {
        this.props.onGetProfile().then(() => this.afterGetProfile());
        this.categorydata()
        this.bannerdata()

        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.getData()
        });
        this.props.onGetCart().then(() => this.afterGetCart())

    }
    getData = async () => {
     
          
        try {
            const cart = await AsyncStorage.getItem('cart')
            if (cart == 'true') {
                this.props.onGetCart().then(() => this.afterGetCart())
            }
        } catch (e) {
            showNotification("danger", e);

        }
    }

    afterGetCart = () => {
        const Info = this.props.getcartResponse ? this.props.getcartResponse.data : '';
        this.setState({ cartCount: Info.length })
    }
    handleRefresh = () => {
        this.setState({ isFetching: true }, async () => {
            this.categorydata()
            this.props.onGetProfile().then(() => this.afterGetProfile());
            this.bannerdata()
        });

    }

    categorydata = () => {
        this.props.onGetCategory().then(() => this.afterGetCategory());
    }

    bannerdata = () => {
        this.props.onGetBanner().then(() => this.afterGetBanner());
    }

    afterGetProfile = () => {
        const storyData = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
        this.setState({ isFetching: false, })
    }
    afterGetBanner = () => {
        const Data = this.props.getbannerResponse ? this.props.getbannerResponse.data : '';
        const data = Data.map((item) => item.bannerImgs)
        const data1 = data.map((item) => BASE_URL + item)
        this.setState({ images: data1 })

    }

    afterGetCategory = () => {
        const storyData = this.props.getcategoryResponse ? this.props.getcategoryResponse.data : '';
        this.setState({ dailydate: storyData.NewIn, bestdealsdate: storyData.bestDeal, healthdate: storyData.thirdRow, bakingdate: storyData.fourthRow, isFetching: false })
 }

    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    };

    daily = (item) => {
        const data = item.images.map((item) => BASE_URL + item)

        return (
            <View style={styles.view6}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item._id, images: data })}>
                    <ImageBackground style={styles.image} source={{ uri: BASE_URL + item.images[0] }}></ImageBackground>
                </TouchableOpacity>
                <View style={styles.margin1}>
                    <Text style={styles.text4}>{item.title}</Text>
                    <Text style={styles.text3}>${item.afterDiscount}</Text>
                </View>
            </View>
        )
    }

    recommended = (item) => {
        const data = item.images.map((item) => BASE_URL + item)

        return (
            <View style={styles.view6}>
                <ImageBackground style={styles.image} source={{ uri: item.uri }}></ImageBackground>
                <View style={styles.margin1}>
                    <Text style={styles.text4}>{item.title}</Text>
                    <Text style={styles.text3}>${item.afterDiscount}</Text>
                </View>
            </View>
        )
    }

    bestdeals = (item) => {
        const data = item.images.map((item) => BASE_URL + item)

        return (
            <View style={styles.view6}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item._id, images: data })} >
                    <ImageBackground style={styles.image} source={{ uri: BASE_URL + item.images[0] }}></ImageBackground>
                </TouchableOpacity>
                <View style={styles.margin1}>
                    <Text style={styles.text4}>{item.title}</Text>
                    <Text style={styles.text3}>${item.afterDiscount}</Text>
                </View>
            </View>
        )
    }

    health = (item) => {
        const data = item.images.map((item) => BASE_URL + item)

        return (
            <View style={styles.view6}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item._id, images: data })}>
                    <ImageBackground style={styles.image} source={{ uri: BASE_URL + item.images[0] }}></ImageBackground>
                </TouchableOpacity>
                <View style={styles.margin1}>
                    <Text style={styles.text4}>{item.title}</Text>
                    <Text style={styles.text3}>${item.afterDiscount}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { inputtext } = this.state

        return (
            <View style={styles.safeAreaView}>
                <View style={styles.view1} >
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.view2} onPress={() => this.props.navigation.navigate('Setting',{statusofpage:'ecommerce'})} >
                            <IonIcon name="grid" color='#025960' size={30} />
                        </TouchableOpacity>
                        <View style={styles.view3}>
                            <Image style={styles.searchicon} source={require("../images/msgsearch.png")} />
                            <TextInput
                                style={styles.text}
                                placeholder='Search'
                                onChangeText={(inputtext) => this.setState({ inputtext })}
                                returnKeyType='search'
                                value={this.state.inputtext}
                                onSubmitEditing={() => {
                                    this.props.navigation.navigate('Filtersearch', {
                                        inputtext: inputtext
                                    })
                                    this.setState({ inputtext: '' })
                                }}
                            />
                        </View>
                        <TouchableOpacity style={styles.cartIconContainer}
                            onPress={() => this.props.navigation.navigate('CartList')}
                        >
                            <Image
                                source={require("../../../assets/icons/cart.png")}
                                style={styles.headerNotificationIcon}
                            />
                            {this.state.cartCount && this.state.cartCount != '0' ? (
                                <View style={styles.notificationBadge}>
                                    <ResponsiveText
                                        style={{
                                            fontSize: 2.5,
                                            color: '#000',
                                            fontFamily: Fonts.OpenSansRegular,
                                        }}>
                                        {this.state.cartCount}
                                    </ResponsiveText>
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.flex}>
                    {this.state.isFetching ? null :

                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={this.state.isFetching} onRefresh={this.handleRefresh} />
                            }>
                            <View style={styles.view4} onLayout={() => this.onLayout}>
                                <SliderBox
                                    images={this.state.images}
                                    sliderBoxHeight={hp('20')}
                                    // onCurrentImagePressed={}
                                    parentWidth={this.state.width}
                                    autoplay
                                    circleLoop
                                    bounces={false}
                                />
                            </View>
                            <View>
                                <View style={styles.view5}>
                                    <View>
                                        <Text style={styles.text1}>DAILY NEW IN</Text>
                                    </View>
                                    <View style={styles.margin}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            keyExtractor={(item) => item._id}
                                            data={this.state.dailydate.slice(0, 8)}
                                            renderItem={({ item }) =>
                                                this.daily(item)
                                            }
                                            bounces={false}

                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch', { eachcategoriesdata: this.state.dailydate, key: 'NewIn' })}>
                                        <Text style={styles.text2} >View All</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.view5}>
                                    <Text style={styles.text1}>BEST DEALS</Text>
                                    <View style={styles.margin}>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            keyExtractor={(item) => item._id}
                                            data={this.state.bestdealsdate.slice(0, 8)}
                                            renderItem={({ item }) =>
                                                this.bestdeals(item)
                                            }
                                            bounces={false}

                                        />
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch', { eachcategoriesdata: this.state.bestdealsdate, key: 'bestDeal' })}>
                                            <Text style={styles.text2}>View All</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.view5}>
                                    <Text style={styles.text1}>FASHION AND LIFESTYLES</Text>
                                    <View style={styles.margin}>
                                        <FlatList showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            keyExtractor={(item) => item._id}
                                            data={this.state.healthdate.slice(0, 8)}
                                            renderItem={({ item }) =>
                                                this.health(item)
                                            }
                                            bounces={false}

                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Filtersearch', { eachcategoriesdata: this.state.healthdate, key: 'thirdRow' })}>
                                        <Text style={styles.text2}>View All</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    }
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                        style={styles.cameraButton}>
                        <View>
                            <Image
                                source={require('../../../assets/icons/home_tab.png')}
                                style={styles.cameraIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchicon: {
        height: 15,
        width: 15,
        marginHorizontal: 5,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white'
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? iosH5 : androidHeight

    },
    row: {
        flexDirection: 'row'
    },
    view2: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view3: {
        width: wp('67'),
        height: 35,
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },
    text: {
        width: wp('50'),
        padding: 0
    },
    flex: {
        flex: 7
    },
    view4: {
        width: '100%',
        marginBottom: 15
    },
    view5: {
        borderBottomWidth: 2,
        marginBottom: 15,
        borderColor: '#f0f3f4'
    },
    text1: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginBottom: 10
    },
    text2: {
        textAlign: 'center',
        marginBottom: 15,
        color: '#979a9a'
    },
    margin: {
        marginHorizontal: 10
    },
    margin1: {
        margin: 10
    },
    view6: {
        flex: 1,
        marginHorizontal: 5
    },
    image: {
        height: hp('8'),
        width: wp('23'),
        borderRadius: 5,
        overflow: 'hidden',
    },
    text3: {
        color: '#025960',
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center'
    },
    text4: {
        color: '#025960',
        fontSize: 13,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        width: wp('20')
    },
    headerNotificationIcon: {
        height: wp('10'),
        width: wp('9'),
        resizeMode: 'contain',
        tintColor: '#025960',
    },
    notificationBadge: {
        height: wp('3.5'),
        width: wp('3.5'),
        backgroundColor: '#ffce31',
        borderRadius: wp('3.5'),
        position: 'absolute',
        right: -5,
        top: -1.5,
        elevation: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cameraButton: {
        height: wp('15'),
        width: wp('15'),
        backgroundColor: '#ffce31',
        borderRadius: wp('15'),
        elevation: 3,
        position: 'absolute',
        bottom: wp('5'),
        right: wp('5'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        height: wp('8'),
        width: wp('8'),
        resizeMode: 'contain',
        tintColor: '#025960'
    },
})



