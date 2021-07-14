/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class ResponsiveText extends React.Component {
  render() {
    const { style, children } = this.props;
    let fontSize = wp('4%');
    let lineHeight = wp('4.5%');
    if (style && style.fontSize) {
      fontSize = wp(style.fontSize);
    }
    if (style && style.fontSize) {
      lineHeight = wp(style.fontSize) + wp('0.5%');
    }
    return (
      <Text
        style={{
          ...styles.text,
          ...this.props.style,
          ...{ fontSize },
        }}>
        {children}
      </Text>
    );
  }
}

const styles = {
  text: {
    color: '#000000',
  },
};
