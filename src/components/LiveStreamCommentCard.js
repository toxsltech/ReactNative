/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';

class LiveStreamCommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { avatar, name, Comment } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../assets/images/placeholder.png')}
                style={styles.placeholderImage}>
                <Image source={{ uri: avatar }} style={styles.profileImage} />
              </ImageBackground>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{name}</ResponsiveText>
            <ResponsiveText style={styles.Comment}>
              {Comment.length < 34 ? Comment : `${Comment.substring(0, 34)}...`}
            </ResponsiveText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default LiveStreamCommentCard;
const styles = {
  cardContainer: {
    height: wp('15'),
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: wp('10'),
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('10'),
    width: wp('10'),
  },
  profileImage: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
  },
  unseenBadge: {
    borderRadius: wp('10'),
    backgroundColor: '#0089FF',
    position: 'absolute',
    right: 0,
    fontSize: 3,
    paddingVertical: wp('0.7'),
    paddingHorizontal: wp('1.5'),
    color: 'white',
    fontFamily: Fonts.OpenSansRegular,
    elevation: 1,
  },
  nameContainer: {
    marginLeft: wp('3'),
    width: wp('55'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3,
    maxHeight: wp('4.5'),
    color: '#DADADB',
  },
  Comment: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4,
    maxHeight: wp('6'),
    color: 'white',
  },
  replyContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 3,
    marginTop: wp('1'),
    color: '#3A3A3A',
    opacity: 0.5,
  },
  replyInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyText: {
    fontSize: 3.1,
    fontFamily: Fonts.SourceSansProRegular,
    color: '#0089FF',
  },
  commentIcon: {
    height: wp('3.2'),
    width: wp('3.2'),
    resizeMode: 'contain',
    tintColor: '#0089FF',
    marginLeft: wp('2.5'),
  },
};
