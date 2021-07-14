/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList, ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import VideoPlayer from 'react-native-video-player';
import { BASE_URL } from '../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import convertToProxyURL from 'react-native-video-cache';
import showNotification from '../utils/services'

class SinglePostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionOpen: false,
      showVideoView: true,
      hideViews: false,
      viewAllComments: false,
      isLiked: false,
      Posts: [],
      comments: {},
      likes: {},
      isLikedByUser: {},
      viewCount: {},
      viewedBy: {},
      title: {},
      commentedBY: []
    };
  }
  componentDidMount() {
    this.fetch()
    this.comments();
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
      this.getviewersrefresh()
    });
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

  setdata = async () => {
    try {
      await AsyncStorage.setItem('videopageuser', 'true')
    } catch (e) {
      showNotification("danger", e);

    }
  }

  setdata11 = async () => {
    try {
      await AsyncStorage.setItem('deletepost', 'true')
    } catch (e) {
      showNotification("danger", e);

    }
  }

  getData = async () => {
    try {
      const refreshvalue = await AsyncStorage.getItem('refreshvalue')
      if (refreshvalue == 'true') {
        await AsyncStorage.setItem('refreshvalue', 'false')
        this.fetch()
        this.comments();
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const Likesfollowing = await AsyncStorage.getItem('Likesfollowing')
      if (Likesfollowing == 'true') {
        await AsyncStorage.setItem('Likesfollowing', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  fetch = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'post/posts/', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const postData = json ? json.data : '';
        const comments1 = postData.map((item) => item.countComment)
        const likes1 = postData.map((item) => item.countLike)
        const isLikedByUser1 = postData.map((item) => item.isLikedByUser)
        const viewCount1 = postData.map((item) => item.viewCount)
        const viewedBy2 = postData.map((item) => item.viewedBy)
        let comments = Object.assign({}, comments1);
        let likes = Object.assign({}, likes1);
        let isLikedByUser = Object.assign({}, isLikedByUser1);
        let viewCount = Object.assign({}, viewCount1);
        let viewedBy1 = Object.assign({}, viewedBy2);

        this.setState({ Posts: postData, isFetching: false, comments: comments, likes: likes, isLikedByUser: isLikedByUser, viewCount: viewCount, viewedBy: viewedBy1 });
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  videopost = async () => {
    this.setdata()
    const { postid } = this.props
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'post/updateVideoCount/' + postid, {
      method: 'PUT',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.fetch()
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  comments = async () => {
    const { postid } = this.props
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'comment/viewpost/' + postid, {
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
      .catch(err => {
        showNotification("danger", err.message);

      })
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
        this.fetch()
      })
      .catch(err => {
        showNotification("danger", err.message);
      })

  }

  getviewersrefresh = async () => {
    try {
      const Viewersfollowing = await AsyncStorage.getItem('Viewersfollowing')
      if (Viewersfollowing == 'true') {
        await AsyncStorage.setItem('Viewersfollowing', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  videoloadstart = () => {
    this.setState({ loadingVideoback: true, })
  }

  videoloadend = () => {
    this.setState({ loadingVideoback: false, })
  }

  deletepost = async () => {
    const { postid } = this.props
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'post/post/' + postid, {
      method: 'DELETE',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isOptionOpen: false })
        this.setdata11()
      })
      .catch(err => {
        showNotification("danger", err.message);
      })
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
    const { isOptionOpen, comments, likes, isLikedByUser, viewCount, viewedBy, commentedBY } = this.state;
    const {
      index,
      profile_image,
      user_name,
      email,
      description,
      post_type,
      post_url,
      isLive,
      thumbnail,
      postid,
    } = this.props;

    return (
      <ScrollView
        ref={(ref) => (this.scrollView = ref)}
        onContentSizeChange={() => {
          if (this.state.viewAllComments) {
            this.scrollView.scrollToEnd({ animated: true });
          } else {
            this.scrollView.scrollTo({ y: 0 });
          }
        }}
        bounces={false}

        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {isOptionOpen && (
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => this.deletepost()}>
                <ResponsiveText style={styles.optionText}>
                  Delete
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.optionItem, { borderBottomWidth: 0 }]}
                onPress={() => this.setState({ isOptionOpen: false })}>
                <ResponsiveText style={styles.optionText}>Share</ResponsiveText>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.postHeader}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity>
                {profile_image ? (
                  <Image
                    source={{ uri: BASE_URL + profile_image }}
                    style={styles.posterHeaderProfileImage}
                  />
                ) : (
                  <Image
                    source={require('../assets/images/model.jpg')}
                    style={styles.posterHeaderProfileImage}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.nameContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <ResponsiveText style={styles.name}>
                      {user_name}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <ResponsiveText style={styles.userName}>
                    @ {email.split("@")[0]}
                  </ResponsiveText>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.setState((prev) => ({ isOptionOpen: !prev.isOptionOpen }))
              }>
              <Image
                source={require('../assets/icons/three_dots.png')}
                style={styles.threeDots}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.postBody}>
            {post_type === 0 && (
              <>
                <Image source={{ uri: BASE_URL + post_url }} style={styles.postImage} />
              </>
            )}

            {post_type === 1 && (
              <>
                <View style={styles.videoContainer}>
                  <VideoPlayer
                    video={{ uri: convertToProxyURL(BASE_URL + post_url) }}
                    onStart={() => this.videopost()}
                    videoWidth={wp('100')}
                    videoHeight={400}
                    pauseOnPress={true}
                    thumbnail={{
                      uri: BASE_URL + thumbnail,
                    }}
                    endWithThumbnail={true}
                    resizeMode={'cover'}
                    hideControlsOnStart={true}
                    controlsTimeout={5000}
                    customStyles={{
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
                    onPress={() => viewCount[index] > 0 ? this.props.navigation.navigate('Viewers', { postID: postid, viewedBy: viewedBy[index] }) : null}
                  >
                    <ResponsiveText style={styles.viewAndTime}>
                      {viewCount[index]} {isLive ? 'Viewers' : 'Views'}
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
                      isLikedByUser[index]
                        ? require('../assets/icons/heart.png')
                        : require('../assets/icons/heart_outline.png')
                    }
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    likes[index] > 0 ? this.props.navigation.navigate('LikedBy', { postId: postid }) : null
                  }}>
                  <ResponsiveText style={styles.likesCount}>
                    {likes[index]}
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
              <View style={styles.commentContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Comments', { postID: postid, desc: description })
                  }}
                  style={{ padding: 5 }}>
                  <Image
                    source={require('../assets/icons/comment.png')}
                    style={styles.commentIcon}
                  />
                </TouchableOpacity>
                <ResponsiveText style={styles.commentCount}>
                  {comments[index]}
                </ResponsiveText>
              </View>
              {post_type === 1 && (
                <View style={styles.commentContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Viewers', { postID: postid, viewedBy: viewedBy[index] })
                    }}
                    style={{ padding: 5 }}>
                    <Image
                      source={require('../assets/icons/eye.png')}
                      style={[styles.commentIcon, { tintColor: '#909090' }]}
                    />
                  </TouchableOpacity>
                  <ResponsiveText style={styles.commentCount}>
                    {viewCount[index]}
                  </ResponsiveText>
                </View>
              )}
            </View>
            <View style={styles.descriptionTextContainer}>
              {description ? <Text style={styles.descriptionText}>{description}</Text> : null}
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Comments', { postID: postid, desc: description })
                }}>
                <ResponsiveText style={styles.viewAllComments}>
                  View all comments
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity />
          <FlatList
            data={
              this.state.viewAllComments
                ? commentedBY
                : commentedBY.slice(
                  commentedBY.length - 3)
            }
            contentContainerStyle={{
              marginHorizontal: wp('5'),
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.commentTextContainer}>

                  <TouchableOpacity>
                    <ResponsiveText style={styles.commentedBY}>
                      {item.userName}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', maxWidth: wp('40') }}>
                    <TouchableOpacity>
                      <ResponsiveText style={styles.taggedUser}>
                        @{item.email.split("@")[0]}
                      </ResponsiveText>
                    </TouchableOpacity>
                    <ResponsiveText style={styles.commentText}>
                      {this.state.title[index]}
                    </ResponsiveText>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default SinglePostCard;

const styles = {
  container: {
    flex: 1,
    marginBottom: wp('7'),
    backgroundColor: 'white',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: wp('12'),
    paddingHorizontal: wp('5.5'),
  },
  posterHeaderProfileImage: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: '#F3F3F3',
  },
  threeDots: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    padding: 10,
  },
  nameContainer: {
    paddingLeft: wp('2'),
    paddingTop: wp('2'),
    alignItems: 'center',
  },
  name: {
    fontSize: 4.6,
    fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('1'),
    color: '#181818',
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
    height: 400,
  },
  postImage: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F3F3F3',

  },
  videoContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#AFB1B3',
  },
  options: {
    width: wp('34'),
    backgroundColor: 'white',
    borderRadius: wp('2'),
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
    borderBottomColor: '#CBCBCB',
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
    fontFamily: Fonts.RobotoBold,
    marginLeft: wp('1.2'),
    fontSize: 3.3,
  },
  descriptionTextContainer: {
    flexWrap: 'wrap',
  },
  descriptionText: {
    width: wp('89'),
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: wp('4.1'),
    color: '#3A3A3A',
    // lineHeight: wp('6'),
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  userName: {
    fontSize: 3.5,
    marginLeft: wp('2'),
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#767676',

  },
  viewAllComments: {
    color: '#3A3A3A',
    opacity: 0.5,
    fontSize: 3.5,
    paddingVertical: wp('1.5'),
    fontFamily: Fonts.SourceSansProRegular,
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
