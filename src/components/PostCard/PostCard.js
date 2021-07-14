/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Share, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ResponsiveText from '../ResponsiveText';
import Fonts from '../../themes/Fonts';
import VideoPlayer from 'react-native-video-player';
import { BASE_URL } from '../../utils/env';
import InputField from '../InputField';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import convertToProxyURL from 'react-native-video-cache';
import showNotification from '../../utils/services'

class PostCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOptionOpen: false,
      showVideoView: true,
      hideViews: false,
      isLiked: false,
      following: false,
      modalVisible: false,
      reason: '',
      emptyReason: false,
      difference: 'sec',
      loadingImage: false,
      add: '',
      videoduration: 0,
      title: {},
      commentedBY: [],
      viewAllComments: false,
      USERID: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.postMenu !== prevProps.postMenu) { this.toggleMenu(); }
  }

  componentDidMount = async () => {
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    });
    const { duration } = this.props
    this.msToHMS(duration * 1000);
    this.timedifference()
    try {
      const USERID = await AsyncStorage.getItem('USERID')
      this.setState({ USERID: USERID })
    } catch (e) {
      showNotification("danger", e);

    }

  }

  msToHMS(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    this.setState({ videoduration: minutes + ":" + seconds })
  }

  toggleMenu = () => { this.setState({ isOptionOpen: false, }); };
  setModalVisible = (visible) => { this.setState({ modalVisible: visible, isOptionOpen: false }); }

  onReported = (visible) => {
    const { reason } = this.state;
    if (reason) {
      this.setState({ modalVisible: visible, emptyReason: false });
      const { userId, postID } = this.props
      this.props.onReportPost(userId, postID, this.state.reason).then(() => this.afterReporting())
    } else { this.setState({ emptyReason: true }) }
  }

  afterReporting = () => {
    this.props.reportResponse
  }

  onShare = async (path) => {
    this.setState({ isOptionOpen: false });
    try {
      const result = await Share.share({
        message: path,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      post_url
      alert(error.message);
    }
  };

  onFollowRequest = (id) => {
    this.setState({ isOptionOpen: false })
    this.props.onFollow(id).then(() => this.afterFollow())
  }

  afterFollow = () => {
    this.props.tag()
  }

  onUnFollowRequest = (id) => {
    this.props.onUnFollow(id).then(() => this.afterUnFollow())
  }

  afterUnFollow = () => {
    this.props.tag()
  }

  getComments = () => {
    const { postID, description } = this.props
    this.props.navigation.navigate('Comments', { postID: postID, desc: description });
  }

  aftergetComments = () => {
    const { postID } = this.props
    this.props.navigation.navigate('Comments', { postID: postID, desc: description });
  }

  getLikes = () => {
    const { postID } = this.props
    this.props.getLikes(postID).then(() => this.aftergetLikes())
  }

  aftergetLikes = () => {
    this.props.navigation.navigate('LikedBy')
  }


  getData = async () => {
    try {
      const refreshvalue = await AsyncStorage.getItem('refreshvalue')
      if (refreshvalue == 'true') {
        await AsyncStorage.setItem('refreshvalue', 'false')
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  getUndoLikes = () => {
    const { postID } = this.props
    this.props.undoLiked(postID).then(() => this.afterUndoLikes())
  }

  afterUndoLikes = () => {
    this.setState((prev) => ({ isLiked: !prev.isLiked }))
  }

  Liked = async () => {
    this.setState({ isLiked: !this.state.isLiked })
    const { postID } = this.props
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
        'postId': postID,
        'isLiked': like
      })
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.tag()
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  afterLiked = () => {
    this.props.tag()
  }

  videoloadstart = () => {
    this.setState({ loadingVideoback: true, })
  }
  videoloadend = () => {
    this.setState({ loadingVideoback: false, })
  }

  onBlock = () => {
    const { userId } = this.props
    this.props.onBlock(userId).then(() => this.afterBlock())
  }

  afterBlock = () => {
    this.props.blockResponse
  }

  timedifference = () => {
    const { time } = this.props
    let abc = new Date(time)
    let mili = abc.valueOf()
    let today = Date.now()
    let xyz = today - mili
    let cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(xyz / cd),
      h = Math.floor((xyz - d * cd) / ch),
      m = Math.round((xyz - d * cd - h * ch) / 60000)
    let min = m + ' ' + 'min ago';
    let hours = h + ' ' + 'hours ago ';
    let day = d + ' ' + 'days ago'
    if (d > 0) {
      this.setState({ difference: day })
    } else if (h > 0) {
      this.setState({ difference: hours })
    } else if (m > 0) {
      this.setState({ difference: min })
    } else {
      this.setState({ difference: 'few seconds ago' })
    }
  }

  videopost = async () => {
    this.setdata()
    const { postID } = this.props
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'post/updateVideoCount/' + postID, {
      method: 'PUT',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.tag()
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
})
  }

  setdata = async () => {
    try {
      await AsyncStorage.setItem('videopageuser', 'true')
    } catch (e) {
      showNotification("danger", e);

    }
  }

  comments = async () => {
    const { postID } = this.props
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'comment/viewpost/' + postID, {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const stories = json ? json.data : '';
        const commentedBY = stories.map((item) => item.commentBy)
        const title1 = stories.map((item) => item.title)
        let title = Object.assign({}, title1);
        this.setState({ commentsArray: stories, commentedBY: commentedBY, title: title });
      }
      )
      .catch(err=> {
        showNotification("danger", err.message);

      })
  }

  deletepost = (id) => {
    this.props.DeletePost(id).then(() => this.afterDeletepost())
  }

  afterDeletepost = () => {
    this.setState({ isOptionOpen: false })
    this.props.tag()
  }


  HASHTAG_FORMATTER = string => {
    return string.join(" ").split(/((?:^|\s)(?:#[a-z\d-]+))/gi).filter(Boolean).map((v, i) => {
      if (v.includes('#')) {
        return <TouchableOpacity>
          <Text key={i}
            style={{
              color: '#0089FF',
              fontFamily: Fonts.SourceSansProRegular,
              fontSize: wp('4.3'),
              width: wp('89'),
            }}>{v}</Text>
        </TouchableOpacity>
      } else {
        return <Text key={i}>{v}</Text>
      }
    })
  };

  render() {
    const { isOptionOpen, modalVisible, USERID } = this.state;
    const { profile_image, user_name, likes, comments, description, post_type, post_url, isLikedByUser, views, isLive, thumbnail, postID, userId, ID, viewedBy } = this.props;

    return (
      <View style={styles.container}>
        {isOptionOpen && (
          <View style={styles.options}>
            {userId == ID ?
              <TouchableOpacity onPress={() => this.deletepost(postID)}
                style={styles.optionItem}>
                <ResponsiveText style={styles.optionText}>Delete</ResponsiveText>
              </TouchableOpacity>
              : <View>
                <TouchableOpacity style={styles.optionItem}>
                  <ResponsiveText style={styles.optionText}>Report post</ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onShare()} style={[styles.optionItem, { borderBottomWidth: 0 }]}>
                  <ResponsiveText style={styles.optionText}>Share</ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onBlock()} style={[styles.optionItem, { borderBottomWidth: 0 }]}>
                  <ResponsiveText style={styles.optionText}>Block user</ResponsiveText>
                </TouchableOpacity>
              </View>
            }
          </View>
        )}

        <View style={styles.postHeader}>
          <TouchableOpacity
            onPress={() => USERID != userId ? this.props.navigation.navigate('OtherProfile', { postID: userId }) : null}>
            <View style={{ flexDirection: 'row' }}>
              {profile_image == '' ?
                <Image
                  source={require('../../assets/images/model.jpg')}
                  style={styles.posterHeaderProfileImage}
                /> :
                <FastImage
                  style={styles.posterHeaderProfileImage}
                  source={{
                    uri: BASE_URL + profile_image,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                  }}
                />
              }
              <View style={styles.nameContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ResponsiveText style={styles.name}>
                    {user_name}
                  </ResponsiveText>
                </View>
                <ResponsiveText style={styles.time}>{this.state.difference} </ResponsiveText>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 30 }}
            onPress={() => this.setState((prev) => ({ isOptionOpen: !prev.isOptionOpen }))}>
            <Image
              source={require('../../assets/icons/ic_dots.png')}
              style={styles.threeDots}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.postBody}>
          {post_type === 0 && (
            <FastImage
              style={styles.postImage}
              source={{
                uri: BASE_URL + post_url,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
            />
          )}
          {post_type === 1 && (
            <>
              <View style={styles.videoContainer}>
                <VideoPlayer
                  video={{ uri: convertToProxyURL(BASE_URL + post_url) }}
                  autoplay={false}
                  disableSeek={true}
                  onStart={() => this.videopost()}
                  videoWidth={wp('100')}
                  videoHeight={wp('65')}
                  pauseOnPress={true}
                  thumbnail={{ uri: BASE_URL + thumbnail }}
                  endWithThumbnail={true}
                  resizeMode={'cover'}
                  hideControlsOnStart={true}
                  controlsTimeout={200}
                  customStyles={{
                    controls: { opacity: 0 },
                  }}
                />
              </View>
              {this.state.loadingVideoback && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'gray',

                    position: 'absolute',
                    zIndex: 1000,
                  }}>
                  <ActivityIndicator
                    color={'white'}
                    size={'large'}
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      top: 0,
                      bottom: 0,
                    }}
                  />
                </View>
              )}
              <View style={styles.postViewContainer}>
                <TouchableOpacity
                  onPress={() => views > 0 ? this.props.navigation.navigate('Viewers', { postID: postID, viewedBy: viewedBy }) : null}
                >
                  <ResponsiveText style={styles.viewAndTime}>
                    {views} {isLive ? 'Viewers' : 'Views'}
                  </ResponsiveText>
                </TouchableOpacity>
                <ResponsiveText
                  style={styles.viewAndTime}>
                  {this.state.videoduration}
                </ResponsiveText>
              </View>
            </>
          )}
        </View>
        <View style={styles.postDescription}>
          <View style={styles.likesCommentShareContainer}>
            <View style={styles.likeContainer}>
              <TouchableOpacity
                onPress={() => this.Liked()}
                style={{ padding: 5 }}>
                <Image
                  source={
                    isLikedByUser
                      ? require('../../assets/icons/heart.png')
                      : require('../../assets/icons/heart_outline.png')
                  }
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => likes > 0 ? this.props.navigation.navigate('LikedBy', { postId: postID }) : null}>
                <ResponsiveText style={styles.likesCount}>
                  {likes}
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.getComments()} style={styles.commentContainer}>
              <Image
                source={require('../../assets/icons/comment.png')}
                style={[styles.commentIcon, { padding: 5 }]}
              />
              <ResponsiveText style={styles.commentCount}> {comments}</ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onShare(BASE_URL + post_url)}
              style={{ padding: 5 }}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.descriptionTextContainer}>
            {description ? <Text style={styles.descriptionText}>{description}</Text> : null}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Comments', { postID: postID, desc: description })}>
              <Text
                style={[
                  styles.descriptionText,
                  { color: '#BDBDBD', fontSize: wp(3.2), marginTop: 5 },
                ]}>
                View all Comments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.formContent}>
                <ResponsiveText style={styles.fieldHeading}>Report</ResponsiveText>
                <InputField
                  placeholder={'Type reason'}
                  inputField={styles.inputInternalStyle}
                  containerStyle={styles.nameInput}
                  value={this.state.reason}
                  onFocus={() => this.setState({ emptyReason: false })}
                  onChangeText={reason => this.setState({ reason })}
                />
                {this.state.emptyReason ?
                  <ResponsiveText style={{ fontSize: 3, color: 'red' }}>Please enter some reason</ResponsiveText>
                  : null
                }
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#ffce31" }}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#ffce31" }}
                  onPress={() => this.onReported(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View >
    );
  }
}

export default PostCard;

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: wp('50'),
    width: wp('80'),
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: wp('25'),
  },
  textStyle: {
    textAlign: "center",
    color: '#025960',
    fontWeight: 'bold',
    fontFamily: Fonts.SourceSansProSemiBold,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  fieldHeading: {
    fontSize: 4,
    fontFamily: Fonts.OpenSansRegular,
  },
  nameInput: {
    marginBottom: hp('2.5'),
    borderWidth: 0,
    borderBottomWidth: wp('0.3'),
    borderBottomColor: '#E1E1E1',
    borderRadius: 0,
    height: hp('4.5'),
    paddingHorizontal: 0,
    paddingLeft: 0,
  },
  inputInternalStyle: {
    color: 'black',
    paddingHorizontal: 0,
    fontSize: wp(3.3),
    fontFamily: Fonts.OpenSansRegular,
  },
  container: {
    flex: 1,
    marginBottom: wp('7'),
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wp('18'),
    paddingHorizontal: wp('5.5'),
  },
  posterHeaderProfileImage: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    backgroundColor: '#F3F3F3',
  },
  threeDots: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    padding: 8,
  },
  nameContainer: {
    paddingLeft: wp('2'),
    paddingTop: wp('2'),
  },
  name: {
    fontSize: 4.7,
    fontFamily: Fonts.SourceSansProRegular,
    marginBottom: wp('0.5'),
    color: 'black',
  },
  time: {
    fontSize: 3,
    fontFamily: Fonts.SourceSansProRegular,
    color: '#767676',
  },
  verifyMark: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),
  },
  postBody: {

  },
  postImage: {
    height: wp('65'),
    width: Dimensions.get('window').width,
    backgroundColor: '#F3F3F3',
  },
  videoContainer: {
    backgroundColor: '#F3F3F3',
  },
  options: {
    width: wp('35'),
    backgroundColor: 'white',
    borderRadius: wp('1'),
    position: 'absolute',
    zIndex: 15,
    right: wp('5.5'),
    top: wp('6'),
    elevation: 6,
  },
  optionItem: {
    alignItems: 'center',
    paddingVertical: wp('3'),
    borderBottomWidth: wp('0.3'),
    marginHorizontal: wp('3'),
    borderBottomColor: '#D2D2D2',
    justifyContent: 'center',
  },
  optionText: {
    fontFamily: Fonts.OpenSansRegular,
  },

  postViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5.5'),
    position: 'absolute',
    bottom: wp('3'),
    width: wp('100'),
  },
  viewAndTime: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: wp('1'),
    paddingHorizontal: wp('3'),
    borderRadius: wp('1'),
    color: 'white',
    fontFamily: Fonts.RobotoBold,
    fontSize: 3.8,
  },
  liveText: {
    color: '#FF0000',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: wp('2'),
    borderRadius: wp('1'),

    fontFamily: Fonts.RobotoBold,
  },
  postDescription: {
    paddingHorizontal: wp(5.5),
  },
  likesCommentShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: wp('11.5'),
    paddingTop: 5,
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
  },
  heartIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    marginLeft: -wp('1'),
  },
  likesCount: {
    fontFamily: Fonts.RobotoBold,
    marginLeft: wp('1.2'),
    fontSize: 3.3,
    color: '#BDBDBD',
  },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
  },
  commentIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  commentCount: {
    color: '#BDBDBD',
    fontFamily: Fonts.RobotoBold,
    marginLeft: wp('2.5'),
    fontSize: 3.3,
  },
  descriptionTextContainer: {
    flexWrap: 'wrap',
  },
  descriptionText: {
    width: wp('89'),
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: wp('4.3'),
    color: '#4F4F4F',
    // lineHeight: wp('6'),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  plusContainer: {
    height: wp('4.5'),
    width: wp('4.5'),
    borderRadius: wp('4.5'),
    backgroundColor: '#025960',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: wp('3.5'),
    right: 0,
  },
  plusIcon: {
    height: wp('2.5'),
    width: wp('2.5'),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  commentTextContainer: {
    flexDirection: 'row',
    marginBottom: wp('1.5'),
  },
  commentedBY: {
    color: '#3A3A3A',
    opacity: 0.5,
    marginRight: wp('1'),
    fontFamily: Fonts.SourceSansProRegular,
  },
  taggedUser: {
    color: '#0089FF',
    marginRight: wp('1'),
    fontFamily: Fonts.SourceSansProRegular,
  },
  commentText: {
    fontFamily: Fonts.SourceSansProRegular,
    color: '#3A3A3A',
  },
};
