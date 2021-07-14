/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ScrollView } from 'react-native';
import styles from './styles';
import MessageItem from './MessageItem';

import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import { widthPercentageToDP } from 'react-native-responsive-screen';
export default class MessagesList extends Component {
  renderItem = ({ item }) => <MessageItem data={item} />;

  render() {
    const { messages } = this.props;
    return (

      <View style={styles.wrapListMessages}>
     
        <FlatList data={messages.reverse()} renderItem={this.renderItem} inverted />
        
      </View>

    );
  }
}

MessagesList.propTypes = {
  /* eslint-disable */
  messages: PropTypes.array,
};

MessagesList.defaultProps = {
  messages: [],
};
