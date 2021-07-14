/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


/* eslint-disable */
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LIVE_STATUS = {
  PREPARE: 0,
  ON_LIVE: 1,
  FINISH: 2,
};

const videoConfig = {
  preset: 1,
  bitrate: 500000,
  profile: 1,
  fps: 15,
  videoFrontMirror: false,
};

const audioConfig = { bitrate: 32000, profile: 1, samplerate: 44100 };
const androidHeight = 30
const iosHeight = 10
const androidH1 = wp('8')
const androidH2 = 50
const androidH3 = 0
const androidH4 = 40
const iosH1 = wp('10')
const iosH2 = 30
const iosH3 = 20
const iosH4 = 18
const iosH5 = 16

export {
  videoConfig, audioConfig, LIVE_STATUS,
  androidHeight, iosHeight, androidH1, iosH1, iosH2,
  iosH3, iosH4, androidH2, androidH3, iosH5, androidH4
};

