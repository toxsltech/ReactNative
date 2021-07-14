import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class Cartscreen extends Component {
    constructor() {
        super();
        this.state = {
            price: 0,
            cartdata: []
        }
    }
    componentDidMount = () => {
        const { body } = this.props.route.params
        const total = body.orderData.map((item) => item.price * body.orderData.map((item) => item.quantity))
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = total.reduce(reducer)
        this.setState({ cartdata: body.orderData, price: totalPrice })
    }
    goToNext = () => {
        const { body } = this.props.route.params
        this.props.navigation.navigate('Address', { body: body })
    }

    cartdata = (item) => {
        return (
            <View style={{ flexDirection: 'row', }}>
                <Image style={styles.cartimage} source={{ uri: item.imagedate[0] }} />
                <View style={{ marginLeft: wp('10') }}>
                    <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', width: wp('40') }}>{item.titlename}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.size}>Size : </Text>
                        <Text style={{ color: '#a6acaf', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>{item.size}</Text>
                    </View>
                    {item.discount == undefined || item.discount == 'N/A' ?
                        null :
                        < View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#025960', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>Discount : </Text>
                            <Text style={{ color: '#a6acaf', fontSize: wp('3.5'), fontFamily: 'Poppins-SemiBold' }}>{item.discount} %</Text>

                        </View>}
                    <Text style={styles.size}>Price : ${item.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.size}>Quantity: </Text>
                        <Text style={styles.size}>{item.quantity}</Text>
                    </View>
                </View>

            </View >
        )
    }
    render() {
        const { price } = this.state

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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

                </View>

                <View style={styles.main1}>
                    <View>
                        <View style={{ marginHorizontal: 20 }}>
                            <FlatList
                                bounces={false}
                                style={{ height: 200, }}
                                keyExtractor={(item) => item.id}
                                data={this.state.cartdata}
                                renderItem={({ item }) =>
                                    this.cartdata(item)
                                }
                            />
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.8, height: wp('10'), alignItems: 'center', paddingHorizontal: 10, borderColor: '#a6acaf' }}>
                        <Text style={{ fontFamily: 'Poppins-Medium' }}>Do you have a promo code?</Text>
                        <TouchableOpacity>
                            <Text style={{ color: '#a6acaf' }}>Select</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={styles.view31}></View>
                    <View style={{ marginHorizontal: 20 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>Delivery Charges</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular' }}>Free</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('4.5') }}>Total Amount</Text>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('4.5') }}>${price}</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.goToNext()}
                            >
                                <View style={styles.button}>
                                    <Text style={{ fontSize: 17, fontFamily: 'Poppins-SemiBold' }}>Check Out</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    mainheader: {
        flex: 1,
        borderBottomWidth: 0.8,
        borderBottomColor: '#bdc3c7',
        flexDirection: 'row',
        alignItems: 'center'
    },
    main1: {
        flex: 6,
        marginTop: 10
    },
    text: {
        fontSize: 20,
        margin: 35
    },
    cartimage: {
        height: wp('40'),
        width: wp('38'),
        resizeMode: 'cover',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 80
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        marginLeft: wp('50'),
        tintColor: '#025960'
    },
    carticon: {
        height: wp('7'),
        width: wp('8'),
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
    size: {
        color: '#025960',
        fontSize: wp('3.5'),
        fontFamily: 'Poppins-SemiBold'
    }
})
