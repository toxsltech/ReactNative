/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-animatable';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import ResponsiveText from '../ResponsiveText';
import Fonts from '../../themes/Fonts';
import { BASE_URL } from '../../utils/env'
import FastImage from 'react-native-fast-image';

class StorySubReplyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      id: '',
    };
  }
  componentDidMount = () => {
    const { item } = this.props;
    const Id = item._id
    this.setState({ id: Id })
  }

  Liked = () => {
    const { id } = this.state
    this.setState({ liked: !this.state.liked })
    let like = !this.state.liked
    this.props.LikeSubComment(id, like).then(() => this.afterLiked())
  }

  afterLiked = () => {
    this.props.tag()

  }
  render() {
    const { item, subReply } = this.props;

    return (
      <View style={styles.subReplyContainer}>
        <View style={{ flexDirection: 'row' }}>
          {item.profileImg == '' ?
            <Image
              source={require('../../assets/images/model.jpg')}
              style={styles.UserImage}
            /> :
            <FastImage
              style={styles.subReplyAvatar}
              source={{
                uri: BASE_URL + item.profileImg,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
            />
          }
          <View style={{ marginLeft: 10, maxWidth: wp('45') }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ResponsiveText style={styles.name}>{item.userName}</ResponsiveText>
              <ResponsiveText style={styles.userName}>
                @{item.email.split("@")[0]}
              </ResponsiveText>
            </View>
            <ResponsiveText style={styles.replyText}>
              {item.title}
            </ResponsiveText>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginTop: wp('1'), flexDirection: 'row' }}>
              </View>
              <TouchableOpacity
                onPress={() => subReply(this.props.item)}
                style={styles.replyIconContainer}>
                <Image
                  source={require('../../assets/icons/comment.png')}
                  style={styles.commentIcon}
                />
                <ResponsiveText style={styles.replyLabel}>Reply</ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.Liked()}
          style={styles.LikeIconContainer}>
          <Image
            source={
              item.isSubReplyLikedByUser
                ? require('../../assets/icons/heart.png')
                : require('../../assets/icons/heart_outline.png')
            }
            style={[styles.heart]}
          />
          <ResponsiveText style={styles.likesCount}>
            {item.subLikeCount}
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default StorySubReplyCard;

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
  UserImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    marginRight: wp('2'),
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
    backgroundColor: 'grey',
  },
};
