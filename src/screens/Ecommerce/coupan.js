import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class coupan extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                { coupancode: 'TRYNEW', off: '40' },
                { coupancode: 'TRYNEW111', off: '40' },
                { coupancode: 'TRYNEW222', off: '40' },
            ]
        }
    }
    coupanfun = (item, index) => {
        return (
            <View style={{ marginTop: wp('8') }}>
                <View style={styles.coupanview1}>
                    <View>
                        <View style={styles.coupancodeview}>
                            <View style={{ backgroundColor: 'white', alignItems: 'flex-end', position: 'absolute', top: '-30%' }}>
                                <Image style={{ height: wp('4.5'), width: wp('4.5') }} source={require('./images/down.png')} />
                            </View >
                            <Text style={{
                            }}>{item.coupancode}</Text>
                        </View>
                        <Text style={styles.coupanoff}>Get {item.off}% off</Text>
                    </View>
                    <TouchableOpacity style={{ width: '25%', alignItems: 'flex-end' }} onPress={() => console.log(`item.coupancode`, item.coupancode)}>

                        <Text style={styles.coupaninputtext}> Apply</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.coupanview2}>
                    <Text style={styles.coupanview2text}> use code {item.coupancode} & get {item.off}% off</Text>
                </View>
            </View>
        )

    }
    render() {
        const { data } = this.state
        return (
            <View style={{ flex: 1, }}>
                <View style={styles.view1}>
                    <Text style={styles.view1text1}>Apply coupan</Text>
                    <View style={styles.inputview}>

                        <TextInput
                            placeholder='Enter coupan code'
                            style={styles.input}
                        />
                        <TouchableOpacity style={{ width: '25%', alignItems: 'flex-end' }}>

                            <Text style={styles.inputtext}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.view1text2}>Available coupan</Text>

                </View>
                <View style={styles.view2}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }) => this.coupanfun(item, index)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 1.3,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        paddingHorizontal: wp('6'),
    },
    view1text1: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: wp('5'),
        marginVertical: wp('2')
    },
    inputview: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('2'),
        marginVertical: wp('2'),
        borderColor: '#858585',
        backgroundColor: 'white'
    },
    input: {
        width: '75%'
    },
    inputtext: {
        color: '#ffeaa7',
        fontFamily: 'Poppins-Regular'
    },
    view1text2: {
        fontFamily: 'Poppins-Regular',
        color: '#4d4d4d'
    },
    view2: {
        flex: 3,
        backgroundColor: '#ffffff'
    },
    coupanview1: {
        flexDirection: 'row',
        paddingHorizontal: wp('6'),
        justifyContent: 'space-between'
    },
    coupancodeview: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('4'),
        paddingVertical: wp('1'),
        paddingTop: wp('2.5')

    },

    coupanoff: {
        marginVertical: wp('2'),
        fontFamily: 'Poppins-SemiBold'
    },
    coupaninputtext: {
        fontFamily: 'Poppins-Bold',
        color: '#ffc50e',
        fontSize: wp('4')
    },
    coupanview2: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f2f2f2',
        paddingVertical: wp('2')
    },
    coupanview2text: {
        color: '#999999',
        paddingHorizontal: wp('5')
    }
})
