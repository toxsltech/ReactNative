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
  FlatList,
  TouchableOpacity,
  Platform, ActivityIndicator, Keyboard, Dimensions, KeyboardAvoidingView, ScrollView
} from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import ResponsiveText from '../../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import InputField from '../../../components/InputField';
import { messages } from '../../../components/DummyData';
import MessageBubble from '../../../components/MessageBubble';
import ImagePicker from 'react-native-image-crop-picker';
import SocketManager from '../../../socketManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOCKET_IO_SERVER } from '../../../config';
import { createThumbnail } from "react-native-create-thumbnail"
import showNotification from '../../../utils/services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
const { width: screenWidth } = Dimensions.get('window');
import { androidHeight, iosH4 } from '../../../utils/constants';


class Messages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chat: messages,
      text: '',
      payload: null,
      data: '',
      messagesData: [],
      profile: '',
      chatId: '',
      history: [],
      isTyping: true,
      onlineStatus: 0,
      seen: '',
      loader: true,
      limit: 12,
      pageNo: 1,
      chatIds: "",
      source: null,
      loading: true,
      thumbnail: [],
      loadingVideoback: false,
      show: true,
      startScroll: true
    };
  }

  componentDidMount = async () => {
    const USERID = await AsyncStorage.getItem('USERID')
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userInfofore');

    const { postID, chatId } = this.props.route.params
    this.setState({ chatId: chatId })
    SocketManager.instance.emitMessagesHistory({
      chatId: this.state.chatId,
      receiverId: postID,


    })
    SocketManager.instance.emitUserOnline({
      senderId: USERID,
      receiverId: postID,
    })

    SocketManager.instance.listenUserOnline((data) => {
      let newObj = {}
      data.chatId && data.chatId == chatId ? newObj = { onlineStatus: data.status, chatIds: data.chatId } : newObj = { onlineStatus: data.status }
      this.setState(newObj)
    });
    this.listenMsg()
    SocketManager.instance.listenMessagesHistory((data) => {

      {
        chatId == data[0].chatId ?
          this.setState(
            {
              loader: false,
              history: data,
            },

          ) :
          this.setState(
            { history: data }

          )

      }
    });
    this.seenMsgs()
    const unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setState({ chatId: '' })
      SocketManager.instance.emitTyping({
        senderId: USERID,
        receiverId: postID,
        isTyping: false
      })

    });
  }


  listenMsg = () => {
    SocketManager.instance.listenMessages((data) => {


      if (!this.state.chatId) {
        this.setState({ chatId: data[0].chatId });
      }
      {
        this.state.chatId == data[0].chatId ? (
          this.setState(
            { history: data },
            () => {
              if (data.length > 7) {
                setTimeout(() => {
                  this.flatList.scrollToEnd({ animated: true });
                }, 50)
              }
            }
          ),
          this.seenMsgs()
        )
          :
          this.setState(
            { history: this.state.history },

          )
      }
    });
  }

  componentWillUnmount = async () => {
    SocketManager.instance.emitMessagesHistory({
      chatId: this.state.chatId,
    })
  }

  seenMsgs = async () => {
    const USERID = await AsyncStorage.getItem('USERID')
    const { postID } = this.props.route.params
    SocketManager.instance.emitSeen({
      senderId: USERID,
      receiverId: postID,
      chatId: this.state.chatId,
    })
  }

  getImage = () => {
    ImagePicker.openPicker({
      mediaType: "any",
      multiple: true
    }).then(async (response) => {
      this.setState({ payload: response, source: response.map((item) => item.mime) })
      {
        let imageThumbnail = [];
        await Promise.all(
          this.state.source.map((item, index) =>
            item == 'video/mp4' ?
              createThumbnail({
                url: this.state.payload[index].path,
                timeStamp: 4000,
              })
                .then(response => {
                  imageThumbnail[index] = response.path;
                  return imageThumbnail;
                })
                .catch(err => console.log({ err }))
              : ""
          ),
        )
        this.setState({ thumbnail: imageThumbnail })
      }
    });
  };

  sendMessage = async () => {
    const { text, payload, thumbnail } = this.state;
    const { postID } = this.props.route.params
    const USERID = await AsyncStorage.getItem('USERID')
    SocketManager.instance.emitTyping({
      senderId: USERID,
      receiverId: postID,
      isTyping: false
    })
    SocketManager.instance.emitUserOnline({
      receiverId: postID,
    })
    if (payload) {
      let formData = new FormData()
      formData.append('senderId', USERID)
      formData.append('receiverId', postID)
      formData.append('message', text);
      payload.forEach((response, i) => {
        if (response.mime != 'video/mp4') {
          formData.append('type', 1)
          formData.append("file", {
            uri: response
              ? Platform.OS === 'android'
                ? response.path
                : response.path.replace('file://', '')
              : null,
            type: "image/jpeg",
            name: response.path !== null ? response.path : response.path,
          })
        } else {
          formData.append('type', 3),
            formData.append("video", {
              uri: response
                ? Platform.OS === 'android'
                  ? response.path
                  : response.path.replace('file://', '')
                : null,
              type: "video/mp4",
              name: response.path !== null ? response.path : response.path,
            })
          formData.append("thumbnail", {
            uri: thumbnail[i]
              ? Platform.OS === 'android'
                ? thumbnail[i]
                : thumbnail[i].replace('file://', '')
              : null,
            type: "image/jpeg",
            name: thumbnail[i] !== null ? thumbnail[i] : thumbnail[i],
          })

        }
      })
      this.setState({ loadingVideoback: true })
      fetch(SOCKET_IO_SERVER + 'socket/fileUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })
        .then((response) => {
          this.setState({ loadingVideoback: false })
          SocketManager.instance.emitMessagesHistory({
            chatId: this.state.chatId,
            receiverId: postID,

          })
        }
        )
        .catch(err => {
          showNotification("danger", err.message);
        })
    } else {
      SocketManager.instance.emitMessages({
        senderId: USERID,
        receiverId: postID,
        type: 0,
        message: text,

      })
    }
    this.setState({
      text: '',
      payload: null,

    })
  }
  getItemLayout(data, index) {
    return { length: data.length, offset: data.length * index, index };
  }
  getItemLayout1(data, index) {
    return { length: 200, offset: 200 * index, index };
  }
  onEndEditing = () => {
    Keyboard.dismiss();
    const { onEndEditing } = this.props;
    onEndEditing();
  };

  onFocus = async () => {
    const USERID = await AsyncStorage.getItem('USERID')
    const { postID } = this.props.route.params;
    SocketManager.instance.emitTyping({
      senderId: USERID,
      receiverId: postID,
      isTyping: true
    })
  }

  actionOnRow = (index) => {
    let datas = this.state.payload
    datas.splice(index, 1);
    this.setState({
      payload: datas
    })
    setTimeout(() => {
      this.setState({ show: true })
    }, 10);
  }

  render() {
    const { history, payload, onlineStatus, chatIds, source } = this.state;
    const { profile_image, user_name } = this.props.route.params;
    return (
      <Container style={{
        flex: 1, paddingVertical: Platform.OS === 'ios' ? iosH4 : androidHeight
      }} >
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
            <View>
              <ResponsiveText style={styles.headertitle}>
                {user_name}
              </ResponsiveText>
              <ResponsiveText style={[styles.headertitle11],
              {
                color: (chatIds && onlineStatus == 2) ? '#0089FF' : onlineStatus == 1 ? '#1e8449' : '',
                fontSize: 3.5,
              }
              }>
                {(chatIds && onlineStatus == 2) ? 'typing ...' : onlineStatus == 1 ? 'online' : ''}
              </ResponsiveText>
            </View>
          }
        />
        <View style={styles.clearFix} />
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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={(ref) => {
              this.scrollView = ref;
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            onContentSizeChange={() => { this.scrollView.scrollToEnd({ animated: false }) }}
            onLayout={() => this.scrollView.scrollToEnd({ animated: false })}
            bounces={false}>
            <FlatList
              ref={(ref) => { this.flatList = ref }}
              data={history}
              bounces={false}
              showsVerticalScrollIndicator={false}

              keyExtractor={(item, index) => `${index}`}

              renderItem={({ item, index }) => {
                return (
                  <MessageBubble
                    sent_by={item.senderId._id}
                    profile_image={profile_image}
                    type={item.type}
                    text={item.message}
                    image_url={item.files}
                    navigation={this.props.navigation}
                    seen={item.isSeen}
                    thumbnail={item.thumbnail}
                  />
                );
              }}

            />
          </ScrollView>

          {payload && (
            <View
              style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: 80,
              }}>
              <View style={{ height: 60, marginLeft: 20 }}>

                {this.state.show ?
                  <FlatList
                    data={payload}
                    horizontal={true}
                    bounces={false}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ marginLeft: 10 }}>
                          <Image
                            source={{ uri: item.path }}
                            style={{ height: 60, width: 60, borderRadius: 5 }}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ show: false })
                              this.actionOnRow(index)
                            }}
                            style={styles.imageCrossContainer}>
                            <Image
                              source={require('../../../assets/icons/cross.png')}
                              style={styles.crossIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  /> : null}
              </View>
            </View>
          )}

          <View style={styles.sendInputContainer}>
            <InputField
              CameraPress={this.getImage}
              CameraIcon={true}
              placeholder={'Write your message here ...'}
              inputField={{ fontSize: wp('3.3') }}
              containerStyle={styles.SendInput}
              value={this.state.text}
              onEndEditing={this.onEndEditing}
              right={
                <View style={styles.sendButton}>
                  <Image
                    source={require('../../../assets/icons/ic_send.png')}
                    style={styles.sendIcon}
                  />
                </View>
              }
              rightPress={
                this.state.text.trim().length > 0 || this.state.payload
                  ? this.sendMessage
                  : null
              }
              rightStyle={{ padding: 0, marginRight: -5 }}
              onChangeText={(e) => {
                this.onFocus()
                this.setState({ text: e })
              }}
            />
          </View>

        </KeyboardAvoidingView>

      </Container >

    );
  }
}

export default Messages;

const styles = {
  header: {},
  leftIconContainer: {
    padding: 7,
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
  headertitle11: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 2.5,
    marginLeft: wp('15')
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
    bottom: 0,
    borderTopWidth: wp('0.3'),
    borderTopColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SendInput: {
    width: wp('91'),
    backgroundColor: '#F2F2F2',
    paddingLeft: wp('4'),
    borderWidth: 0,
    borderRadius: wp('10'),
    height: wp('13'),
    paddingRight: 2,
  },
  sendButton: {
    height: wp('10'),
    width: wp('10'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('10'),
    width: wp('10'),
    resizeMode: 'contain',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: wp('2.2'),
    justifyContent: 'flex-end',
  },
  imageCrossContainer: {
    backgroundColor: '#0089FF',
    position: 'absolute',
    height: 18,
    width: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    right: -1,
    top: -1,
    borderWidth: 1,
    borderColor: 'white',

  },
  crossIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  wrapListMessages: {
    height: '84%',
  },

};

