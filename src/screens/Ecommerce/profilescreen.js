import React, { Component } from 'react'
import { Text, StyleSheet, View ,Platform} from 'react-native'

export default class profilescreen extends Component {
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
                <Text>android: {Platform.Version} </Text>
                <Text> {Platform.OS} </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
