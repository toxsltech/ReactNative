import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList, ScrollView, StatusBar } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BASE_URL } from '../../../utils/env';
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { androidHeight, iosHeight } from '../../../utils/constants';



export default class Myorder extends Component {
    constructor() {
        super()
        this.state = {
            check1: true,
            check2: false,
            check3: false,
            activedata: [],
            addressData: [],
            activetransitiondata: [],
            compliteddata: [],
            cancelleddata: [],
            check4: false,
            returndata: [],
            returnStatus: ''

        }
    }
    componentDidMount = () => {
        this.props.onGetUserProduct().then(() => this.afterGetCart())
        this.cancel()
        this.completed()
        this.returnRequestData()

        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.props.onGetUserProduct().then(() => this.afterGetCart())
            this.cancel()
            this.completed()
            this.returnRequestData()
        });

    }

    afterGetCart = () => {
        const Info = this.props.getUserProductResponse ? this.props.getUserProductResponse.data : '';
        this.setState({ activedata: Info })
    }

    cancel = async () => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'order/cancelOrder/', {
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
                this.setState({ cancelleddata: data })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }
    completed = async () => {
        var token = await AsyncStorage.getItem('token');

        fetch(BASE_URL + 'order/completeOrder/', {
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
                this.setState({ compliteddata: data })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }
    returnRequestData = async () => {
        var token = await AsyncStorage.getItem('token');
        
        fetch(BASE_URL + 'refundRequest/refundStatusToUser', {
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
                this.setState({ returndata: data, })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }
    renderRightButtons(id) {
        return [
            <TouchableOpacity
                style={styles.deleteButon}
                onPress={() => this.Delete(id)}>
                <View style={styles.deleteContainer}>
                    <Image
                        source={require('../../../assets/icons/delete.png')}
                        style={styles.headerSingleButton1}
                    />
                </View>
            </TouchableOpacity>

        ];
    }


    active = (item, index) => {
        return (
            <View>
                {item.product ?
                    <View style={styles.functionmain}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('cartdetail', { item: item })} >
                            <Image style={styles.functionimage} source={{ uri: BASE_URL + item?.product?.images[0] }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', margin: 10, flex: 1, justifyContent: 'space-between' }}>
                            <View >
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2') }}>Order Id: {item.orderId}</Text>
                                <Text style={{ color: '#426b74', fontFamily: 'Poppins-SemiBold', fontSize: wp('3.5') }}>Price : ${item.price}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Quantity: {item.quantity}</Text>
                                </View>
                                {item.quantity == 1 ? null :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Total Price: ${item.price * item.quantity}</Text>
                                    </View>}
                                <Text style={{ color: '#bdc3c7', fontSize: wp('2.7') }}>{moment(item.createdAt).calendar()}</Text>
                            </View>
                            {/* <View style={{}}>
                                <Text style={{ fontFamily: "Poppins-Regular", fontSize: wp('3.5') }}>New</Text>
                            </View> */}
                            <View style={{}}>

                                <Text style={{ fontFamily: "Poppins-Regular", fontSize: wp('3.5') }} >In Transition</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Trackscreen', { item: item })}>
                                    <View style={{ backgroundColor: '#426b74', width: wp('21'), borderRadius: 50, height: wp('7'), justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontSize: wp('2.5'), color: 'white' }}>Track order</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    : null}
            </View >
        )
    }
    activetransition = (item) => {
        return (
            <View style={styles.functionmain}>
                <Image style={styles.functionimage} source={{ uri: item.uri }} />

                <View style={{ flexDirection: 'row', margin: 10, flex: 1, justifyContent: 'space-between' }}>

                    <View style={{}}>

                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2') }}>Order Id: 1212121</Text>
                        <Text style={{ color: '#426b74', fontWeight: 'bold', fontSize: wp('3.5') }}>$!50</Text>
                        <Text style={{ color: '#bdc3c7', fontSize: wp('2.7') }}>30 Dec 2020 ! 10:22pm</Text>
                    </View>
                    <View style={{}}>

                        <Text style={{ fontFamily: "Poppins-Regular", fontSize: wp('3.5') }} >In Transition</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Trackscreen')}>
                            <View style={{ backgroundColor: '#426b74', width: wp('21'), borderRadius: 50, height: wp('7'), justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', fontSize: wp('2.5'), color: 'white' }}>Track order</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
    completedTag = (item) => {
        const data = item.product.images.map((item) => BASE_URL + item)
        return (
            <View>

                {item.product ?
                    <View style={styles.functionmain}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item.product._id, images: data })}>

                            <Image style={styles.functionimage} source={{ uri: BASE_URL + item?.product?.images[0] }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', margin: 10, flex: 1, justifyContent: 'space-between' }}>
                            <View >
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2') }}>Order Id: {item.orderId}</Text>
                                <Text style={{ color: '#426b74', fontFamily: 'Poppins-SemiBold', fontSize: wp('3.5') }}>Price : ${item.price}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Quantity: {item.quantity}</Text>
                                </View>
                                {item.quantity == 1 ? null :
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Total Price: ${item.price * item.quantity}</Text>
                                    </View>}
                                <Text style={{ color: '#bdc3c7', fontSize: wp('2.7') }}>{moment(item.createdAt).calendar()}</Text>
                            </View>
                            <View style={{}}>

                                <Text style={{ fontFamily: "Poppins-Regular", fontSize: wp('3.5') }} >In Transition</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Trackscreen', { item: item })}>
                                    <View style={{ backgroundColor: '#426b74', width: wp('21'), borderRadius: 50, height: wp('7'), justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontSize: wp('2.5'), color: 'white' }}>Track order</Text>
                                    </View>
                                </TouchableOpacity>


                                <View style={{ marginTop: wp('2') }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Orderreturn', { item: [item] })}>
                                        <Text style={{ color: '#2ecc71', fontSize: wp('3.5') }}>Return</Text>
                                    </TouchableOpacity>
                                </View> 

                            </View>


                        </View>

                    </View>
                    : null}
            </View >
        )
    }
    cancelled = (item) => {
        const data = item.product.images.map((item) => BASE_URL + item)
        return (

            <View style={styles.functionmain}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item.product._id, images: data })}>
                    <Image style={styles.functionimage} source={{ uri: BASE_URL + item?.product?.images[0] }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', margin: 10, flex: 1, justifyContent: 'space-between' }}>
                    <View style={{}}>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2') }}>Order Id: {item.orderId}</Text>
                        <Text style={{ color: '#426b74', fontFamily: 'Poppins-SemiBold', fontSize: wp('3.5') }}>Price : ${item.price}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Quantity: {item.quantity}</Text>
                        </View>
                        {item.quantity == 1 ? null :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Total Price: ${item.price * item.quantity}</Text>
                            </View>}
                        <Text style={{ color: '#bdc3c7', fontSize: wp('2.7') }}>{moment(item.createdAt).calendar()}</Text>
                    </View>

                </View>
            </View>


        )
    }
    returnData = (item) => {
       
        const data = item.productID.images.map((item) => BASE_URL + item)
        return (

            <View style={styles.functionmain}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item.productID._id, images: data })}>
                    <Image style={styles.functionimage} source={{ uri: BASE_URL + item?.product?.images[0] }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', margin: 10, flex: 1, justifyContent: 'space-between' }}>
                    <View style={{}}>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2') }}>Order Id: {item.orderID}</Text>
                        <Text style={{ color: '#426b74', fontFamily: 'Poppins-SemiBold', fontSize: wp('3.5') }}>Price : ${item.amount}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: wp('3.2'), color: '#426b74' }}>Quantity: {item.quantity}</Text>
                        </View>

                        <Text style={{ color: '#bdc3c7', fontSize: wp('2.7') }}>{moment(item.createdAt).calendar()}</Text>
                    </View>
                    <View style={{ marginTop: wp('2') }}>
                        <Text style={{ color: '#2ecc71', fontSize: wp('3.5') }}>{item.requestStatus}</Text>
                    </View>
                </View>
            </View>


        )
    }
    render() {
        const { check3, check2, check1, compliteddata, check4, returndata } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight }}>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 130 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, }}>My order</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                <Image style={styles.homeicon} source={require("../images/store/home.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 6, }}>
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>

                        <View style={{ backgroundColor: "#f2f2f2", justifyContent: 'center', alignItems: 'center', height: hp('6'), borderRadius: 40 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10, }}>

                                <TouchableOpacity style={styles.TouchableOpacitymain} onPress={() => this.setState({ check1: true, check2: false, check3: false, check4: false })}>
                                    {check1 ?
                                        <Image style={styles.buttonimage} source={require('../images/myactive.png')} />
                                        : <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Active</Text>
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.TouchableOpacitymain} onPress={() => this.setState({ check1: false, check2: false, check3: false, check4: true })}>
                                    {check4 ?
                                        <Image style={styles.buttonimage} source={require('../images/return.png')} />
                                        : <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Return</Text>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TouchableOpacitymain} onPress={() => this.setState({ check1: false, check2: true, check3: false, check4: false })}>
                                    {check2 ?
                                        <Image style={styles.buttonimage} source={require('../images/mycompleted.png')} />

                                        : <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Completed</Text>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TouchableOpacitymain} onPress={() => this.setState({ check1: false, check2: false, check3: true, check4: false })}>
                                    {check3 ?
                                        <Image style={styles.buttonimage} source={require('../images/mycancelled.png')} />
                                        : <Text style={{ fontSize: wp('3.5'), fontFamily: 'Poppins-Regular' }}>Cancelled</Text>
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                    {check1 ? <View style={{ flex: 1 }}>
                        <ScrollView bounces={false}>
                            {this.state.activedata != '' ?
                                <FlatList
                                    // style={{ height: wp('37.4') }}
                                    keyExtractor={(item) => item.id}
                                    data={this.state.activedata}
                                    renderItem={({ item, index }) =>
                                        this.active(item, index)
                                    }
                                    bounces={false}
                                />
                                : <Text style={{ textAlign: 'center', marginTop: wp('50') }}>No product found !!</Text>}
                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={this.state.activetransitiondata}
                                renderItem={({ item }) =>
                                    this.activetransition(item)
                                }
                                bounces={false}
                            />
                        </ScrollView>
                    </View> : null}
                    {check2 ? <View style={{ flex: 1 }}>
                        {compliteddata != '' ?
                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={compliteddata}
                                renderItem={({ item }) =>
                                    this.completedTag(item)
                                }
                                bounces={false}
                            />
                            : <Text style={{ textAlign: 'center', marginTop: wp('50') }}>No product found !!</Text>}

                    </View> : null}
                    {check4 ? <View style={{ flex: 1 }}>
                        {returndata != '' ?
                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={returndata}
                                renderItem={({ item }) =>
                                    this.returnData(item)
                                }
                                bounces={false}
                            />
                            : <Text style={{ textAlign: 'center', marginTop: wp('50') }}>No product found !!</Text>}

                    </View> : null}
                    {check3 ? <View style={{ flex: 1 }}>
                        {this.state.cancelleddata != '' ?

                            <FlatList
                                keyExtractor={(item) => item.id}
                                data={this.state.cancelleddata}
                                renderItem={({ item }) =>
                                    this.cancelled(item)
                                }
                                bounces={false}
                            />
                            : <Text style={{ textAlign: 'center', marginTop: wp('50') }}>No product found !!</Text>}

                    </View> : null}

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({


    functionmain: {
        flex: 1,
        margin: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        paddingBottom: 20,
        borderBottomColor: '#bdc3c7'
    },
    functionimage: {
        height: hp('14'),
        width: wp('25'),
        borderRadius: 5
    },
    TouchableOpacitymain: {
        alignItems: 'center',
        height: hp('5'),
        width: wp('24'),
        justifyContent: 'center'
    },
    buttonimage: {
        height: wp('11'),
        width: wp('23'),
        borderRadius: 50
    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'
    },
    deleteContainer: {
        marginBottom: 10,
        width: 70,
        height: "60%",
        backgroundColor: "#ecf0f1",
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30,

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
