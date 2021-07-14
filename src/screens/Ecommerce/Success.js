import React, { Component } from 'react'
import { Text, StyleSheet, View, ImageBackground, StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Success extends Component {
    render() {
        return (
            <View>
                <StatusBar
                    translucent backgroundColor="transparent"
                    barStyle='dark-content'
                    hidden={true}
                />
                <ImageBackground style={{ height: hp('100'), width: wp('100') }} source={require('./images/success/success.png')}>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
