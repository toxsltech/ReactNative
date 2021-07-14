/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator, Text, KeyboardAvoidingView
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import ResponsiveText from '../../../components/ResponsiveText'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import InputField from '../../../components/InputField';
import CommentsReplyCard from '../../../components/CommentsReplyCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../utils/env'
import FastImage from 'react-native-fast-image';
import showNotification from '../../../utils/services'


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsReply: [],
      replyText: '',
      scrollToBottomY: '',
      replyto: null,
      replyUsername: '',
      profile: [],
      userName: [],
      id: [],
      refreshvalue: 'true',
      MainId: '',
      mainUserName: '',
      userProfile: '',
      subReplies: [],
      reply: [],
      liked: false,
      profilestate: false,
      loadingVideoback: true,
      Email: ''
    };
  }
  componentDidMount = () => {
    this.getData()
    const data = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    const userProfile = data.profileImg
    const mainUserName = data.userName
    const MainId = data._id
    const Email = data.email
    this.setState({ mainUserName: mainUserName, userProfile: userProfile, MainId: MainId, Email: Email });
    this.getComments()
    const unsubscribe = this.props.navigation.addListener('blur', () => {
      this.bluredata()
    });

  }
  bluredata = async () => {
    try {
      await AsyncStorage.setItem('videopageuser', 'false')
      this.setState({ profilestate: false })
    } catch (e) {
      showNotification("danger", e);
    }
  }

  getData = async () => {

    try {
      const videopageuser = await AsyncStorage.getItem('videopageuser')
      if (videopageuser == 'true') {
        this.setState({ profilestate: true })
      }
    } catch (e) {
      showNotification("danger", e);
    }
  }

  setdata = async () => {
    try {
      await AsyncStorage.setItem('refreshvalue', 'true')
      await AsyncStorage.setItem('refreshvalueComment', 'true')
      await AsyncStorage.setItem('refreshvaluefollowershome', 'true')
    } catch (e) {
      showNotification("danger", e);
    }
  }

  open = () => {
    const { postID } = this.props.route.params;
    this.props.getComments(postID).then(() => this.afterComments());
  }

  getComments = () => {
    const { postID } = this.props.route.params;
    this.props.getComments(postID).then(() => this.afterComments());
  }

  afterComments = () => {
    const stories = this.props.commentResponse ? this.props.commentResponse.data : '';
    const data = stories.map((item) => item.commentBy)
    const profile = data.map((item) => item.profileImg);
    const userName = data.map((item) => item.userName);
    const id = data.map((item) => item._id);
    const data1 = stories.map((item) => item.subReplies)
    this.setState({ commentsReply: stories, userName: userName, profile: profile, id: id, subReplies: data1, loadingVideoback: false });
  }

  afterComment = () => {
    this.getComments()
    this.setState({ replyText: '' })
  }

  afterSubComment = () => {
    this.getComments()
  }

  subReply = () => {
    const { commentsReply, replyText, replyto, mainUserName, userProfile, id, liked } = this.state;
    if (replyText.trim().length > 0) {
      let array = commentsReply;
      let subreply = {
        id: array.find((a) => a.id == replyto.id).subReplies.length,
        name: mainUserName,
        avatar: BASE_URL + userProfile,
        username: mainUserName,
        liked: false,
        reply: replyText,
        likes: 0,
      };
      array.find((a) => a._id == replyto._id).subReplies.push(subreply);
      this.setState((prev) => ({
        replyText: '',
        replyto: null,
      }));
      this.setdata()
      const { postID } = this.props.route.params
      this.props.SubComment(postID, replyText, replyto._id).then(() => this.afterSubComment())
    }
  };

  reply = () => {
    const { commentsReply, replyText, MainId, mainUserName, userProfile, subReplies } = this.state;

    if (replyText.trim().length > 0) {
      let array = commentsReply;
      let reply = {
        id: array.length,
        name: mainUserName,
        avatar: userProfile,
        username: mainUserName,
        liked: false,
        reply: replyText,
        likes: 0,
        subReplies: subReplies,
      };
      this.setdata()
      const { postID } = this.props.route.params
      this.props.isComment(postID, replyText).then(() => this.afterComment())
    }
  };

  trackId = (item, subitem) => {
    this.setState({
      replyText: `@${subitem ? subitem.userName : item.commentBy.userName} `,
      replyto: item,
      replyUsername: subitem ? subitem.userName : item.commentBy.userName,
    });
  };


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
    const { commentsReply, replyUsername, replyText, mainUserName, userProfile, Email } = this.state;
    const { desc } = this.props.route.params

    return (


      <Container style={{ flex: 1, paddingTop: 25 }}>

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
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>Comments</ResponsiveText>
          }
        />
        <View style={styles.clearFix} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>

          <ScrollView
            ref={(ref) => {
              this.scrollView = ref;
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.contentContainerStyle}
            onContentSizeChange={() => { this.scrollView.scrollToEnd({ animated: true }) }}
            onLayout={() => this.scrollView.scrollToEnd({ animated: true })}
          >
            <View style={styles.commentHeader}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('userProfile', {
                    notMe: true,
                  })
                }
              >
                {userProfile == '' ?
                  <Image
                    source={require('../../../assets/images/model.jpg')}
                    style={styles.UserImage}
                  /> :
                  <FastImage
                    style={styles.UserImage}
                    source={{
                      uri: BASE_URL + userProfile,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                  />
                }
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('userProfile', {
                    notMe: true,
                  })
                }>
                <ResponsiveText style={styles.name}>{mainUserName}</ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('userProfile', {
                    notMe: true,
                  })
                }

              >
                <ResponsiveText style={styles.userName}>@{Email.split("@")[0]}</ResponsiveText>
              </TouchableOpacity>
            </View>
            {desc ? <ResponsiveText style={styles.commentText}>
              {desc}
            </ResponsiveText> : null}
            <ResponsiveText style={styles.time}></ResponsiveText>
            <FlatList
              contentContainerStyle={{
                paddingTop: wp('4'),
              }}
              bounces={false}
              data={commentsReply}
              renderItem={({ item }) => {
                return (
                  <CommentsReplyCard
                    item={item}
                    id={item.id}
                    name={item.commentBy.userName}
                    avatar={item.commentBy.profileImg}
                    username={item.commentBy.email.split("@")[0]}
                    liked={item.isCommentLikedByUser}
                    reply={item.title}
                    likes={item.likeCount}
                    subReplies={item.subReplies}
                    navigation={this.props.navigation}
                    trackId={(item, subitem) => this.trackId(item, subitem)}
                    tag={this.open.bind(this)}
                    commentid={item.commentBy._id}
                  />
                );
              }}
            />
          </ScrollView>
          {!this.state.profilestate ?
            <View style={{ ...styles.sendInputContainer, paddingBottom: this.state.replyto ? 20 : 0 }}>
              <>
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
                      backgroundColor: 'white'

                    }}>
                    <ResponsiveText>
                      replying to @{replyUsername}
                    </ResponsiveText>
                    <TouchableOpacity

                      onPress={() => this.setState({ replyto: null, replyText: '' })}>
                      <ResponsiveText style={{ color: 'red' }}>cancel</ResponsiveText>
                    </TouchableOpacity>
                  </View>
                )}
                <InputField
                  // CameraIcon={true}
                  value={replyText}
                  placeholder={'Say some thing here ...'}
                  containerStyle={styles.SendInput}
                  right={
                    <View style={styles.sendButton}>
                      <Image
                        source={require('../../../assets/icons/ic_send.png')}
                        style={styles.sendIcon}
                      />
                    </View>
                  }
                  onChangeText={(e) => this.setState({ replyText: e })}
                  rightPress={this.state.replyto ? this.subReply : this.reply}
                  rightStyle={{ padding: 0, marginRight: -5 }}
                />
              </>
            </View>
            : null}
        </KeyboardAvoidingView>

      </Container>



    );
  }
}

export default Comments;

const styles = {
  header: {},
  leftIconContainer: {
    paddingRight: 7,
    paddingVertical: 7,

  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',

  },
  headerNotificationIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
  },
  contentContainerStyle: {
    paddingHorizontal: wp('5.5'),
    paddingTop: wp('5'),
    flexGrow: 1,
  },
  sendInputContainer: {
    height: wp('22'),
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
    height: wp('12.5'),
    paddingRight: 1,

  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('10'),
    width: wp('10'),
    resizeMode: 'contain',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  UserImage: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    marginRight: wp('2'),
  },
  name: {
    color: 'black',
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.5,
    marginRight: wp('2'),
  },
  userName: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4,
    color: '#767676',
    marginRight: wp('2'),
  },
  verificationMark: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  commentText: {
    marginTop: wp('2'),
    // lineHeight: wp('6'),
    fontFamily: Fonts.SourceSansProRegular,
    color: '#828282',
  },
  time: {
    color: '#BDBDBD',
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 3,
    marginVertical: wp('1.5'),
  },
};
