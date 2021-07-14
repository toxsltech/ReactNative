
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  Image,
  Keyboard,
  Platform, KeyboardAvoidingView
} from 'react-native';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import styles from './styles';
import InputField from '../../components/InputField';
export default class ChatInputGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onPressSend = () => {
    const { message } = this.state;
    const { onPressSend } = this.props;
    onPressSend(message);
    // Keyboard.dismiss();
    this.setState({ message: '' });
  };

  onPressHeart = () => {
    const { onPressHeart } = this.props;
    onPressHeart();
  };

  onEndEditing = () => {
    // Keyboard.dismiss();
    const { onEndEditing } = this.props;
    onEndEditing();
  };

  onFocus = () => {
    const { onFocus } = this.props;
    onFocus();
  };

  onChangeMessageText = (text) => [this.setState({ message: text })];

  renderContent() {
    const { message } = this.state;

    return (
      <View style={styles.sendInputContainer}>
        <InputField
          placeholder={'Say something here ...'}
          value={message}
          placeholderTextColor={'#9E9E9E'}
          containerStyle={styles.SendInput}
          onChangeText={this.onChangeMessageText}
          autoCorrect={false}
          onEndEditing={this.onEndEditing}
          onFocus={this.onFocus}
          autoCapitalize="none"
          right={
            <View style={styles.sendButton}>
              <Image
                source={require('../../assets/icons/ic_send.png')}
                style={styles.sendIcon}
              />
            </View>
          }
          rightPress={this.onPressSend}
          rightStyle={{ padding: 0, marginRight: -5 }}
        />
      </View>
    );
  }

  render() {
    if (Platform.OS === 'android') {
      return <SafeAreaView style={styles.wrapper}>{this.renderContent()}</SafeAreaView>;
    }
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.flex1}>
          <KeyboardAccessory backgroundColor="transparent">
            {this.renderContent()}
          </KeyboardAccessory>
        </View>
      </SafeAreaView>
    );
  }
}

ChatInputGroup.propTypes = {
  onPressHeart: PropTypes.func,
  onPressSend: PropTypes.func,
  onFocus: PropTypes.func,
  onEndEditing: PropTypes.func,
};

ChatInputGroup.defaultProps = {
  onPressHeart: () => null,
  onPressSend: () => null,
  onFocus: () => null,
  onEndEditing: () => null,
};
