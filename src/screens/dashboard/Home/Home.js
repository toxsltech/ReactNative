/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView, Animated,
  FlatList, BackHandler
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputField from '../../../components/InputField';
import Fonts from '../../../themes/Fonts';
import ResponsiveText from '../../../components/ResponsiveText';
import StoryCard from '../../../components/StoryCard';
import PostCard from '../../../components/PostCard';
import PostCardHome from '../../../components/PostCardHome';
import { BASE_URL } from '../../../utils/env';
import { RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SocketManager from '../../../socketManager'
import showNotification from '../../../utils/services'
import { Platform } from 'react-native';
import { androidHeight, iosH3 } from '../../../utils/constants';
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;
    const position = new Animated.ValueXY();

    this.state = {
      selectedToggle: 'Popular',
      postMenu: false,
      profile: '',
      story: [],
      Posts: [],
      isFetching: false,
      Stories: [],
      images: [],
      dataStore: [],
      setCountStatus: false,
      isLiked: {},
      isOptionOpen: false,
      modalVisible: false,
      difference: 'sec',
      isFollowed: false,
      showVideoView: true,
      hideViews: false,
      reason: '',
      emptyReason: false,
      loadingImage: false,
      commentCount: {},
      commentCount1: {},
      Apiresponse: {},
      userId: '',
      profileUser: [],
      NameUser: [],
      idUser: [],
      title: {},
      commentedBY: [],
      viewAllComments: false,
      commentId: [],
      isLive: false,
      following: {},
      condition: {},
      MAINID: '',
      identifiers: [],
      userInfo: {},
      userInfofore: {},
      notifiCount: 0,

    };
  }


  handleRefresh = () => {
    this.setState({ setCountStatus: true })
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    this.setState({ isFetching: true }, async () => {
      await this.props.onGetProfile().then(() => this.afterGetProfile()),
        await this.props.onGetStory().then(() => this.afterGetStory()),
        await this.props.onGetPosts().then(() => this.afterGetPost()),
        await this.fetch()
    });
    this.notification()
  }

  componentDidMount = async () => {
      this.gettoken()

    BackHandler.addEventListener("hardwareBackPress", this.backPressed);
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getSocket()
      this.getData()
      this.getRefresh()
      this.getRefreshStory()
      this.camerarefresh()
      this.notification()
    });
    this.props.onGetProfile().then(() => this.afterGetProfile()),
      this.props.onGetPosts().then(() => this.afterGetPost());
    this.props.onGetStory().then(() => this.afterGetStory());
    return unsubscribe
  }

  getSocket = async () => {
    const MAINID = await AsyncStorage.getItem('MAINID')
    this.setState({ MAINID: MAINID })
    SocketManager.instance.emitConnect({
      senderId: MAINID,
    })

    var data = await AsyncStorage.getItem('userInfo');
    var userInfo = JSON.parse(data);
    this.setState({ userInfo: userInfo })
    const { navigate } = this.props.navigation
    userInfo.data.your_custom_data_key == 'socket' ?
      navigate('Messages', { chatId: userInfo.data.chatId, user_name: userInfo.data.userName, profile_image: userInfo.data.profileImg, USERID: userInfo.data.receiverId, postID: userInfo.data.senderId }) :
      navigate('OtherProfile', { postID: userInfo.data.userId })

  }

  camerarefresh = async () => {
    try {
      await AsyncStorage.setItem('camerarefresh', 'true')
    } catch (e) {
      showNotification("danger", e);

    }
  }

  followindrefresh = async () => {
    try {
      await AsyncStorage.setItem('followindrefresh', 'true')
    } catch (e) {
      showNotification("danger", e);

    }
  }

  getRefresh = async () => {
    try {
      const refreshvaluePosts = await AsyncStorage.getItem('refreshvaluePosts')
      if (refreshvaluePosts == 'true') {
        this.setState({ isFetching: true })
        this.props.onGetPosts().then(() => this.afterGetPost());
        await AsyncStorage.setItem('refreshvaluePosts', 'false')
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  getRefreshStory = async () => {
    try {
      const storyRefresh = await AsyncStorage.getItem('storyRefresh')
      if (storyRefresh == 'true') {
        this.setState({ isFetching: true })
        this.props.onGetStory().then(() => this.afterGetStory());
        await AsyncStorage.setItem('storyRefresh', 'false')
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }
  gettoken = async () => {
    try {
      const invaild = await AsyncStorage.getItem('invaild')
      if (invaild == 'true') {
        this.props.navigation.navigate('Login');
      }
    } catch (e) {
      showNotification("danger", e);
    }
  }
  getData = async () => {
    const { selectedToggle } = this.state

    try {
      const refreshvalueprofile = await AsyncStorage.getItem('refreshvalueprofile')
      if (refreshvalueprofile == 'true') {
        await AsyncStorage.setItem('refreshvalueprofile', 'false')
        this.props.onGetProfile().then(() => this.afterGetProfile());
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const Viewersfollowing = await AsyncStorage.getItem('Viewersfollowing')
      if (Viewersfollowing == 'true') {
        await AsyncStorage.setItem('Viewersfollowing', 'false')
        this.props.onGetPosts().then(() => this.afterGetPost());
      }
    } catch (e) {
      showNotification("danger", e);

    }

    //comments
    try {
      const refreshvalueComment = await AsyncStorage.getItem('refreshvalueComment')
      if (refreshvalueComment == 'true') {
        await AsyncStorage.setItem('refreshvalueComment', 'false')
        this.props.onGetPosts().then(() => this.afterGetPost());
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const refreshvaluefollowershome = await AsyncStorage.getItem('refreshvaluefollowershome')
      if (refreshvaluefollowershome == 'true' && selectedToggle == 'Following') {
        await AsyncStorage.setItem('refreshvaluefollowershome', 'false')
        this.props.onGetFollowersPosts().then(() => this.afterGetFollowersPost());
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const deleteStory = await AsyncStorage.getItem('deleteStory')
      if (deleteStory == 'true') {
        await AsyncStorage.setItem('deleteStory', 'false')
        this.props.onGetStory().then(() => this.afterGetStory());
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }
  hashtag = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'post/hashTagPost/', {
      method: 'POST',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'description': this.state.description,
      })
    })
      .then((response) => response.json())
      .then((json) => {
      }
      )
      .catch(error => {
        showNotification("danger", error.message);
      })
  }

  notification = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'notification/allNotification/', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json ? json.count : ''
        this.setState({ notifiCount: data })
      }
      )
      .catch(error => {
        showNotification("danger", error.message);
      })
  }

  comments = async (id) => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'comment/viewpost/' + id, {
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
      .catch(error => {
        showNotification("danger", error.message);
      })
  }

  open = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'post/getPostsLists', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ Posts: json.data, isFetching: false, });
      }
      )
      .catch(error => {
        showNotification("danger", error.message);
      })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backPressed);
  }

  afterGetStory = async () => {
    const storyData = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    this.setState({ story: storyData, isFetching: false });
  }

  afterGetPost = async () => {
    const postData = this.props.getpostResponse ? this.props.getpostResponse.data : '';
    this.setState({ Posts: postData, isFetching: false });
    try {
      const refreshvalue12 = await AsyncStorage.getItem('refreshvalue12')
      if (refreshvalue12 == 'true') {
        await AsyncStorage.setItem('refreshvalue12', 'false')
        this.props.onGetPosts().then(() => this.afterGetPost());
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  afterGetProfile = async () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    this.setState({ profile: Info.profileImg, userid: Info._id });
    await this.fetch()
    try {
      await AsyncStorage.setItem('USERID', Info._id)
    } catch (e) {
      showNotification("danger", e);

    }
  };

  backPressed = () => {
    if (this.props.navigation.isFocused()) {
      BackHandler.exitApp()
    }
  }

  fetch = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'story/viewuserstory/', {
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
        const condition1 = stories.map((item) => item.isUserFollowing)
        let condition = Object.assign({}, condition1);
        this.setState({ Stories: stories, isFetching: false, condition: condition });
      }
      )
      .catch(err => {
        showNotification("danger", err.message);

      })
  }


  onFollowersPosts = () => {
    this.setState({ selectedToggle: 'Following' })
    this.props.onGetFollowersPosts().then(() => this.afterGetFollowersPost());
  }

  afterGetFollowersPost = async () => {
    const Data = this.props.getallpostResponse ? this.props.getallpostResponse.data : '';
    const postdata = Data.map((item) => item.postData)
    const profileUser = Data.map((item) => item.profileImg)
    const idUser = Data.map((item) => item._id)
    const NameUser = Data.map((item) => item.userName)
    this.setState({ followPost: postdata, isFetching: false, profileUser: profileUser, idUser: idUser, NameUser: NameUser });
  }

  openfollow = () => {
    this.props.onGetFollowersPosts().then(() => this.afterGetFollowersPost());
  }

  render() {
    const { selectedToggle, Posts, story, Stories, followPost } = this.state;
    return (
      <Container style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? iosH3 : androidHeight }}>
        <AppHeader
          left={
            <View style={{
              ...styles.headerprofileImageContainer,
              borderColor: this.state.story.count
                ? '#0089FF'
                : '#F2F2F2',
            }}>
              {this.state.profile ? (
                <Image
                  source={
                    this.state.profile
                      ? { uri: BASE_URL + this.state.profile }
                      : require('../../../assets/images/model.jpg')
                  }
                  style={styles.headerProfileImage}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/model.jpg')}
                  style={styles.headerProfileImage}
                />
              )}
            </View>
          }
          leftPress={() => { this.state.story.count == null ? this.props.navigation.navigate('AddPost') : this.props.navigation.navigate('Story') }}
          body={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}>
              <InputField
                editable={false}
                leftIcon={
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={styles.searchIcon}
                  />
                }
                inputField={styles.searchText}
                containerStyle={styles.headerSearchbar}
                placeholder={'Search'}
              />
            </TouchableOpacity>
          }
          right={
            <View style={styles.header}>
              <TouchableOpacity style={styles.cartIconContainer}
                onPress={() => this.props.navigation.navigate('Newhome')}>
                <Image
                  source={require('../../../assets/icons/cart.png')}
                  style={styles.headerCartIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingIconContainer}
                onPress={() => this.props.navigation.navigate('Notification')}
              >
                <Image
                  source={require('../../../assets/icons/Notification.png')}
                  style={styles.headerNotificationIcon}
                />
                {this.state.notifiCount && this.state.notifiCount != '0' ? (
                  <View style={styles.notificationBadge}>
                    <ResponsiveText
                      style={{
                        fontSize: 2.5,
                        color: '#000',
                        fontFamily: Fonts.OpenSansRegular,

                      }}>
                      {this.state.notifiCount}
                    </ResponsiveText>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          }
        />
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ selectedToggle: 'Popular', })}
            style={[
              styles.toggleItem,
              { borderRightWidth: wp('0.3'), borderRightColor: '#CCCCCC' },
            ]}>
            <Text
              style={[
                styles.toggleItemText,
                {
                  color: selectedToggle == 'Popular' ? '#2c2c2c' : '#767676',
                },
              ]}>
              Popular
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onFollowersPosts()}
            style={styles.toggleItem}>
            <Text
              style={[
                styles.toggleItemText,
                {
                  color: selectedToggle == 'Following' ? '#2c2c2c' : '#767676',
                },
              ]}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isFetching ? null :
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={this.state.isFetching} onRefresh={this.handleRefresh} />
            }

          >
            <View style={styles.storiesContainer}>
              <ResponsiveText style={styles.storyText}>Story </ResponsiveText>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: wp(5.5) }}
                horizontal
                data={Stories}
                bounces={false}
                initialNumToRender={3}
                renderItem={({ item, index }) => {
                  return (
                    <StoryCard
                      postMenu={this.state.postMenu}
                      key={index}
                      profile_image={item.profileImg}
                      user_name={item.userName}
                      post_url={item.story.map((item) => item.storyImg)}
                      navigation={this.props.navigation}
                      postID={item._id}
                      likes={item.countLike}
                      likedBy={item.likedBy}
                      comments={item.countComment}
                      views={item.views}
                      duration={item.duration}
                      following={item.isUserFollowing}
                    />);

                }}
                keyExtractor={(item, index) => `${index}`}
              />
            </View>
            <View style={styles.postCard}>
              {selectedToggle != 'Following' ?
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={Posts}
                  bounces={false}

                  initialNumToRender={3}
                  renderItem={({ item, index }) => {
                    return (
                      <PostCardHome
                        postMenu={this.state.postMenu}
                        key={index}
                        profile_image={item.postedBy.profileImg}
                        user_name={item.postedBy.userName}
                        post_url={item.postImg}
                        isVerified={item.isVerified}
                        time={item.createdAt}
                        likes={item.countLike}
                        likedBy={item.likedBy}
                        comments={item.countComment}
                        description={item.description}
                        post_type={item.type}
                        views={item.viewCount}
                        duration={item.postTime}
                        thumbnail={item.thumbnail ? item.thumbnail : 'https://i.vimeocdn.com/video/585576351_1280x720.jpg'}
                        viewedBy={item.viewedBy}
                        navigation={this.props.navigation}
                        postID={item._id}
                        userId={item.postedBy._id}
                        isLikedByUser={item.isLikedByUser}
                        tag={this.open.bind(this)}
                        following={item.isUserFollowing}
                      />
                    )
                  }
                  }
                  keyExtractor={(item, index) => `${index}`}
                /> :
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={followPost ? followPost : []}
                  bounces={false}

                  renderItem={({ item, index }) => {
                    return (
                      <PostCard
                        postMenu={this.state.postMenu}
                        key={index}
                        profile_image={this.state.profileUser[index]}
                        user_name={this.state.NameUser[index]}
                        post_url={item.postImg}
                        isVerified={item.isVerified}
                        time={item.createdAt}
                        likes={item.countLike}
                        likedBy={item.likedBy}
                        comments={item.countComment}
                        description={item.description}
                        post_type={item.type}
                        views={item.viewCount}
                        duration={item.postTime}
                        isLive={item.isLive}
                        thumbnail={item.thumbnail ? item.thumbnail : 'https://i.vimeocdn.com/video/585576351_1280x720.jpg'}
                        viewedBy={item.viewedBy}
                        navigation={this.props.navigation}
                        postID={item._id}
                        userId={this.state.idUser[index]}
                        isLikedByUser={item.isLikedByUser}
                        tag={this.openfollow.bind(this)}
                        toggle={'true'}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => `${index}`}
                />}
            </View>
          </ScrollView>
        }

      </Container>
    );
  }
}

export default Home;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerProfileImage: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: '#F3F3F3',
  },
  headerprofileImageContainer: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    borderWidth: wp('0.6'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerNotificationIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
    tintColor: '#025960',
  },
  headerCartIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
    tintColor: '#025960',

  },
  headerSearchbar: {
    width: wp('55'),
    height: wp('11.5%'),
    borderRadius: wp('10'),
    marginLeft: wp('-3.5'),
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
  },
  searchIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),
  },
  searchText: {
    fontFamily: Fonts.RobotoBold,
    fontSize: wp('3.5'),
  },

  toggleContainer: {
    height: wp('10'),
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: wp('4'),
  },
  toggleItem: {
    height: wp('9'),
    width: wp('48'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleItemText: {
    fontSize: wp('4'),
    fontFamily: Fonts.SourceSansProSemiBold,
  },
  scrollView: {
    flexGrow: 1,
  },
  storiesContainer: {
    marginBottom: wp('8'),
  },
  storyText: {
    fontSize: 5,
    fontFamily: Fonts.OpenSansRegular,
    marginBottom: wp('2'),
    paddingLeft: wp('5.5'),
  },
  postCard: {

  },
  cameraButton: {
    elevation: 3,
    position: 'absolute',
    bottom: wp('1'),
    right: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    top: wp('5'),
    height: wp('26'),
    width: wp('26'),
    resizeMode: 'contain',
  },
  header: {
    flexDirection: "row"
  },
  cartIconContainer: { padding: wp('2') },
  settingIconContainer: { paddingTop: wp('2') },
  notificationBadge: {
    height: wp('3.5'),
    width: wp('3.5'),
    backgroundColor: '#59EF0E',
    borderRadius: wp('3.5'),
    position: 'absolute',
    right: -5,
    top: 1.5,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center"
  },

};



