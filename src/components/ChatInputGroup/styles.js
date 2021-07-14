

/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 15,
  },
  flex1: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
  },
  wrapIconHeart: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    zIndex: 2,
  },
  iconHeart: {
    width: 45,
    height: 45,
    zIndex: 2,
  },
  wrapIconSend: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconSend: {
    width: 33,
    height: 33,
    height: wp('4'),
    width: wp('4'),
    resizeMode: 'contain',
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
    // position: 'absolute',
    paddingRight: wp('8.5'),

    bottom: wp('1'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SendInput: {
    width: wp('88'),
    backgroundColor: 'white',
    paddingLeft: wp('5'),
    borderWidth: 0,
    borderRadius: wp('13'),
    height: wp('12.5'),
    paddingRight: 2,
    // marginBottom: wp('6'),
  },
  sendButton: {
    // height: wp('10'),
    // width: wp('10'),
    // borderRadius: wp('10'),
    // backgroundColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('10'),
    width: wp('10'),
    // tintColor: 'white',
    resizeMode: 'contain',
  },
  crossIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
  },
});

export default styles;
