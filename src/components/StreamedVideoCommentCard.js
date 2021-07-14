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


class StreamedVideoCommentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { avatar, name, Comment, time } = this.props;

    return (
      <View activeOpacity={0.8} style={styles.cardContainer}>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ResponsiveText style={styles.name}>{name}</ResponsiveText>
              <ResponsiveText style={styles.time}>{time}</ResponsiveText>
            </View>
            <ResponsiveText style={styles.Comment}>{Comment}</ResponsiveText>
          </View>
          <View style={styles.replyContainer}>
            <TouchableOpacity style={styles.replyInnerContainer}>
              <Image
                source={require('../assets/icons/commentFill.png')}
                style={styles.commentIcon}
              />
              <ResponsiveText style={styles.replyText}>Reply</ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default StreamedVideoCommentCard;
const styles = {
  cardContainer: {
    borderBottomWidth: wp('0.3'),
    borderColor: '#D8CBCB',
    justifyContent: 'center',
    paddingVertical: wp('2'),
  },
  innerContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('13'),
    width: wp('13'),
    borderRadius: wp('13'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('13'),
    width: wp('13'),
  },
  profileImage: {
    height: wp('13'),
    width: wp('13'),
    borderRadius: wp('13'),
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
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
    maxHeight: wp('4.5'),
    marginBottom: wp('1.5'),
  },
  Comment: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.5,
    color: '#4F4F4F',
  },
  replyContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    fontSize: 2.3,
    color: '#C5C5C5',
    fontFamily: Fonts.RobotoBold,
    marginLeft: wp('3'),
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
    marginRight: wp('2'),
  },
};
