/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../ResponsiveText';
import Fonts from '../../themes/Fonts';


class HeartShape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: []
    }
  }

  render() {
    const { message } = this.props;
    return (
      <View style={styles.nameContainer}>
        <ResponsiveText style={styles.Comment}>
          {message}
        </ResponsiveText>
      </View>
    );
  };
}
export default HeartShape;
const styles = StyleSheet.create({
  nameContainer: {
    marginLeft: wp('3'),
    width: wp('55'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  Comment: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4,
    maxHeight: wp('6'),
    color: 'white',
  },
})