import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, Modal, TouchableWithoutFeedback, FlatList, TextInput, Button } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import ResponsiveText from '../../components/ResponsiveText'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SliderBox } from "react-native-image-slider-box";
import { BASE_URL } from '../../utils/env';
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../utils/services'
import { androidHeight, iosHeight } from '../../utils/constants';



export default class cartdetail extends Component {
    constructor() {
        super()
        this.state = {
            heart: false,
            imagedate: ['https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'],
            canclemainmodal: false,
            canclerules: [
                { messages: 'Lack of features in the product' },
                { messages: 'Delivery time is too long' },
                { messages: 'Duplicate order' },
                { messages: 'Sourcing payment issue' },
                { messages: 'Change of mind' },
                { messages: 'Decided for alternative product' },
                { messages: 'Fees-shipping costs' },
            ],
            cancleothermodal: false,
            canclemainmodalrule: false
        }
    }

    canclebooking = async (id) => {

        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'order/edit/' + id, {
            method: 'PUT',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'status': 7,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json ? json.data : ''
                this.setState({ cancleothermodal: false, canclemainmodalrule: false })
                this.props.navigation.navigate('Myorder')
            })
            .catch(err => {
                showNotification("danger", err.message);
            })
    }

    render() {

        const { item } = this.props.route.params
        const data = item.product.images.map((item) => BASE_URL + item)

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.view3}>
                    <View style={styles.view4}>
                        <View style={styles.view5}>

                            <TouchableOpacity style={{ width: 140 }} onPress={() => this.props.navigation.goBack()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                    <IonIcon name="chevron-back-outline" size={22} color='black' />
                                    <Text style={{ fontSize: 18 }}>Order Review</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Newhome')}>
                                    <Image style={styles.img} source={require("./images/store/home.png")} />
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>
                    <ScrollView bounces={false}>
                        <View style={{ alignItems: 'center' }}>

                            <View style={styles.image2} onLayout={() => this.onLayout}>
                                <SliderBox
                                    images={data}
                                    sliderBoxHeight={hp('40')}
                                    parentWidth={this.state.width}
                                    circleLoop
                                    resizeMode={'contain'}
                                    dotColor="#f1c40f"
                                    inactiveDotColor="#90A4AE"
                                    resizeMethod={'resize'}
                                    ImageComponentStyle={{ width: '100%', backgroundColor: '#fff' }}
                                    imageLoadingColor="#f1c40f"
                                    dotStyle={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: 10,
                                        marginHorizontal: 2,
                                        paddingHorizontal: 10,
                                    }}
                                    // onCurrentImagePressed={index =>
                                    //     this.props.navigation.navigate('Storeprofile', { productid: item._id })
                                    // }
                                    bounces={false}
                                />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: wp('3'), }}>
                            <View style={styles.view5}>
                                <View>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Storeprofile', { productid: item.product._id, images: data })}>
                                            <Text style={styles.view8}>{item.product.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>

                                    <Text style={styles.text1}>Total Price : ${item.price * item.quantity}</Text>
                                    {item.product.discountPercent == 'N/A' || item.product.discountPercent == undefined ? null :
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                                            <Text style={styles.price1}>Discount: {item.product.discountPercent}%</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View >
                                <Text style={styles.text2}>
                                    {item.product.description}
                                </Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.text3}>Product Specification</Text>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Colors </Text>
                                    <Text>{item.color}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.text}>Sizes </Text>
                                    <Text>{item.size}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Sleeve style </Text>
                                    <Text>{item.sleeve}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Quantity </Text>
                                    <Text>{item.quantity}</Text>
                                </View>
                                {item.quantity == 1 ? null :
                                    <View style={styles.row}>
                                        <Text style={styles.text}>Price of product </Text>
                                        <Text>${item.price}</Text>
                                    </View>}
                            </View>

                            <View >

                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.text3}>Delivery address</Text>
                                <Text style={styles.text}>{item.name} </Text>
                                <Text style={styles.text}>{item.address1},{item.address2},{item.country}</Text>
                                <Text style={styles.text}>{item.pincode}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#bdc3c7' }}>Contact No: </Text>
                                    <Text style={{ color: '#bdc3c7' }}>{item.mobileNumber}</Text>
                                </View>
                                <View style={{ borderWidth: 1, borderColor: '#bdc3c7', borderRadius: wp('2'), padding: wp('2'), marginTop: wp('2') }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium' }}>Delivery by {moment(item.delivery_date).format('YYYY-MM-DD')} </Text>
                                        <Text style={{ fontFamily: 'Poppins-Medium' }}>${item.price * item.quantity}</Text>
                                    </View>
                                    <Text style={styles.text}>Standard Delivery  </Text>

                                </View>
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.text3}>Payment Mode</Text>
                                <Text style={styles.text}>{item.paymentMethod == 'Stripe' ? 'Online Payment' : 'Cash on delivery'} </Text>
                            </View>

                            <View style={{ borderWidth: 1, borderColor: '#bdc3c7', borderRadius: wp('2'), padding: wp('2'), marginTop: wp('2'), marginBottom: wp('4') }}>
                                <View>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                        onPress={() => this.setState({ canclemainmodal: true })}>
                                        <Text style={{ fontFamily: 'Poppins-Medium' }}>Request For Cancellation </Text>
                                        <Image style={styles.image1} source={require('./images/storprofile/arrow.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.canclemainmodal}
                        transparent={true}>

                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <TouchableWithoutFeedback
                                delayPressIn={0}
                                onPressIn={() => this.setState({ canclemainmodal: false })}>
                                <View
                                    style={{
                                        height: '50%',
                                        width: '100%',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </TouchableWithoutFeedback>
                            <View style={{
                                backgroundColor: 'white', maxHeight: '50%', borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}>
                                <View style={{ height: wp('17'), borderBottomWidth: 1, justifyContent: 'center', marginBottom: wp('4') }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center', fontSize: wp('4.3') }}>Why do you want to cancel?</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center', fontSize: wp('2.5'), color: '#dc7633' }}>Please provide the reason for cancellation</Text>
                                </View>
                                <View style={{ maxHeight: '65%' }}>
                                    <FlatList
                                        bounces={false}
                                        data={this.state.canclerules}
                                        renderItem={({ item }) => (
                                            <View style={{ marginHorizontal: wp('4') }}>
                                                <TouchableOpacity style={{ padding: wp('2') }} onPress={() => {
                                                    this.setState({ cancleother: item.messages, canclemainmodalrule: true, canclemainmodal: false })
                                                }}>
                                                    <Text style={{ fontSize: wp("4"), fontFamily: 'Poppins-Medium', }}>{item.messages}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                                <View style={{ marginHorizontal: wp('4'), marginBottom: wp('3'), backgroundColor: '#ccd1d1', borderRadius: 20 }}>
                                    <TouchableOpacity style={{ padding: wp('2'), }} onPress={() => this.setState({ cancleothermodal: true, canclemainmodal: false })}>

                                        <Text style={{ fontSize: wp("4"), fontFamily: 'RubikRegular', }}>Others</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.cancleothermodal}
                        transparent={true}>

                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <TouchableWithoutFeedback
                                delayPressIn={0}
                                onPressIn={() => this.setState({ cancleothermodal: false })}>
                                <View
                                    style={{
                                        height: '50%',
                                        width: '100%',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </TouchableWithoutFeedback>
                            <View style={{
                                backgroundColor: 'white', maxHeight: '50%', borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}>
                                <View style={{ height: wp('17'), borderBottomWidth: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center', fontSize: wp('4.3') }}>Sure you want to cancel?</Text>
                                </View>

                                <View style={{ margin: wp('4') }}>
                                    <Text style={{ fontSize: wp("3"), fontFamily: 'RubikRegular', color: '#979a9a' }}>Please provide feedback to improve our services</Text>
                                    <View style={{
                                        height: wp('21'), width: "100%",
                                        borderColor: '#979a9a', borderWidth: 2,
                                        marginBottom: 20,
                                        borderRadius: 20, padding: hp('1'), paddingLeft: 20
                                    }}>

                                        <TextInput
                                            multiline={true}
                                            onChangeText={(text) => this.setState({ cancleother: text })}
                                            keyboardType={'default'}
                                            returnKeyType={'done'}
                                        />
                                    </View>
                                    <Button title="cancel booking" onPress={() => {
                                        if (this.state.cancleother) {
                                            this.canclebooking(item._id)
                                        } else {

                                        }
                                    }} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.canclemainmodalrule}
                        transparent={true}>

                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <TouchableWithoutFeedback
                                delayPressIn={0}
                                onPressIn={() => this.setState({ canclemainmodalrule: false })}>
                                <View
                                    style={{
                                        height: '50%',
                                        width: '100%',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </TouchableWithoutFeedback>
                            <View style={{
                                backgroundColor: 'white', maxHeight: '50%', borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}>
                                <View style={{ height: wp('17'), borderBottomWidth: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center', fontSize: wp('4.3') }}>Sure you want to cancel?</Text>
                                    {/* <Text style={{ fontFamily: 'Poppins-Medium', textAlign: 'center', fontSize: wp('2.5'), color: '#dc7633' }}>You might be charge a small cancellation fee for the booking</Text> */}
                                </View>

                                <View style={{ margin: wp('4') }}>
                                    <View style={{ backgroundColor: '#ccd1d1', borderRadius: 20, padding: wp('2'), margin: wp('4') }}>
                                        <Text style={{ fontSize: wp("4"), fontFamily: 'RubikRegular', }}>{this.state.cancleother}</Text>
                                    </View>
                                    <Button title="cancel booking"
                                        onPress={() => {
                                            this.canclebooking(item._id)
                                        }} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    img: {
        height: 25,
        width: 25,
        marginHorizontal: 5,
        tintColor: '#025960'
    },
    image2: {
        width: wp('89'),
        height: wp('80'),
        overflow: "hidden",
        alignItems: 'center',
        justifyContent: 'center',

    },
    view7: {
        fontSize: 21,
        fontWeight: 'bold',
        maxWidth: wp('80')
    },
    view8: {
        color: '#025960',
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        height: wp('14'),
        width: wp('35'),
        resizeMode: 'center'
    },
    text1: {
        color: '#025960',
        textAlign: 'right',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },
    text2: {
        color: '#bdc3c7',
        fontSize: wp('3.5')
    },
    text3: {
        color: '#025960',
        fontSize: 15,
        marginVertical: 5
    },
    text: {
        width: wp('60'),
        color: '#bdc3c7'
    },
    price: {
        color: '#cacfd2',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    row: {
        flexDirection: 'row'
    },
    view10: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    count: {
        height: wp('8'),
        width: wp('8')
    },
    view3: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight


    },
    image1: {
        height: wp('5'),
        width: wp('5'),
        alignItems: 'flex-end'
    },
    price1: {
        color: '#cacfd2',
        // alignItems: 'flex-end',

        textAlign: 'right',
        fontSize: wp('3.5'),
        fontFamily: 'Poppins-SemiBold'

    },
})
