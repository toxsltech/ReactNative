
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../../utils/env';
import { SliderBox } from "react-native-image-slider-box";
import moment from "moment";
import { Rating } from "react-native-rating-element";
import ResponsiveText from '../../../components/ResponsiveText'
import Fonts from '../../../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewMoreText from 'react-native-view-more-text';
import Swipeable from 'react-native-swipeable';
import showNotification from '../../../utils/services'
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class Storeprofile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imagedate: this.props.route.params.images,
            titlename: '',
            price: 0,
            isWishlisted: false,
            productid: '',
            count: 1,
            reviewdate: [],
            color: [],
            size: [],
            specificationcolor: '',
            specificationsize: '',
            description: '',
            currentProductPrice: 0,
            subcategory: '',
            quantity: 0,
            review: '',
            materials: '',
            sleeve: [],
            supply: '',
            rating: 0,
            rated: 0,
            measurement: [],
            cartCount: 0,
            paymentMethod: 'cash',
            ratingCount: 0,
            booked_by: '',
            maxcount: 0,
            status: false,
            sizeindex: 0,
            colorindex: 0,
            sleeveindex: 0,
            addedBy: '',
            loadingback: false
        }
    }

    componentDidMount = async () => {
        const USERID = await AsyncStorage.getItem('USERID')
        this.setState({ booked_by: USERID })
        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.getData()
            this.onGetSingleproduct()
        });
        this.onGetSingleproduct()
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
        try {
            const store = await AsyncStorage.getItem('store')
            if (store == 'true') {
                this.setState({ loadingback: true })
                this.onGetSingleproduct()
            }
        } catch (e) {
            showNotification("danger", e);

        }
    }

    afterGetCart = () => {
        const Info = this.props.getcartResponse ? this.props.getcartResponse.data : '';
        this.setState({ cartCount: Info.length })
    }
    onGetSingleproduct = () => {
        const { productid, images } = this.props.route.params ? this.props.route.params : ''
        this.setState({ imagedate: images })
        this.props.onGetSingleproduct(productid).then(() => this.afterGetSingleproduct());
    }

    afterGetSingleproduct = () => {
        this.setState({ loadingback: false })
        const productData = this.props.getSingleproductResponse ? this.props.getSingleproductResponse.data : '';
        const isWishlisted = this.props.getSingleproductResponse ? this.props.getSingleproductResponse.isWishlisted : '';
        this.setState({
            titlename: productData.title,
            price: productData.currentProductPrice,
            materials: productData.materials,
            isWishlisted: isWishlisted,
            productid: productData._id,
            color: productData.color,
            size: productData.size,
            sleeve: productData.sleeve,
            maxcount: productData.quantity,
            supply: productData.supply,
            description: productData.description,
            specificationcolor: productData.color[0],
            specificationsleeve: productData.sleeve[0],
            specificationsize: productData.size[0],
            currentProductPrice: productData.afterDiscount,
            subcategory: productData.subcategory.title,
            quantity: productData.quantity,
            measurement: productData.measurement,
            addedBy: productData.addedBy._id,
            discount: productData.discountPercent,
            rating: productData.rating
        })
        this.getReview(productData._id)
    }

    Addwishlist = (id) => {
        let body = {
            product: id,
            isFav: this.state.heart
        }
        this.props.onWishlist(body).then(() => this.afterWishlist())
    }

    afterWishlist = () => {
        this.onGetSingleproduct()
    }

    Deletewishlist = (id) => {
        this.props.onDeleteWishlist(id).then(() => this.afterdeleteWishlist())
    }

    afterdeleteWishlist = () => {
        this.onGetSingleproduct()
    }

    countt = () => {
        const { count } = this.state
        count <= 1 ? alert('Please choose atleast one quantity') : this.setState({ count: count - 1 })
    }

    countPlus = () => {
        const { count, quantity } = this.state
        count >= quantity ? alert(`We re sorry! Only ${quantity} unit(s) allowed in each order`) : this.setState({ count: count + 1 })
    }

    renderRightButtons(id) {
        return [
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => this.Delete(id)}>
                        <View style={styles.deleteContainer}>
                            <Image style={{ height: wp('5'), width: wp('5'), tintColor: 'white' }} source={require('../images/trash.png')} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        ];
    }
    Review = (item) => {

        return (
            <Swipeable
                rightButtons={this.renderRightButtons(item._id)}
                rightButtonWidth={75}
            >
                <View>
                    <View style={styles.view1}>
                        <Image style={styles.revieimage} source={{ uri: BASE_URL + item.commentBy.profileImg }} />
                        <View style={styles.width}>
                            <Text style={styles.reviewimagetext1}>{item.commentBy.userName}</Text>
                            <Text style={styles.reviewimagetext2}>{item.comment}</Text>
                        </View>

                        <Text style={styles.reviewimagetext3}>{moment(item.createdAt).calendar()}</Text>
                    </View>
                </View>
            </Swipeable>
        )
    }
    onLayout = e => {
        this.setState({
            width: e.nativeEvent.layout.width
        });
    }
    addReview = () => {
        this.props.onReview(this.state.productid, this.state.review).then(() => this.afteronReview())
    }
    afteronReview = () => {
        this.setState({ review: '' })
        this.getReview(this.state.productid)
    }
    getReview = (id) => {
        this.props.onGetReview(id).then(() => this.afterGetReview())
    }
    afterGetReview = () => {
        const Info = this.props.getReviewResponse ? this.props.getReviewResponse.data : '';
        this.setState({ reviewdate: Info })
    }
    addCart = () => {
        const { productid, count, specificationsleeve, specificationsize, specificationcolor } = this.state;
        {
            this.state.quantity != 0 ?
                this.props.AddToCart(productid, count, specificationsleeve, specificationsize, specificationcolor).then(() => this.afterAddToCart()) : alert('Out of Stock')
        }
    }
    afterAddToCart = () => {
        const Info = this.props.addcartResponse ? this.props.addcartResponse.data : '';
        this.props.navigation.navigate('CartList')
    }

    addProduct = () => {
        const { productid, count, specificationsleeve, specificationsize, specificationcolor, currentProductPrice, paymentMethod, booked_by, titlename, imagedate, discount, addedBy } = this.state;
        const body = {
            orderData: [
                {
                    product: productid,
                    quantity: count ? count : '',
                    sleeve: specificationsleeve ? specificationsleeve : '',
                    size: specificationsize ? specificationsize : '',
                    color: specificationcolor ? specificationcolor : '',
                    price: currentProductPrice ? currentProductPrice : '',
                    paymentMethod: paymentMethod,
                    booked_by: booked_by,
                    titlename: titlename,
                    imagedate: imagedate,
                    discount: discount == 'N/A' ? '' : discount,
                    sellerId: addedBy
                },
            ]
        }
        this.props.navigation.navigate('Cartscreen', { body: body })
    }

    renderViewMore = (onPress) => {
        return (
            <Text style={styles.userDescription} onPress={onPress}>View more</Text>
        )
    }

    renderViewLess = (onPress) => {
        return (
            <Text style={styles.userDescription} onPress={onPress}>View less</Text>
        )
    }
    Delete = async (id) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'review/deleteComment/' + id, {
            method: 'DELETE',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.getReview(this.state.productid)
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }

    render() {
        const { imagedate, titlename, price, isWishlisted, productid, color, size, description, specificationcolor, specificationsize, specificationsleeve, sleeve, sizeindex, colorindex, sleeveindex, addedBy, booked_by } = this.state

        return (
            <View style={{ flex: 1 }}>
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
                <View style={styles.view3}>
                    <View style={styles.view4}>
                        <View style={styles.view5}>
                            <View style={styles.view6}>
                                <TouchableOpacity style={{ width:50 ,marginLeft:20,justifyContent:'center'}} onPress={() => this.props.navigation.goBack()}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />

                                </TouchableOpacity>
                                <Text style={{ fontSize: 18, fontFamily: 'Poppins-Regular' }}>{this.state.subcategory}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                    <Image style={styles.img} source={require("../images/store/home.png")} />
                                </TouchableOpacity>

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
                    </View>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}>
                        <View style={{ flex: 6 }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ marginTop: wp('4'), marginLeft: wp('80') }}>
                                    <TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ heart: !this.state.heart })
                                            setTimeout(() => {
                                                !isWishlisted ?
                                                    this.Addwishlist(productid)
                                                    :
                                                    this.Deletewishlist(productid)
                                            }, 10);
                                        }}>
                                            <Image style={{ height: wp('7'), width: wp('7') }} source={
                                                !isWishlisted ?
                                                    require('../images/store/hearthalf.png')
                                                    :
                                                    require('../images/store/heartfull.png')
                                            }
                                            />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.image2} onLayout={() => this.onLayout}>
                                    <SliderBox
                                        images={imagedate}
                                        sliderBoxHeight={hp('48')}
                                        parentWidth={this.state.width}
                                        circleLoop
                                        resizeMode={'contain'}
                                        dotColor="#f1c40f"
                                        inactiveDotColor="#90A4AE"
                                        resizeMethod={'resize'}
                                        resizeMode={'cover'}
                                        ImageComponentStyle={{ width: '100%', backgroundColor: '#fff' }}
                                        imageLoadingColor="#f1c40f"
                                        dotStyle={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 10,
                                            marginHorizontal: 2,
                                            paddingHorizontal: 10,
                                        }}
                                        onCurrentImagePressed={index =>
                                            this.props.navigation.navigate('ImagesDispalyed', { index: imagedate })
                                        }
                                        bounces={false}
                                    />
                                </View>
                            </View>
                            <View style={{ marginHorizontal: wp('3'), }}>
                                <View style={styles.view5}>
                                    <View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.view7}>{titlename}</Text>
                                            <Text style={styles.view8}>{this.state.subcategory}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Rating
                                                    rated={3}
                                                    totalCount={5}
                                                    ratingColor="#f1c644"
                                                    ratingBackgroundColor="#d4d4d4"
                                                    size={24}
                                                    readonly
                                                    icon="ios-star"
                                                    direction="row"
                                                />

                                            </View>

                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Storescreen', { sellerId: addedBy })}>
                                                <View style={{
                                                    height: wp('4'),
                                                    width: Platform.OS === "ios" ? wp('30') : wp('28'),
                                                    resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
                                                    borderRadius: 20,
                                                    marginTop: 10, flexDirection: 'row',
                                                    backgroundColor: '#025960', alignItems: 'center',
                                                    justifyContent: 'space-around',
                                                    padding: Platform.OS === "ios" ? 2 : 8
                                                }}>
                                                    <Image style={{ height: wp('3'), width: wp('3'), alignItems: 'center', }} source={require('../images/shop.png')}
                                                    />
                                                    <Text style={{
                                                        color: 'white',
                                                        fontSize: 10,
                                                        paddingLeft: 5

                                                    }}>Seller Store Point</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.text1}>${this.state.currentProductPrice}</Text>

                                        {this.state.discount == undefined || this.state.discount == 'N/A' ? null :
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={styles.price1}> Discount: </Text>
                                                <Text style={styles.price1}>{this.state.discount}%</Text>
                                            </View>
                                        }
                                        {price > this.state.currentProductPrice ?
                                            <Text style={styles.price}>${price}</Text>
                                            : null}
                                    </View>
                                </View>
                                <View style={styles.descriptionContainer}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 2,
                                        }}>
                                    </View>
                                    <ViewMoreText
                                        numberOfLines={3}
                                        renderViewMore={this.renderViewMore}
                                        renderViewLess={this.renderViewLess}
                                    >
                                        <ResponsiveText style={{ fontFamily: 'Poppins-Regular' }}>
                                            {description ? description : ''}
                                        </ResponsiveText>
                                    </ViewMoreText>
                                </View>
                                <View style={{ marginVertical: 10, }}>
                                    <Text style={styles.text3}>Product Specifications</Text>
                                    <View style={styles.row}>
                                        <Text style={styles.text}>Colors </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{specificationcolor ? specificationcolor : 'N/A'}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.text}>Materials </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{this.state.materials ? this.state.materials : 'N/A'}</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={styles.text}>Supply Type </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{this.state.supply ? this.state.supply.toString() : 'N/A'}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.text}>Size </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{specificationsize ? specificationsize : 'N/A'}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.text}>Sleeve style </Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular' }}>{specificationsleeve ? specificationsleeve : 'N/A'}</Text>
                                    </View>
                                </View>
                                <View >
                                    <Text style={styles.text3}>Size</Text>
                                    <View style={styles.row}>
                                        {size.map((item, index) => (
                                            <TouchableOpacity
                                                style={{ margin: 5 }} onPress={() => this.setState({ specificationsize: item, sizeindex: index })}>
                                                <View style={{ ...styles.view9, backgroundColor: sizeindex == index ? "#f1c644" : '#ededed', }}>
                                                    <Text style={{ color: sizeindex == index ? "black" : '#b3b6b7', fontFamily: 'Poppins-Regular' }}>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}

                                    </View>
                                    <View>
                                        <Text style={styles.text3}>Colors</Text>
                                        <View style={styles.row}>
                                            {color.map((item, index) => (
                                                <TouchableOpacity
                                                    style={{
                                                        margin: 5, justifyContent: 'center'
                                                    }}
                                                    onPress={() => this.setState({ specificationcolor: item, colorindex: index })} >
                                                    <View style={{
                                                        ...styles.color, backgroundColor: `${item.toLowerCase()}`, borderRadius: wp('8'),
                                                        height: colorindex == index ? wp('9') : wp('6'),
                                                        width: colorindex == index ? wp('9') : wp('6'),
                                                    }}></View>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>

                                    <Text style={styles.text3}>Sleeve style</Text>
                                    <View style={styles.row}>
                                        {sleeve.map((item, index) => (
                                            <TouchableOpacity
                                                style={{ margin: 5 }} onPress={() => this.setState({ specificationsleeve: item, sleeveindex: index })}>
                                                <View style={{
                                                    height: wp('7'),
                                                    width: wp('28'),
                                                    borderRadius: wp('2'),
                                                    backgroundColor: '#ededed',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: sleeveindex == index ? "#f1c644" : '#ededed',
                                                    paddingHorizontal: wp('2')
                                                }}>
                                                    <Text style={{ color: sleeveindex == index ? "black" : '#b3b6b7', fontFamily: 'Poppins-Regular' }}>{item}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}

                                    </View>


                                </View>

                                <View>
                                    <Text style={styles.text3}>Quantity</Text>
                                    <View style={styles.view10}>
                                        <TouchableOpacity onPress={() =>
                                            this.countPlus()}
                                        >
                                            <Image style={styles.count} source={require('../images/storprofile/plus.png')} />
                                        </TouchableOpacity>
                                        <Text style={{ marginHorizontal: 10 }}>{this.state.count}</Text>
                                        <TouchableOpacity onPress={() =>
                                            this.countt()}
                                        >
                                            <Image style={styles.count} source={require('../images/storprofile/min.png')} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>

                            {booked_by != addedBy ? (
                                <View>
                                    {this.state.quantity != 0 ?
                                        <TouchableOpacity onPress={() => this.addProduct()}>
                                            <View style={styles.view11}>
                                                <Image style={styles.image} source={require('../images/storprofile/button1.png')} />
                                            </View>
                                        </TouchableOpacity>
                                        : null}
                                    <TouchableOpacity onPress={() => this.addCart()}>
                                        <View style={styles.view11}>
                                            <Image style={styles.image} source={require('../images/storprofile/button2.png')} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : null}

                            <View style={styles.view12}>
                                <Text style={styles.returntextmain}>
                                    Return & Cancellation policy
                                </Text>
                                <Text style={styles.reviewtext}>Within 24 days Returns</Text>
                                <Text style={styles.reviewtext}>Don't remove price tag</Text>
                            </View>
                            <View >
                                <View style={{ flexDirection: 'row' }}>

                                </View>
                                <View style={styles.reviewinput}>
                                    <TextInput
                                        style={{ padding: 0, width: 190, fontFamily: 'Poppins-Regular' }}
                                        placeholder='Add Review'
                                        value={this.state.review}
                                        onChangeText={(e) => {
                                            this.setState({ review: e })
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => this.addReview()}>
                                        <Image style={styles.image1} source={require('../images/storprofile/arrow.png')} />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={this.state.reviewdate}
                                    renderItem={({ item }) =>
                                        this.Review(item)
                                    }

                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    star: {
        height: wp('3'),
        width: wp('3')
    },
    button: {
        height: wp('14'),
        width: wp('35'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
    },
    text: {
        width: wp('55'),
        color: '#bdc3c7',
        fontFamily: 'Poppins-Regular'
    },
    size: {
        height: wp('8'),
        width: wp('8')
    },
    color: {
        height: wp('7'),
        width: wp('7'),
        borderWidth: 1
    },
    count: {
        height: wp('8'),
        width: wp('8')
    },
    revieimage: {
        backgroundColor: 'gray',
        height: wp('10'),
        width: wp('10'),
        borderRadius: 50,
        marginHorizontal: 10,

    },
    returntextmain: {
        fontSize: 15,
        marginBottom: 5,
        fontFamily: 'Poppins-Regular'
    },
    reviewtext: {
        color: '#bdc3c7',
        fontSize: 13,
        fontFamily: 'Poppins-Regular'
    },
    ratingtextmain: {
        fontSize: 15,
        marginBottom: 5,
        fontFamily: 'Poppins-Regular',
        marginHorizontal: 10
    },
    reviewinput: {
        borderWidth: 2,
        backgroundColor: '#ededed',
        height: wp('11'),
        width: wp('70'),
        borderRadius: 50,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderColor: '#d8d8d8',
        marginTop: 10,
        marginBottom: 10
    },
    reviewimagetext1: {
        fontSize: wp('4'),
        fontFamily: 'Poppins-Regular'
    },
    reviewimagetext2: {
        fontSize: wp('3.7'),
        color: '#bdc3c7'
    },
    reviewimagetext3: {
        fontSize: 13,
        color: '#bdc3c7',
        textAlign: 'right'
    },
    view1: {
        flexDirection: 'row',
        margin: 10
    },
    view2: {
        backgroundColor: '#00ce00',
        height: 10,
        width: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        bottom: 4,
        left: wp('10')
    },
    width: {
        width: wp('50')
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
        alignItems: 'center',
      
    },
    row: {
        flexDirection: 'row'
    },
    view7: {
        fontSize: 21,
        maxWidth: wp('80'),

        fontFamily: 'Poppins-SemiBold'
    },
    view8: {
        color: '#025960',
        fontSize: 16,
        maxWidth: wp('80'),
        fontFamily: 'Poppins-SemiBold'
    },
    text1: {
        color: '#025960',
        textAlign: 'right',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold'
    },
    text2: {
        color: '#bdc3c7',
        fontSize: 12
    },
    text3: {
        color: '#025960',
        fontSize: 15,
        marginVertical: 5,
        fontFamily: 'Poppins-SemiBold'
    },
    view9: {
        height: wp('7'),
        width: wp('7'),
        borderRadius: wp('7'),
        backgroundColor: '#ededed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view10: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    view11: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 1
    },
    image: {
        height: wp('16'),
        width: wp('78'),
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
    },
    view12: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#bdc3c7',
        height: wp('25'),
        margin: 10,
        justifyContent: 'center'
    },
    image1: {
        height: wp('5'),
        width: wp('5'),
        alignItems: 'flex-end'
    },
    img: {
        height: 25,
        width: 25,
        marginHorizontal: 5,
        tintColor: '#025960'
    },
    card: {
        margin: 5,
        width: wp('90'),
        height: wp('60'),
        alignItems: 'center',
        marginVertical: wp('5')
    },
    image2: {
        width: wp('89'),
        height: wp('100'),
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',
    },
    price: {
        color: '#cacfd2',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    price1: {
        color: '#cacfd2',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
    },
    carticon: {
        height: wp('7'),
        width: wp('8'),
    },
    settingIconContainer: { paddingTop: wp('2') },
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
    headerNotificationIcon: {
        height: Platform.OS === 'ios' ? wp('8') : wp('7'),
        width: Platform.OS === 'ios' ? wp('7') : wp('7'),
        resizeMode: 'contain',
        tintColor: '#025960',
    },
    descriptionContainer: {
        marginTop: wp('1'),
    },
    userDescription: {
        fontFamily: Fonts.SourceSansProRegular,
        fontSize: 12,
    },
    deleteContainer: {
        marginBottom: 10,
        width: 50,
        height: "70%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,

    },
    deleteContainer1: {
        marginBottom: 10,
        width: 30,
        height: "60%",
        backgroundColor: "#025960",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,

    },
    deleteText: {
        color: '#fff'
    },
    headerSingleButton1: {
        height: wp('10'),
        width: wp('10'),
        resizeMode: 'contain',
        tintColor: "#8ae029"
    },
    deleteButton: {
        width: 30
    }
})
