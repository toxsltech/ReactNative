import { relativeTimeThreshold } from 'moment';
import React, { Component } from 'react'
import { Platform } from 'react-native';
import { Text, StyleSheet, View, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../../utils/env';
import { androidHeight, iosHeight, androidH1, iosH1 } from '../../../utils/constants';

export default class Wishlist extends Component {
    constructor() {
        super()
        this.state = {
            wishlistdate: [],
            sizeindex: 0
        }
    }

    componentDidMount = () => {
        this.props.onGetWishlist().then(() => this.afterGetWishlist());
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.onGetWishlist().then(() => this.afterGetWishlist());
        });
    }

    afterGetWishlist = () => {
        const wishlist = this.props.getWishlistResponse ? this.props.getWishlistResponse.data : '';
        this.setState({ wishlistdate: wishlist })
    }

    Wishlist = (item) => {
        const data = item.product ? item.product.images.map((item) => BASE_URL + item) : ''

        return (
            <View>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                {item.product ?
                    <View style={styles.margin}>

                        <View style={styles.functionmain}>
                            <Image style={styles.functionimage} source={{ uri: item.product ? BASE_URL + item.product.images[0] : '' }} />
                            <View style={styles.view1}>
                                <Text style={styles.text1}>{item.product ? item.product.title : ''}</Text>
                                <Text style={styles.text2}>${item.product ? item.product.afterDiscount : ''}</Text>

                                <Text style={{
                                    color: '#bdc3c7',
                                    fontSize: 12, flexDirection: 'row'
                                }}>{item.product ? item.product.size.toString() : ''}</Text>

                                <Text style={styles.text3}>{item.product ? item.product.sleeve.toString() : ""}</Text>

                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item.product._id, images: data })}>
                                <View style={styles.view2}>
                                    <Image style={styles.image} source={require('../images/plusbutton.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view31}></View>

                    </View >
                    : null}
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.view3}>
                    <View style={styles.view4}>
                        <View style={styles.view5}>
                            <View style={styles.view6}>
                                <TouchableOpacity style={{ width: 130 }} onPress={() => this.props.navigation.goBack()}>
                                    <View style={styles.view7}>
                                        <IonIcon name="chevron-back-outline" size={22} color='black' />
                                        <Text style={styles.text}>Wishlist</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                        <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.flex}>
                            {this.state.wishlistdate != '' ?
                                <FlatList
                                    bounces={false}
                                    keyExtractor={(item) => item.id}
                                    data={this.state.wishlistdate}
                                    renderItem={({ item }) =>
                                        this.Wishlist(item)
                                    }
                                /> : <Text style={{ textAlign: 'center', marginTop: wp('50') }}>No product found !!</Text>}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    functionimage: {
        height: hp('14'),
        width: wp('25'),
        borderRadius: 5
    },
    functionmain: {
        flex: 1,
        flexDirection: 'row',
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'

    },
    margin: {
        marginHorizontal: 20,
    },
    view1: {
        margin: wp('2'),
        width: wp('45')
    },
    text1: {
        fontSize: wp('4.3'),
        fontFamily: 'Poppins-SemiBold'
    },
    text2: {
        color: '#426b74',
        fontSize: 15,
        fontWeight: 'bold'
    },
    text3: {
        color: '#bdc3c7',
        fontSize: 12
    },
    view2: {
        margin: wp('2'),
        marginTop: Platform.OS === 'ios' ? androidH1 : iosH1
    },
    image: {
        height: Platform.OS === 'ios' ? wp('10') : wp('7'),
        width: wp('10'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
    },
    view31: {
        borderWidth: 0.5,
        borderColor: '#cecece',
        marginVertical: 20
    },
    view3: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight


    },
    view4: {
        flex: 1,
        backgroundColor: 'white',
    },
    view5: {
        borderBottomWidth: 0.7,
        borderColor: '#bdc3c7',
        justifyContent: 'center',
        paddingRight: 20,
        height: wp('20'),
        marginBottom: 20

    },
    view6: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    view7: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    view8: {
        width: 70,
        alignItems: 'center',

    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },
    flex: {
        flex: 6
    }
})
