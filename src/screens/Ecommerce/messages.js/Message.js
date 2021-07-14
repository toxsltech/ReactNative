import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, StatusBar, FlatList } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { androidHeight, iosHeight } from '../../../utils/constants';

export default class Message extends Component {
    constructor() {
        super();
        this.state = {
            messagedata: [
                { text: 'Amazing work keep it up', textmain: 'Mark Thompson' },
                { text: 'Amazing work keep it up', textmain: 'Rony' },
                { text: 'Amazing work keep it up', textmain: 'Rony' },

            ]
        }
    }

    Message = (item) => {
        return (
            <View style={{ flexDirection: "row", borderBottomWidth: 0.8, borderBottomColor: '#bdc3c7', paddingBottom: 10, alignItems: 'center', height: wp('20'), marginHorizontal: 20 }}>
                <Image style={{ height: wp('12'),
                  resizeMode: Platform.OS === 'ios' ? 'contain' : 'center',
                  width: wp('12') }} source={require('./images/msg.png')} />
                <View style={{ marginLeft: 20, flexDirection: 'row' }}>
                    <View style={{ width: 180 }}>

                        <Text >{item.textmain}</Text>

                        <Text style={{ color: '#bdc3c7', fontSize: 12 }}>{item.text}</Text>
                    </View>
                    <View>

                        <View style={{ backgroundColor: '#426b74', height: 20, width: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginLeft: 80 }}>
                            <Text style={{ color: 'white', fontSize: 12, }}>2</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <IonIcon name="calendar-outline" size={12} color='#b2babb' />

                            <Text style={{ color: '#bdc3c7', fontSize: 10, marginHorizontal: 4 }}>27Dec ! 12:00 a.m</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight }}>

                <View style={{ flex: 1, borderBottomWidth: 0.7, borderColor: '#bdc3c7', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', margin: 10, marginTop: hp('8'), }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <IonIcon name="chevron-back-outline" size={25} color='black' />
                        </TouchableOpacity>

                        <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Messages</Text>
                        <TouchableOpacity style={{ width: 140 }} onPress={() => this.props.navigation.goBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <IonIcon name="chevron-back-outline" size={22} color='black' />
                                <Text style={{ fontSize: 18, marginHorizontal: 10 }}>Messages</Text>

                            </View>
                        </TouchableOpacity>
                        <Image style={styles.homeicon} source={require("./images/msgsearch.png")} />

                    </View>
                </View>



                <View style={{ flex: 6 }}>
                    <FlatList
                        style={{ height: '80%' }}
                        keyExtractor={(item) => item.id}
                        data={this.state.messagedata}
                        renderItem={({ item }) =>
                            this.Message(item)
                        }
                        bounces={false}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    homeicon: {
        height: wp('4'),
        width: wp('4'),
        marginLeft: wp('54'),
        marginTop: wp('2')
    },
})
