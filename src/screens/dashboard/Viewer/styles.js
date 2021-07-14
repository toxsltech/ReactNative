

/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Fonts from '../../../themes/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  blackContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundContainer: {
    flex: 1,
  },
  playerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
  },
  wrapperCenterTitle: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '400',
  },
  btnClose: {
    position: 'absolute',
    top: 55,
    left: 15,
  },
  icoClose: {
    width: 30,
    height: 30,
  }, modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height: '40%',
    width: wp('100'),
  },
  commentsContainer: {
    height: '60%',
    width: wp('100'),  
  },
  videoButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('6'),
    paddingTop: wp('10'),
  },
  endButton: {
    height: wp('11'),
    width: wp('25'),
    borderRadius: wp('8'),
    backgroundColor: '#FF0000',
    elevation: 0,
  },
  endButtonText: {
    fontFamily: Fonts.RobotoBold,
  },
  switchCameraIcon: {
    height: wp('10'),
    width: wp('12'),
    resizeMode: 'contain',
  },
  SwitchCameraIconConatiner: {
    marginBottom: wp('3.5'),
  },
  ViewsContainer: {
    width: wp('11.5'),
  
    paddingVertical: wp('2'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: wp('2'),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: wp('4.5'),
  },
  eyeIcon: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    tintColor: 'white',
    marginBottom: wp('0.5'),
  },
  viewsText: {
    color: 'white',
    fontSize: 3.2,
  },
  shareContainer: {
    width: wp('11.5'),
    height: wp('9.5'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    height: wp('4'),
    width: wp('4'),
    resizeMode: 'contain',
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
   
    bottom: wp('1.5'),
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
    
  },
  sendButton: {
   
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('10'),
    width: wp('10'),
  
    resizeMode: 'contain',
  },
  crossIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
  },
  ViewModalHeader: {
    height: wp('18'),
    
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5'),
    marginBottom: wp('3'),

    justifyContent: 'space-between',
  },
});

export default styles;

