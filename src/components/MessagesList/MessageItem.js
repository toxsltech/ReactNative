/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';
import ResponsiveText from '../ResponsiveText';
import { Image } from 'react-native-animatable';
import { BASE_URL } from '../../utils/env';

const MessageItem = ({ data }) => {
  const { message } = data;
  const newData = data.userId;
  const userName = newData.userName;
  const profileImg = newData.profileImg;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require('../../assets/images/placeholder.png')}
              style={styles.placeholderImage}>
              {profileImg ? (
                <Image
                  source={
                    profileImg
                      ? { uri: BASE_URL + profileImg }
                      : require('../../assets/images/model.jpg')
                  }
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../../assets/images/model.jpg')}
                  style={styles.profileImage}
                />
              )}
            </ImageBackground>
          </View>
        </View>
        <View style={styles.nameContainer}>
          <ResponsiveText style={styles.name}>{userName}</ResponsiveText>
          <ResponsiveText style={styles.Comment}>
            {message.length < 34 ? message : `${message.substring(0, 34)}...`}
          </ResponsiveText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MessageItem.propTypes = {
  data: PropTypes.shape({
    userName: PropTypes.string,
    message: PropTypes.string,
    profileImage: PropTypes.string,

  }),
};
MessageItem.defaultProps = {
  data: {
    userName: '',
    message: '',
    profileImage: ''
  },
};

export default MessageItem;

