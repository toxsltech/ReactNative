
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../utils/env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../utils/services'
import moment from 'moment';
import { ScrollView } from 'react-native';
import { androidHeight, iosHeight } from '../../utils/constants';


export default class Trackscreen extends Component {
    constructor() {
        super()
        this.state = {
            detailsdata: [],
            data: [],
            track: [],
            length: '',
            status: 0,
            location: '',
            time: ''
        }
    }
    componentDidMount = () => {
        this.getTrack()
    }

    getTrack = async () => {
        const { item } = this.props.route.params
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'tracking/getUserTracking' + '?id=' + item.orderId + '&booked_by=' + item.booked_by + '&product=' + item.product._id, {
            method: 'GET',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json ? json.data : ''
                this.setState({ track: data })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }


    render() {
        const { item } = this.props.route.params
        return (
            <View style={{ flex: 1, backgroundColor: 'white',  paddingVertical: Platform.OS === 'ios' ?iosHeight: androidHeight}}>
                   <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 150 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18 }}>Track Order</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 6, }}>
                    <Text style={{ textAlign: "center", marginVertical: 20, fontSize: wp('4') }}>Tracking Status</Text>

                    <ScrollView>
                        {this.state.track != null ?
                            <View style={{ flex: 1 }}>

                                <View style={styles.verticalLine}></View>
                                <View style={styles.verticalWrap}>
                                    <View style={styles.itemWrap}>
                                        <View style={[
                                            styles.firstPoint,
                                            this.state.track?.status ? styles.currentMarker : null,
                                        ]}></View>
                                        <View style={{ marginLeft: 8, flex: 1 }}>
                                            <Text style={{ fontSize: 14 }}>{'Order Confirmed'}</Text>
                                        </View>
                                    </View>
                                    <View style={this.state.track?.status ? styles.location1 : styles.location}>
                                        <View style={styles.pointWrap}>
                                            <Text
                                                style={{ width: 280, height: 20, }}>
                                                Location : {this.state.track?.location}
                                            </Text>
                                        </View>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text style={{}}>
                                                Time : {moment(this.state.track?.createdAt).calendar()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.verticalWrap}>
                                    <View style={styles.itemWrap}>
                                        <View style={[
                                            styles.firstPoint,
                                            this.state.track?.status ? styles.currentMarker : null,
                                        ]}></View>
                                        <View style={{ marginLeft: 5, flex: 1 }}>
                                            <Text style={{ fontSize: 14 }}>{'Packed'}</Text>
                                        </View>
                                    </View>
                                    {this.state.track ?
                                        <View style={this.state.track?.status ? styles.location1 : styles.location}>
                                            <View style={styles.pointWrap}>
                                                <Text
                                                    style={{ width: 280, height: 20, }}>
                                                    Location : {this.state.track?.location}
                                                </Text>
                                            </View>
                                            <View style={{ paddingLeft: 10 }}>
                                                <Text style={{}}>
                                                    Time : {moment(this.state.track?.createdAt).calendar()}
                                                </Text>
                                            </View>
                                        </View>
                                        : <View style={this.state.track?.status ? styles.location1 : styles.location}>

                                        </View>}
                                </View>

                                <View style={styles.verticalWrap}>
                                    <View style={styles.itemWrap}>
                                        <View style={[
                                            styles.firstPoint,
                                            this.state.track?.status ? styles.currentMarker : null,
                                        ]}></View>
                                        <View style={{ marginLeft: 5, flex: 1 }}>
                                            <Text style={{ fontSize: 14 }}>{'In-Progress'}</Text>
                                        </View>
                                    </View>
                                    {this.state.track ?
                                        <View style={this.state.track?.status ? styles.location1 : styles.location}>
                                            <View style={styles.pointWrap}>
                                                <Text
                                                    style={{ width: 280, height: 20, }}>
                                                    Location : {this.state.track?.location}
                                                </Text>
                                            </View>
                                            <View style={{ paddingLeft: 10 }}>
                                                <Text style={{}}>
                                                    Time : {moment(this.state.track?.createdAt).calendar()}
                                                </Text>
                                            </View>
                                        </View>
                                        : <View style={this.state.track?.status ? styles.location1 : styles.location}>

                                        </View>}
                                </View>

                                <View style={styles.verticalWrap}>
                                    <View style={styles.itemWrap}>
                                        <View style={[
                                            styles.firstPoint,
                                            this.state.track?.status ? styles.currentMarker : null,
                                        ]}></View>
                                        <View style={{ marginLeft: 5, flex: 1 }}>
                                            <Text style={{ fontSize: 14 }}>{'Delivered'}</Text>
                                        </View>
                                    </View>
                                    {this.state.track ?
                                        <View style={this.state.track?.status ? styles.location1 : styles.location}>
                                            <View style={styles.pointWrap}>
                                                <Text
                                                    style={{ width: 280, height: 20, }}>
                                                    Location : {item.address1.charAt(0).toUpperCase() + item.address1.toLowerCase().slice(1)}, {item.address2.charAt(0).toUpperCase() + item.address2.toLowerCase().slice(1)}
                                                </Text>
                                            </View>
                                            <View style={{ paddingLeft: 10 }}>
                                                <Text style={{}}>
                                                    Time : {moment(this.state.track?.createdAt).calendar()}
                                                </Text>
                                            </View>
                                        </View>
                                        : <View style={this.state.track?.status ? styles.location1 : styles.location}>

                                        </View>}
                                </View>
                                <View style={styles.verticalWrp}>
                                    <View style={{
                                        width: 120,
                                        marginLeft: 20,
                                    }}>
                                        <View style={[
                                            styles.firstPoint,
                                            this.state.track?.status ? styles.currentMarker : null,
                                        ]}></View>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 160 }}>
                                <Text style={{ textAlign: 'center', fontSize: 16 }}>Pending...</Text>
                            </View>
                        }
                    </ScrollView>
                   
                </View>
                <View style={{ backgroundColor: '#eaeded', marginBottom: wp('0'), paddingBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('cartdetail', { item: item })} >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View>
                                <Text style={{ fontSize: wp('6'), marginVertical: 8 }}>Order Details</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: wp('12'), width: wp('12') }}
                                        source={{ uri: BASE_URL + item.product.images[0] }} />
                                    <View style={{ marginLeft: 20, width: wp('47') }}>
                                        <Text style={{ fontSize: wp('3.5') }}>{item.product.title}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: '#bdc3c7', fontSize: wp('3') }}>Quantity : {item.quantity}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{
                                                resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
                                                height: hp('3'), width: wp('3'), tintColor: '#bdc3c7'
                                            }} source={require("./images/store/home.png")} />
                                            <Text style={{ color: '#bdc3c7', fontSize: wp('3'), marginLeft: wp('1'), width: wp('40') }}>{item.address1}, {item.address2}, {item.country}</Text>
                                        </View>
                                        <Text style={{ color: '#bdc3c7', fontSize: wp('3'), marginLeft: wp('4') }}>{item.pincode}</Text>
                                    </View>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#025960', textAlign: 'right', fontSize: wp('3.5') }}>${item.product.afterDiscount * item.quantity}</Text>
                                        <Text style={{ fontSize: 11, textAlign: 'right', fontSize: wp('3') }}>Order Id:{item.orderId}</Text>
                                        <Text style={{ fontSize: 12, textAlign: 'right', fontSize: wp('3') }}>call:{item.mobileNumber}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ flex: 1 }}></View> */}
            </View >
        )
    }
}

const styles = StyleSheet.create({
    tracktext: {
        fontSize: wp('3.7')
    },
    verticalLine: {
        backgroundColor: 'green',
        width: 2,
        height: '95%',
        position: 'absolute',
        marginLeft: 35,
        marginTop: 20,
    },
    verticalWrap: {
        justifyContent: 'space-between',
        // height: '100%',
    },
    itemWrap: {
        width: 120,
        height: 40,
        marginLeft: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pointWrap: {
        padding: 10
    },
    firstPoint: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 15,
        width: 15,
        marginLeft: 8,
        borderWidth: 2,
        borderColor: 'green'
    },
    markerText: { color: 'white' },
    currentMarker: {
        backgroundColor: 'green',
        borderRadius: 20,
        height: 15,
        width: 15,
        marginLeft: 8,
        borderWidth: 2,
        borderColor: 'green'
    },
    location: { width: 300, backgroundColor: '#0000001a', marginLeft: 80, height: 70, borderRadius: 10 },
    location1: {
        width: wp('70'),
        backgroundColor: '#eedeae78',
        marginLeft: 80,
        height: 70,
        borderRadius: 10
    }
})








