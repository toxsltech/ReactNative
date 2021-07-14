import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, TextInput, StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { androidHeight, iosHeight } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/env'
import showNotification from '../../utils/services'

export default class Orderreturn extends Component {
    constructor() {
        super()
        this.state = {
            input: '',
            address: '',

        }
    }
    componentDidMount = () => {
        const { item } = this.props.route.params
        let add = item.map((data) => data.address1).toString('')
        let state = item.map((data) => data.address2).toString('')
        let country = item.map((data) => data.country).toString('')
        const address = add + ',' + state + ',' + country
        this.setState({ address: address })

    }
    RefundRequest = (item) => {
        if (this.verifyCredentials()) {
            this.Refund(item)
        }
    }

    verifyCredentials = () => {
        const { input } = this.state;
        if (input == '') {
            alert('Please enter reason');
            return false
        }
        return true;
    };

    Refund = async (item) => {
        var token = await AsyncStorage.getItem('token');

        fetch(BASE_URL + 'refundRequest/addRefundRequest', {
            method: 'POST',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'orderID': item.map((data) => data.orderId).toString(''),
                'itemName': item.map((data) => data.product.title).toString(''),
                'amount': item.map((data) => data.price).toString(''),
                'addressToReturn': this.state.address,
                'reason': this.state.input,
                'productID': item.map((data) => data.product._id).toString(''),
                'sellerId': item.map((data) => data.sellerId._id).toString('')
            })

        })
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                  
                    showNotification("success", json.message);
                    this.props.navigation.navigate('Myorder')
                } else {
                    showNotification("danger", json.message);
                    this.props.navigation.navigate('Myorder')

                }
            }
            )
            .catch(err => {
                showNotification("danger", err.message);

            })
    }
    Return = (item) => {
        return (
            <View style={{ margin: 25 }}>
                <Text style={styles.maintext}>Order Id</Text>
                <Text style={{ marginBottom: 10 }}>{item.orderId}</Text>
                <View style={{ borderWidth: 0.8, marginBottom: 10, borderColor: '#bdc3c7' }}></View>
                <Text style={styles.maintext}>Item Name</Text>
                <Text style={{ marginBottom: 10 }}>{item.product.title}</Text>
                <View style={{ borderWidth: 0.8, marginBottom: 10, borderColor: '#bdc3c7' }}></View>
                <Text style={styles.maintext}>Amount</Text>
                <Text style={{ marginBottom: 10 }}>{item.price}</Text>
                <View style={{ borderWidth: 0.8, marginBottom: 10, borderColor: '#bdc3c7' }}></View>
                <Text style={styles.maintext}>Address to Returned</Text>
                <Text style={{ marginBottom: 10 }}>{item.address1},{item.address2},{item.country}</Text>
                <View style={{ borderWidth: 0.8, marginBottom: 10, borderColor: '#bdc3c7' }}></View>
                <Text style={styles.maintext}>Reason</Text>
                <TextInput
                    style={{ padding: 0, marginBottom: 10 }}
                    onChangeText={(input) => this.setState({ input })}
                    value={this.state.input}
                    placeholder='Write Reason'
                />
                <View style={{ borderWidth: 0.8, marginBottom: 10, borderColor: '#bdc3c7' }}></View>
            </View>
        )
    }
    render() {
        const { item } = this.props.route.params

        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: wp('5') }}>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 230 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, }}>Order Return Request</Text>

                            </View>
                        </TouchableOpacity>
                        <View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 6, }}>
                    <View style={{}}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={item}
                            renderItem={({ item }) =>
                                this.Return(item)
                            }
                            bounces={false}
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.RefundRequest(item)}>
                            <View style={styles.button}>
                                <Text style={{ fontSize: 15, fontFamily: 'Poppins-SemiBold' }}>Send</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f4d03f',
        width: wp('80'),
        height: wp('15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 20
    },
    maintext: {
        color: '#bdc3c7',
        fontSize: 14,
        marginVertical: 10
    },
})
