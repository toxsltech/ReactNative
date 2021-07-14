/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import { Image } from 'react-native-animatable';
import ResponsiveText from '../ResponsiveText';
import Fonts from '../../themes/Fonts';
import SubReplyCard from '../SubReplyCard';
import { BASE_URL } from '../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../utils/services'

class CommentsReplyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSubReply: false,
      id: '',
      like: false,
      USERID: ''
    };
  }
  componentDidMount = () => {
    const Id = this.props.item._id
    this.setState({ id: Id })
    this.getuserid()
  }

  getuserid = async () => {
    try {
      const USERID = await AsyncStorage.getItem('USERID')
      this.setState({ USERID: USERID })
    } catch (e) {
      showNotification("danger", e);
    }
  }

  subReply = (item, subitem) => {
    this.props.trackId(item, subitem);
  };

  Liked = () => {
    const { id, like } = this.state
    this.setState({ like: !like })
    let likes = !like
    this.props.LikeComment(id, likes).then(() => this.afterLiked())
  }

  afterLiked = () => {
    this.props.tag()
  }

  render() {
    const { name, avatar, username, reply, subReplies, liked, likes, commentid } = this.props;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.ImageContainer}>
            <TouchableOpacity onPress={() => { this.state.USERID != commentid ? this.props.navigation.navigate('OtherProfile', { postID: commentid }) : null }}>
              <ImageBackground
                source={require('../../assets/images/placeholder.png')}
                style={styles.placeholderImage}>
                <Image source={{ uri: BASE_URL + avatar }} style={styles.profileImage} />
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.replyHeader}>
              <ResponsiveText style={styles.name}>{name}</ResponsiveText>
              <ResponsiveText style={styles.userName}> @{username}</ResponsiveText>
            </View>
            <ResponsiveText style={styles.replyText}>{reply}</ResponsiveText>
            <TouchableOpacity
              onPress={() => this.subReply(this.props.item, null)}
              style={styles.replyIconContainer}>
              <Image
                source={require('../../assets/icons/comment.png')}
                style={styles.commentIcon}
              />
              <ResponsiveText style={styles.replyLabel}> Reply</ResponsiveText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => this.Liked()}
            style={[styles.LikeIconContainer, { width: 40 }]}>
            <Image
              source={
                liked
                  ? require('../../assets/icons/heart.png')
                  : require('../../assets/icons/heart_outline.png')
              }
              style={[styles.heart]}
            />
            <ResponsiveText style={styles.likesCount}>
              {likes}
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        {subReplies.length > 0 &&
          !this.props.hideReply &&
          subReplies.map((item) => (
            <SubReplyCard
              item={item}
              subReply={(item) => this.subReply(this.props.item, item)}
              tag={this.afterLiked.bind(this)}
            />
          ))}
      </>
    );
  }
}

export default CommentsReplyCard;

const styles = {
  container: {
    marginBottom: wp('3'),
    flexDirection: 'row',
  },
  ImageContainer: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
  },
  profileImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
  },
  LikeIconContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  contentContainer: {
    maxWidth: '70%',
    marginLeft: wp('2'),
    paddingTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.SourceSansProRegular,
    color: 'black',
    fontSize: 4.4,
    marginRight: wp('1'),
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp('1'),
  },
  userName: {
    fontFamily: Fonts.SourceSansProRegular,
    color: '#0089FF',
    fontSize: 3.3,
  },
  replyText: {
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 3.3,
    color: '#828282',
  },
  replyIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp('2'),
    marginLeft: wp('5')
  },
  commentIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    tintColor: '#ffce31'
  },
  replyLabel: {
    fontFamily: Fonts.OpenSansSemiBold,
    color: '#BDBDBD',
    fontSize: 2.9,
    marginLeft: wp('2'),
  },
  likesCount: {
    fontFamily: Fonts.OpenSansSemiBold,
    color: '#BDBDBD',
    fontSize: 3.1,
  },
  likesCount1: {
    fontFamily: Fonts.OpenSansSemiBold,
    color: '#BDBDBD',
    fontSize: 3.1,
    marginLeft: wp('1'),
  },
  subReplyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginLeft: 50,
  },
  subReplyAvatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
};
