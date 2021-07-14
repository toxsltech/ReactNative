/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { Image, } from 'react-native';

const HeartShape = () => {
  return (
    <Image
      source={require('../../assets/ico_heart.png')}
      style={{
        width: 40,
        height: 40,
      }}
    />
  
  );
};

export default HeartShape;
