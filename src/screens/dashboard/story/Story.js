import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../components/Container';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ResponsiveText from '../../../components/ResponsiveText';
import { BASE_URL } from '../../../utils/env';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import Fonts from '../../../themes/Fonts';
import InputFieldComment from '../../../components/InputFieldComment';
import Share from 'react-native-share';
import LikedByStoryCard from '../../../components/LikedByStoryCard';
import CommentsCard from '../../../components/CommentsCard';
import ViewersCard from '../../../components/ViewersCard';
import FastImage from 'react-native-fast-image';
import { Notifier, NotifierComponents } from 'react-native-notifier';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'

const url = 'https://awesome.contents.com/';
const title = 'Awesome Contents';
const message = 'Please check this out.';

const options = {
  title: '',
  message: '',
  url: 'jkdj',
  default: {
    title,
    subject: title,
    message: `${message}`,
    urls: [url],
  },
};

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      images: [],
      currentImage: 0,
      progress: 0,
      testPause: 0,
      timeOut: 5000,
      new: 50,
      CommentsModal: false,
      viewsModal: false,
      focusInput: false,
      loadingImage: true,
      mounted: false,
      comments: [],
      replyText: '',
      liked: false,
      likes: 112,
      profile: '',
      name: '',
      storyData: [],
      post_type: [],
      autoplay: true,
      xcoordinate: 0,
      ycoordinate: 0,
      description: '',
      ViewCount: [],
      height: false,
      followersData: [],
      Dislike: 0,
      isLiked: false,
      isDisliked: false,
      likeCount: [],
      incre: 0,
      disLikeCount: [],
      scale: 1,
      colorcode: '#f0f',
      replyto: null,
      storyId: null,
      allComments: [],
      current: 0,
      Data: [],
      Data1: [],
      viewsModal1: false,
      viewsModal2: false,
      wait: true,
      commentCount: [],
      duration: [],
      height1: false,
      loadingImageback: false,
      replyUsername: '',
      pausevideo: false,
      progressvideo: 0,
      userid: ''
    };
  }
  componentDidMount() {
    this.subscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ loadingImage: true })
      const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
      this.setState({ profile: Info.profileImg, name: Info.userName, userid: Info._id });
      this.props.onGetStory().then(() => this.afterGetStory())
      StatusBar.setHidden(true);
    });
    const unsubscribe = this.props.navigation.addListener('blur', () => {
      StatusBar.setHidden(false);
    });
  }

  storydislike = () => {
    this.props.onGetStory().then(() => this.afterGetStory())
  }

  afterGetStory = () => {
    this.setState({ loadingImage: false })
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    var count = (data.data).map((item) => item.viewCount);
    var duration = (data.data).map((item) => item.totalTime);
    var likecount = (data.data).map((item) => item.likeCount);
    var commentCount = (data.data).map((item) => item.commentCount);
    var dislikecount = (data.data).map((item) => item.dislikeCount);
    var stor = (data.data).map((item) => item.type);
    const storyImgs = (data.data).map((item) => item.storyImg);
    this.setState({
      isFetching: false, images: storyImgs, post_type: stor, ViewCount: count, likeCount: likecount,
      disLikeCount: dislikecount, commentCount: commentCount, duration: duration
    });
    const xcoordinate = (data.data).map((item) => item.xcoordinate)
    this.setState({ xcoordinate: xcoordinate });

    const ycoordinate = (data.data).map((item) => item.ycoordinate)
    this.setState({ ycoordinate: ycoordinate });

    const description = (data.data).map((item) => item.description)
    this.setState({ description: description });

    const scale = (data.data).map((item) => item.scale)
    this.setState({ scale: scale });

    const colorcode = (data.data).map((item) => item.colorcode)
    this.setState({ colorcode: colorcode });


  }
  setdata = async () => {
    try {
      await AsyncStorage.setItem('deleteStory', 'true')
    } catch (e) {
      showNotification("danger", e);

    }
  }

  onNextPress = () => {
    const { images, currentImage } = this.state;
    if (currentImage + 1 < images.length) {
      this.setState(
        (prev) => ({
          currentImage: prev.currentImage + 1,
        }),
      );
    } else {
      this.props.navigation.goBack();
    }
  };

  onPrevPress = () => {
    const { images, currentImage } = this.state;
    if (currentImage !== 0) {
      this.setState((prev) => ({
        currentImage: prev.currentImage - 1,
      }));
    }
  };

  pressIn = () => {
    this.setState({ wait: false, pausevideo: true })
    setTimeout(() => { this.onClick(), 10 })
  };

  pressOut = () => {
    this.setState({ wait: true, pausevideo: false })
    setTimeout(() => { this.onClick(), 10 })
  };

  openCommentModal = () => {
    this.getComments();
    this.pressIn();
    this.setState({ CommentsModal: true });
    this.setState({ wait: false })
    setTimeout(() => { this.onClick(), 10 })
  };

  closeCommentModal = () => {
    this.setState({ wait: true })
    setTimeout(() => { this.onClick(), 10 })
    this.pressOut();
    this.setState({ CommentsModal: false, height: false });
  };

  openViewsModal = () => {
    this.getViews();
    this.setState({ viewsModal: true, });
    this.setState({ wait: false })
    setTimeout(() => { this.onClick(), 10 })
  };

  openLikesModal = () => {
    this.getLikes();
    this.setState({ viewsModal1: true, });
    this.setState({ wait: false })
    setTimeout(() => { this.onClick(), 10 })
  };

  openDisLikesModal = () => {
    this.getDisLikes();
    this.setState({ viewsModal2: true, });
    this.setState({ wait: false })
    setTimeout(() => { this.onClick(), 10 })
  };

  closeViewsModal = () => {
    this.setState({ wait: true })
    setTimeout(() => { this.onClick(), 10 })
    this.setState({ viewsModal: false, viewsModal1: false, viewsModal2: false });
  };

  openShareModal = () => {
    this.pressIn();
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      })
      .finally(() => {
        this.closeShareModal();
      });
  };

  closeShareModal = () => {
  };


  subReply = () => {
    const { replyText, replyto, StoryId, currentImage } = this.state;
    if (replyText.trim().length > 0) {
      this.setState((prev) => ({
        replyText: '',
        replyto: null,
      }));
      const data = this.props.getprofileResponse
        ? this.props.getprofileResponse.data
        : '';
      const StoryId = data.story
      this.setState({ storyId: StoryId });
      const storyID = StoryId[this.state.currentImage]
      this.props.SubStoryComment(storyID, replyText, replyto._id).then(() => this.afterSubComment())
    }
  };
  afterSubComment = () => {
    this.getComments()
    this.storydislike();
  }


  reply = () => {
    const { allComments, replyText } = this.state;
    if (replyText.trim().length > 0) {
      let array = allComments;
      let reply = {
        id: array.length,
        name: '_haaditariq',
        avatar: 'https://picsum.photos/id/322/100',
        username: 'haadi12',
        liked: false,
        reply: replyText,
        likes: 10,
        subReplies: [],
      };

      this.PostComment();
      setTimeout(() => {
        this.listViewRef.scrollToEnd({ animated: true });
      }, 200);
    }
  };

  trackId = (item, subitem) => {
    this.setState({
      replyText: `@${subitem ? subitem.userName : item.commentBy.userName} `,
      replyto: item,
      replyUsername: subitem ? subitem.userName : item.commentBy.userName,
    });
  };


  Liked = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.isStoryLiked(storyID, this.state.isLiked).then(() => this.afterLiked())
  }

  unLiked = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.isStoryLiked(storyID, this.state.isLiked).then(() => this.afterLiked())
  }

  afterLiked = () => {
    this.setState({ wait: true })
    setTimeout(() => { this.onClick(), 10 })
    this.storydislike();
  }

  getLikes = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.onGetStoryLike(storyID).then(() => this.aftergetStoryLike())
  }

  aftergetStoryLike = () => {
    const Data = this.props.getstorylikeResponse.data;
    this.setState({ Data: Data, })
  }

  getDisLikes = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.onGetStoryDisLike(storyID).then(() => this.aftergetStoryDisLike())
  }

  aftergetStoryDisLike = () => {
    const Data1 = this.props.getstorydislikeResponse.data;
    this.setState({ Data1: Data1, })
  }

  getViews = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.onGetViews(storyID).then(() => this.afterGetViews())
  }

  afterGetViews = () => {
    const followersData = this.props.getviewsResponse.data
    this.setState({ viewsModal: true, followersData: followersData });
    this.setState({ wait: false })
    setTimeout(() => { this.onClick(), 10 })
  }

  open = () => {
    this.getComments()
  }

  PostComment = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.postStoryComment(storyID, this.state.replyText).then(() => this.afterComment())
  }
  afterComment = () => {
    this.getComments()
    this.storydislike();
    this.setState({ replyText: '' })
  }

  getComments = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const StoryId = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = StoryId[currentImage]
    this.props.getStoryComments(storyID).then(() => this.afterComments());
  }

  afterComments = () => {
    const stories = this.props.getcommentsResponse ? this.props.getcommentsResponse.data : '';
    this.setState({ allComments: stories });
  }

  barcallback = () => {
    this.onNextPress()
  }

  onClick = () => {
    this.child.current.animate();
  }

  videoloadstart = () => {
    this.setState({ loadingVideoback: true, wait: false })
    setTimeout(() => { this.onClick(), 10 })
  }

  videoloadend = () => {
    this.setState({ loadingVideoback: false, wait: true }),
      setTimeout(() => { this.onClick(), 10 })
  }

  handleProgressvideo = (progress) => {
    this.setState({
      progressvideo: Math.floor(progress.currentTime) * 1000
    });
  }

  Delete = () => {
    const data = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    const id = data.data.map((item) => item._id)
    const { currentImage } = this.state;
    const storyID = id[currentImage];
    this.props.DeleteStory(storyID).then(() => this.afterDeleteStory())
  }

  afterDeleteStory = () => {
    this.setdata()
    Notifier.showNotification({
      title: 'Story deleted sucessfully',
      Component: NotifierComponents.Notification,
    });
  }

  render() {
    const { images, currentImage, xcoordinate, ycoordinate, description, ViewCount, followersData, scale, colorcode, replyText, Data, Data1, likeCount, disLikeCount, commentCount, duration, replyUsername } = this.state;
    const { allComments } = this.state

    return (
      <Container style={{ flex: 1, backgroundColor: '#181818' }}>
        {this.state.loadingImage && (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',

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
        <View style={styles.header}>
          <View style={styles.profileAndNameContainer}>

            {this.state.profile == '' ?
              <Image
                source={require('../../../assets/images/model.jpg')}
                style={styles.profileImage}
              /> :
              <FastImage
                style={styles.profileImage}
                source={{
                  uri: BASE_URL + this.state.profile,
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
              />
            }
            <ResponsiveText style={styles.name}>
              {this.state.name}
            </ResponsiveText>
          </View>
          <View style={styles.headerbuttons}>
            <TouchableOpacity onPress={() => this.Delete()}>
              <Image
                source={require('../../../assets/icons/delete.png')}
                style={styles.headerSingleButton1}
              />
            </TouchableOpacity>
            <View />
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../../assets/icons/cross.png')}
                style={styles.headerSingleButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.progresscontainer}>
          {images.map((data, index) => {
            return (
              <View
                style={[
                  styles.singleProgressBar,
                  {
                    backgroundColor: index < currentImage ? 'white' : '#777777',
                  },
                ]} key={index}>
                {index == currentImage ? (
                  <Progress.Bar
                    animated={true}
                    ref={this.child}
                    indeterminate={true}
                    indeterminateAnimationDuration={this.state.post_type[currentImage] == 0 ? 4000 : duration[currentImage] * 1000 - this.state.progressvideo - 1000}
                    width={null}
                    color='gray'
                    unfilledColor='white'
                    useNativeDriver={true}
                    animationType='spring'
                    change={this.barcallback.bind(this)}
                    timeanimation={this.state.wait}
                    style={{
                      height: '100%',
                      width: null,
                    }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
        <View onPress={this.onPostPress} style={styles.postContainer}>

          {this.state.post_type.length != 0 && this.state.post_type[currentImage] == 0 &&
            <FastImage
              onLoadStart={() => {
                setTimeout(() => { this.onClick(), 10 })
                this.setState({ loadingImageback: true, wait: false })
              }}
              onLoadEnd={() => {
                setTimeout(() => { this.onClick(), 10 })
                this.setState({ loadingImageback: false, wait: true })
              }}
              style={{ width: wp('100'), height: '100%' }}
              source={{
                uri: BASE_URL + images[currentImage],
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}

            >
              {this.state.loadingImageback && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)',
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
              {ycoordinate[currentImage] != undefined && scale[currentImage] != undefined && colorcode[currentImage] !== undefined ?
                <View
                  style={{
                    marginTop: wp('70'),
                    transform: [
                      { translateX: Number(xcoordinate[currentImage]) },
                      { translateY: Number(ycoordinate[currentImage]) },
                      { scaleX: scale[currentImage] },
                      { scaleY: scale[currentImage] },
                    ],
                  }}>

                  <Text style={{ textAlign: 'center', color: colorcode[currentImage] }}>{description[currentImage]}</Text>
                </View> : null

              }
            </FastImage>
          }
          {this.state.post_type.length != 0 && this.state.post_type[currentImage] == 1 &&
            <View
              style={{ height: 600, overflow: 'hidden' }}>

              <View style={{ height: 750 }}>
                <Video source={{ uri: BASE_URL + images[currentImage] }}
                  resizeMode='cover'
                  onLoadStart={() => this.videoloadstart()}
                  paused={this.state.pausevideo}
                  onProgress={this.state.pausevideo ? null : this.handleProgressvideo}
                  onLoad={() => this.videoloadend()}
                  style={{ height: '100%', width: '100%' }} />
              </View>
              {this.state.loadingVideoback && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,0.3)',

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
              {ycoordinate[currentImage] != undefined && scale[currentImage] != undefined && colorcode[currentImage] !== undefined ?
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    marginTop: wp('70'),
                    transform: [
                      { translateX: Number(xcoordinate[currentImage]) },
                      { translateY: Number(ycoordinate[currentImage]) },
                      { scaleX: scale[currentImage] },
                      { scaleY: scale[currentImage] },
                    ],
                  }}>

                  <Text style={{ color: colorcode[currentImage] }}>{description[currentImage]}</Text>
                </View> : null

              }
            </View>
          }


          <TouchableOpacity
            onPress={this.onNextPress}
            style={styles.rightPress}
          />
          <TouchableOpacity
            onPress={this.onPrevPress}
            style={styles.leftPress}
          />
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.pressIn}
            onPressOut={this.pressOut}
            style={styles.centerPress}>
            <View style={styles.centerPress} />
          </TouchableWithoutFeedback>

          <TouchableOpacity
            onPress={this.getViews}
            style={styles.eyeContainer}>
            <Image
              source={require('../../../assets/icons/eye.png')}
              style={styles.eyeIcon}
            />
            <ResponsiveText style={styles.detailText}>{ViewCount[currentImage]}</ResponsiveText>
          </TouchableOpacity>


        </View>
        <View style={styles.footer}>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isLiked: true, wait: false })
                setTimeout(() => { this.Liked(), this.onClick() }, 10);
              }}>
              <Image
                source={
                  require('../../../assets/icons/heart.png')}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openLikesModal()}
            >
              <ResponsiveText style={styles.detailText}>
                {likeCount[currentImage]}
              </ResponsiveText>
            </TouchableOpacity>
          </View>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity onPress={() => {
              this.setState({ isLiked: true, wait: false })
              setTimeout(() => { this.unLiked(), this.onClick() }, 10);
            }}>
              <Image
                source={require('../../../assets/icons/heartBroken.png')}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.openDisLikesModal()}
            >
              <ResponsiveText style={styles.detailText}>{disLikeCount[currentImage]}</ResponsiveText>
            </TouchableOpacity>
          </View>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity
              style={styles.FooterItemContainer}
              onPress={this.openCommentModal}>
              <Image
                source={require('../../../assets/icons/commentFill.png')}
                style={[
                  styles.footerIcon,
                  { height: wp('5.5'), width: wp('5.5') },
                ]}
              />
              <ResponsiveText style={styles.detailText}>{commentCount[currentImage]}</ResponsiveText>
            </TouchableOpacity>
          </View>
          <View style={styles.FooterItemContainer}>
            <TouchableOpacity onPress={this.openShareModal}>
              <Image
                source={require('../../../assets/icons/shareWhite.png')}
                style={styles.footerIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.CommentsModal}
          onRequestClose={this.closeCommentModal}>
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeCommentModal}>
            <View
              style={{
                height: hp('25'),
                width: '100%',
                backgroundColor: 'transparent',
              }}
            />
          </TouchableWithoutFeedback>
          <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}>
          <View
            style={{
              height: hp('75'),
              width: '100%',
              backgroundColor: '#F9F9F9',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}>
            <View style={styles.commentModalHeader}>
              <TouchableOpacity
                onPress={this.closeCommentModal}
                style={{ padding: 2 }}

              >
                <Image
                  source={require('../../../assets/icons/cross.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                    tintColor: 'black',
                    marginTop: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              ref={(ref) => {
                this.listViewRef = ref;
              }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
                paddingTop: wp('2'),
                backgroundColor: '#F9F9F9',
              }}
              onContentSizeChange={() => { this.listViewRef.scrollToEnd({ animated: true }) }}
              onLayout={() => this.listViewRef.scrollToEnd({ animated: true })}
              data={allComments}
              renderItem={({ item, index }) => {
                return (
                  <CommentsCard
                    item={item}
                    id={item.id}
                    name={item.commentBy.userName}
                    avatar={item.commentBy.profileImg}
                    commentid={item.commentBy._id}
                    username={item.commentBy.email.split("@")[0]}
                    liked={item.isStoryCommentLikedByUser}
                    reply={item.title}
                    likes={item.likeCountOfComment}
                    subReplies={item.subReplies}
                    navigation={this.props.navigation}
                    trackId={(item, subitem) => this.trackId(item, subitem)}
                    tag={this.open.bind(this)}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
            <View style={{
              ...styles.sendInputContainer,

            }}
            >
              {this.state.replyto && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#D3D3D3',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    height: wp('8'),
                    backgroundColor: 'white'
                  }}>
                  <ResponsiveText>replying to @{replyUsername}</ResponsiveText>
                  <TouchableOpacity
                    onPress={() => this.setState({ replyto: null, replyText: '' })}>
                    <ResponsiveText style={{ color: 'red' }}>cancel</ResponsiveText>
                  </TouchableOpacity>
                </View>
              )}

              <InputFieldComment
                ref={(ref) => {
                  this.InputFieldRef = ref;
                }}
                value={replyText}
                style={{ paddingVertical: 20 }}
                // CameraIcon={true}
                placeholder={'say some thing here ...'}
                containerStyle={styles.SendInput}
                right={
                  <View style={styles.sendButton}>
                    <Image
                      source={require('../../../assets/icons/ic_send.png')}
                      style={styles.sendIcon}
                    />
                  </View>
                }
                rightPress={this.state.replyto ? this.subReply : this.reply}
                onChangeText={(e) => this.setState({ replyText: e })}
                rightStyle={{ padding: 0, marginRight: -5 }}
              />
            </View>
          </View>
          </KeyboardAwareScrollView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewsModal}
          onRequestClose={this.closeViewsModal}>
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeViewsModal}>
            <View
              style={{
                height: '33%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: wp('4'),
              borderTopRightRadius: wp('4'),
              marginTop: '-3%',
            }}>
            <View style={styles.ViewModalHeader}>
              <ResponsiveText style={styles.shareHeaderText}>
                Viewers {ViewCount[currentImage]}
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/share_dark.png')}
                style={styles.shareModalIcon}
              />
            </View>

            {followersData.length != 0 &&
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: wp('5.5'),

                }}
                data={followersData.viewedBy}
                renderItem={({ item, index }) => {
                  return (
                    <ViewersCard
                      key={index}
                      profile_image={item.profileImg}
                      user_name={item.userName}
                      time={item.createdAt}
                      following={item.isUserFollowing}
                      postID={item._id}
                      userID={this.state.userid}
                      navigation={this.props.navigation}
                    />
                  );
                }}
                keyExtractor={(item, index) => `${index}`}
              />}
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewsModal1}
          onRequestClose={this.closeViewsModal}>
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeViewsModal}>
            <View
              style={{
                height: '33%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: wp('4'),
              borderTopRightRadius: wp('4'),
              marginTop: '-3%',
            }}>
            <View style={styles.ViewModalHeader}>
              <ResponsiveText style={styles.shareHeaderText}>
                Liked By {likeCount[currentImage]}
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/share_dark.png')}
                style={styles.shareModalIcon}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
              }}
              data={Data}
              renderItem={({ item, index }) => {
                return (
                  <LikedByStoryCard
                    key={index}
                    profile_image={item.likedBy.profileImg}
                    user_name={item.likedBy.userName}
                    time={item.createdOn}
                    following={item.likedBy.isUserFollowing}
                    postID={item.likedBy._id}
                    userID={this.state.userid}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewsModal2}
          onRequestClose={this.closeViewsModal}>
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeViewsModal}>
            <View
              style={{
                height: '33%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: wp('4'),
              borderTopRightRadius: wp('4'),
              marginTop: '-3%',
            }}>
            <View style={styles.ViewModalHeader}>
              <ResponsiveText style={styles.shareHeaderText}>
                DisLiked By {disLikeCount[currentImage]}
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/share_dark.png')}
                style={styles.shareModalIcon}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
              }}
              data={Data1}
              renderItem={({ item, index }) => {
                return (
                  <LikedByStoryCard
                    key={index}
                    profile_image={item.likedBy.profileImg}
                    user_name={item.likedBy.userName}
                    time={item.createdOn}
                    following={item.likedBy.isUserFollowing}
                    postID={item.likedBy._id}
                    userID={this.state.userid}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </Modal>
      </Container>
    );
  }
}

export default Story;

const styles = {
  header: {
    height: wp('15'),

    marginTop: wp('4'),
    paddingHorizontal: wp('4'),
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileAndNameContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerbuttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    height: wp('11'),
    width: wp('11'),
    borderRadius: wp('12'),
    marginRight: wp('4'),
  },
  name: {
    color: 'white',
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.5,
  },
  headerSingleButton: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
  },
  headerSingleButton1: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
    tintColor: "#fff"
  },
  progresscontainer: {
    height: wp('0.8'),
    backgroundColor: 'transparent',
    marginTop: wp('2'),
    marginBottom: wp('3.5'),
    flexDirection: 'row',

  },
  postContainer: {
    height: '72%',
    backgroundColor: 'grey',
  },
  footer: {
    height: wp('12'),
    width: wp('100'),
    position: 'absolute',
    bottom: wp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    justifyContent: 'space-between',
  },
  FooterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: wp('3'),
  },
  footerIcon: {
    height: wp('6.5'),
    width: wp('6.5'),
    resizeMode: 'contain',
    marginRight: wp('2'),
  },
  detailText: {
    color: 'white',
    fontSize: 3.5,
    fontFamily: Fonts.OpenSansRegular,
  },
  singleProgressBar: {
    flex: 1,
    marginHorizontal: wp('0.8'),
  },
  rightPress: {
    height: '100%',
    width: '25%',
    position: 'absolute',
    right: 0,
  },
  leftPress: {
    height: '100%',
    width: '25%',
    position: 'absolute',
    left: 0,
  },
  centerPress: {
    height: '100%',
    width: '50%',
    position: 'absolute',
    left: '25%',

  },
  commentModalHeader: {
    height: wp('16'),
    width: wp('100'),
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    marginBottom: wp('3'),
    justifyContent: 'flex-end',
  },
  ViewModalHeader: {
    height: wp('18'),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5'),
    marginBottom: wp('3'),

    justifyContent: 'space-between',
  },
  commentHeaderAvatar: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    marginRight: wp('2'),
  },
  commentsHeaderName: {
    marginBottom: wp('1.5'),
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#2B2B2B',
    fontSize: 4.5,
  },
  commentTitle: {
    fontFamily: Fonts.SourceSansProRegular,
    color: '#9D9D9D',
    fontSize: 3,
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SendInput: {
    width: wp('90'),
    backgroundColor: '#ECECEC',
    paddingLeft: wp('5'),
    borderWidth: 0,
    borderRadius: wp('10'),
    height: wp('15'),
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
  shareModalIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    tintColor: '#B5B5B5',
  },
  shareHeaderText: {
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 5,
    color: '#B5B5B5',
  },
  eyeContainer: {
    position: 'absolute',
    bottom: wp('3'),
    alignSelf: 'center',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    height: wp('5.5'),
    width: wp('5.5'),
    resizeMode: 'contain',
    tintColor: 'white',
    marginRight: wp('2'),
  },
  vcontent: {
    width: '100%',
    height: '100%',

  }
};
