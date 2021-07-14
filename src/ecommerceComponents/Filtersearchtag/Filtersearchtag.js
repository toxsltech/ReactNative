import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { Card } from 'react-native-shadow-cards';
import { BASE_URL } from '../../utils/env';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class Filtersearchtag extends Component {
    constructor() {
        super()
        this.state = {
            heart: false
        }
    }
    Addwishlist = (id) => {
        let body = {
            product: id,
            isFav: this.state.heart
        }
        this.props.onWishlist(body).then(() => this.afterWishlist())
    }
    afterWishlist = () => {
        this.props.tag()
        const Info = this.props.WishlistResponse ? this.props.WishlistResponse.data : '';
    }
    Deletewishlist = (id) => {
        this.props.onDeleteWishlist(id).then(() => this.afterdeleteWishlist())
    }
    afterdeleteWishlist = () => {
        this.props.tag()
        const Info = this.props.DeleteWishlistResponse ? this.props.DeleteWishlistResponse.data : '';
    }
    render() {
        const { item } = this.props
        const data = item.images.map((item) => BASE_URL + item)

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Card
                    elevation={6}
                    style={{ margin: 5, width: wp('44'), height: hp('29'), alignItems: 'center' }}>
                    <View style={{}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item._id, images: data })}>
                            <ImageBackground style={styles.backimagefirst} source={{ uri: BASE_URL + item.images[0] }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ heart: !this.state.heart })
                                    setTimeout(() => {
                                        !item.isWishlisted ?
                                            this.Addwishlist(item._id)
                                            :
                                            this.Deletewishlist(item._id)

                                    }, 10);
                                }}>
                                    <Image style={{ height: wp('7'), width: wp('7') }} source={
                                        !item.isWishlisted ?
                                            require('../../screens/Ecommerce/images/store/hearthalf.png')
                                            :
                                            require('../../screens/Ecommerce/images/store/heartfull.png')
                                    }
                                    />
                                </TouchableOpacity>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                            <View style={{ width: wp('26'), }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, height: 15 }} >{item.title}</Text>
                                <Text style={{ fontSize: 9, color: '#bdc3c7', fontFamily: 'Poppins-Regular', }}>{item.subcategory.title}</Text>
                            </View>
                            <View style={{}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item._id, images: data })}>
                                    <Text style={{ color: '#025960', textAlign: 'right', fontSize: 13, fontFamily: 'Poppins-SemiBold', height: 16 }}>${item.afterDiscount}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backimagefirst: {
        height: hp('21'),
        width: wp('44'),
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
        alignItems: 'flex-end',
        padding: 10
    },
    msgicon: {
        height: wp('7'),
        width: wp('7')
    },
})
