import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swipeable from 'react-native-swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/env'
import moment from "moment";
import showNotification from '../../utils/services'
import { androidHeight, iosHeight } from '../../utils/constants';

export default class Notificationsscreen extends Component {
    constructor() {
        super();
        this.state = {
            notificationdata: []
        }
    }
    componentDidMount = () => {
        this.notification()
    }
    notification = async () => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'notification/orderNotification/', {
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
                this.setState({ notificationdata: data })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }
    Delete = async (id) => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'notification/deleteOrderNotification/' + id, {
            method: 'DELETE',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {

                this.notification()

            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            });
    }

    renderRightButtons(id) {
        return [
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.Delete(id)}>
                <View style={styles.deleteContainer}>
                    <Image style={{ height: wp('10'), resizeMode: 'contain', width: wp('10'), tintColor: '#aee51c' }} source={require('../../assets/icons/delete.png')} />
                </View>
            </TouchableOpacity>
            ,
        ];
    }
    listdata = (item) => {
        return (
            <Swipeable
                rightButtons={this.renderRightButtons(item._id)}
                rightButtonWidth={75}>
                <View style={{ flexDirection: "row", borderBottomWidth: 0.8, borderBottomColor: '#bdc3c7', padding: 20 }}>
                    <Image style={{ height: wp('15'), resizeMode: 'center', width: wp('15') }} source={require('./images/bell.png')} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Trackscreen')}>

                        <View style={{ marginLeft: 20 }}>
                            <Text style={{ color: '#909497', fontSize: wp('3.6') }}>{item.message}</Text>
                            <Text style={{ color: '#909497', fontSize: wp('3.5') }}>#{item.orderId}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <IonIcon name="calendar-outline" size={12} color='#b2babb' />
                                <Text style={{ color: '#bdc3c7', fontSize: wp('2.7'), paddingLeft: 6 }}>{moment(item.createdAt).calendar()}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Swipeable>

        )
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1, paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight }}>
                   <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('23') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 160 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, }}>Notifications</Text>

                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                <Image style={styles.homeicon} source={require("./images/store/home.png")} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={{ flex: 6 }}>
                    {this.state.notificationdata ?
                        <FlatList
                            style={{ height: '80%' }}
                            keyExtractor={(item) => item.id}
                            data={this.state.notificationdata}
                            renderItem={({ item }) =>
                                this.listdata(item)
                            }
                        /> : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 160 }}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No Notification Found !!</Text>
                        </View>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    maintext: {

        marginLeft: wp('8'),
        fontSize: 20,


    },
    homeicon: {
        height: wp('7'),
        width: wp('7'),
        tintColor: '#025960'
    },

    deleteButton: {
        width: 90,
        height: "65%",
        backgroundColor: "#f0f1ec",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 20
    },
    deleteText: {
        color: '#fff'
    }
})





