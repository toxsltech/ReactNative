import React, { Component } from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';

import DeepLinking from 'react-native-deep-linking';

export default class Deeplinking extends Component {
    state = {
        response: {},
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Button
                        onPress={() => Linking.openURL('example://test')}
                        title="Open example://test"
                    />
                    <Button
                        onPress={() => Linking.openURL('example://test/23')}
                        title="Open example://test/23"
                    />
                    <Button
                        onPress={() => Linking.openURL('example://test/100/details')}
                        title="Open example://test/100/details"
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.state.response.scheme ? `Url scheme: ${this.state.response.scheme}` : ''}</Text>
                    <Text style={styles.text}>{this.state.response.path ? `Url path: ${this.state.response.path}` : ''}</Text>
                    <Text style={styles.text}>{this.state.response.id ? `Url id: ${this.state.response.id}` : ''}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        margin: 10,
    },
});