/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/env';
import showNotification from '../utils/services'

class VideoCard extends React.Component {
  constructor() {
    super()
    this.state = {
      videoduration: 0,
      isLiked: false,
    }
  }
  componentDidMount = () => {
    const { duration } = this.props
    this.msToHMS(duration * 1000);
  }

  msToHMS(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    this.setState({ videoduration: minutes + ":" + seconds })
  }

  Liked = async () => {
    this.setState({ isLiked: !this.state.isLiked })
    const { postid } = this.props
    let like = !this.state.isLiked
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'like/add', {
      method: 'POST',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'postId': postid,
        'isLiked': like
      })
    })
      .then((response) => response.json())
      .then((json) => {

        this.props.tag()
      })
      .catch(err => {
        showNotification("danger", err.message);

      })
  }

  render() {
    const {
      index,
      viewCount,
      thumbnail,
      duration,
      title,
      time,
      comments,
      likes,
      views,
      item,
      postid,
      isLikedByUser,
      viewedBy
    } = this.props;


    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SinglePost', {
              item: item,
              index: index
            })
          }
          style={styles.thumbnailContainer}>
          <Image
            source={
              thumbnail
                ? { uri: BASE_URL + thumbnail }
                : require('../assets/images/placeholderthumbnail.jpg')
            }
            style={styles.thumbnail}
          />
          <ResponsiveText style={styles.duration}>{this.state.videoduration}</ResponsiveText>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('SinglePost', {
                item: item,
                index: index
              })
            }
          >
            <ResponsiveText style={styles.titleText}>
              {title.length < 50 ? title : `${title.substring(0, 50)}...`}
            </ResponsiveText>
          </TouchableOpacity>
          <ResponsiveText style={styles.time}>{time}</ResponsiveText>
          <View style={styles.likeCommentContainer}>
            <View style={styles.likeContainer}>
              <TouchableOpacity
                onPress={() => this.Liked()}
                style={{ padding: 5 }}>
                <Image
                  source={
                    isLikedByUser
                      ? require('../assets/icons/heart.png')
                      : require('../assets/icons/heart_outline.png')
                  }
                  style={styles.heart}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => likes > 0 ? this.props.navigation.navigate('LikedBy', { postId: postid }) : null}
              >
                <ResponsiveText style={styles.like}>{likes}</ResponsiveText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Comments', { postID: postid, desc: title })
              }}
            >
              <View style={styles.likeContainer}>
                <Image
                  source={require('../assets/icons/comment.png')}
                  style={styles.heart}
                />
                <ResponsiveText style={styles.like}>{comments}</ResponsiveText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Viewers', { postID: postid, viewedBy: viewedBy })}
            >
              <View style={styles.likeContainer}>
                <ResponsiveText style={styles.like}>
                  {viewCount} views
                </ResponsiveText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default VideoCard;

const styles = {
  container: {
    marginBottom: wp('4'),
    flexDirection: 'row',
  },
  thumbnailContainer: {
    height: wp('26'),
    width: wp('40'),
    borderRadius: wp('2'),
    backgroundColor: 'black',
  },
  thumbnail: {
    height: wp('26'),
    width: wp('40'),
    borderRadius: wp('2'),
    backgroundColor: '#F2F2F2',

  },
  duration: {
    backgroundColor: '#f8cc14',
    color: '#000000',
    position: 'absolute',
    bottom: wp('1.5'),
    right: wp('2'),
    paddingHorizontal: wp('2'),
    paddingVertical: wp('1'),
    borderRadius: wp('1.5'),
    fontSize: 2.8,
  },
  detailsContainer: {
    flexGrow: 1,
    marginLeft: wp('2.5'),
    paddingVertical: wp('0.3'),
    justifyContent: 'space-between',
    maxWidth: wp('50'),
  },
  titleText: {
    color: '#3A3A3A',
    fontSize: 3.9,
    fontFamily: Fonts.SourceSansProRegular,
  },
  time: {
    maxHeight: wp('9'),
    color: '#9D9D9D',
    fontSize: 3.2,
    fontFamily: Fonts.SourceSansProRegular,
  },
  likeCommentContainer: {
    height: wp('8'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    height: wp('4'),
    width: wp('4'),
    resizeMode: 'contain',
    marginRight: wp('1.5'),
  },
  like: {
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#8A8A8A',
    maxWidth: wp('20'),
  },
};
