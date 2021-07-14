import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/env'
import showNotification from '../../utils/services'
import ChatCard from '../../ecommerceComponents/ChatCard'
import { androidHeight, iosHeight } from '../../utils/constants';

export default class Message extends Component {
    constructor() {
        super();
        this.state = {
            messagedata: [
            ],
            DataReceiver: [],
            DataSender: [],
            SenderId: '',
            chatId: {},
            time: {},
            typing: '',
            unseenCount: '',
        }
    }
    componentDidMount = () => {
        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.getMessagesList()

        });
    }

    getMessagesList = async () => {
        var token = await AsyncStorage.getItem('token');
        fetch(BASE_URL + 'chat/chatlist/', {
            method: 'GET',
            headers: {
                'x-token': `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                const data = json.message
                const Data = data.map((item) => item.lastmsgId)
                const unseenCount = data.map((item) => item.unseenCount)
                const time1 = data.map((item) => item.updatedAt)
                const chatId1 = data.map((item) => item._id)
                const DataReceiver = Data.map((item) => item.receiverId)
                let chatId = Object.assign({}, chatId1);
                this.setState({ messagedata: Data, DataReceiver: DataReceiver, chatId: chatId, time: time1, unseenCount: unseenCount })
            }
            )
            .catch(err => {
                showNotification("danger", err.message);
            })
    }


    render() {
        const { DataReceiver, chatId, time, } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight }}>
                   <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                />
                <View style={{ borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', paddingRight: 20, height: wp('20') }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <TouchableOpacity style={{ width: 150 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Messages</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ flex: 6 }}>

                    {DataReceiver != '' ?
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: wp('5.5'),
                                paddingTop: wp('4'),
                            }}

                            data={DataReceiver}
                            renderItem={({ item, index }) => {
                                return (
                                    <ChatCard
                                        key={index}
                                        profile_image={item.profileImg}
                                        user_name={item.fullNameOfSeller}
                                        time={time[index]}
                                        unseen_messsages={this.state.unseenCount[index]}
                                        last_message={item.message}
                                        chatId={chatId[index]}
                                        sellerId={item._id}
                                        type={item.messageType}
                                        navigation={this.props.navigation}
                                    />
                                );
                            }}
                            keyExtractor={(item, index) => `${index}`}
                        /> : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 160 }}>
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No Message Found !!</Text>
                        </View>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeicon: {
        height: wp('5'),
        width: wp('5'),
        tintColor: '#025960',
        marginTop: wp('2')
    },
})
