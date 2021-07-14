/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        disabled={this.props.loading || this.props.disabled}
        onPress={this.props.onPress}
        style={[styles.ButtonStyle, this.props.containerStyle]}>
        {this.props.leftIcon && (
          <View style={[styles.leftStyle, this.props.leftIconStyle]}>
            {this.props.leftIcon}
          </View>
        )}
        {(this.props.loading && (
          <ActivityIndicator size={'small'} color={'#fff'} />
        )) ||
          (this.props.text && (
            <ResponsiveText
              style={{ ...styles.textStyle, ...this.props.textStyle }}>
              {this.props.text}
            </ResponsiveText>
          ))}
        {this.props.right && (
          <View style={[styles.leftStyle, this.props.rightIconStyle]}>
            {this.props.right}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = {
  ButtonStyle: {
    height: wp('13%'),
    elevation: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: 'white',

  },
};
