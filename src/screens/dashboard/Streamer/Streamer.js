/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid, Modal, AppState, TouchableWithoutFeedback, FlatList,
} from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import get from 'lodash/get';
import { LIVE_STATUS, videoConfig, audioConfig } from '../../../utils/constants';
import SocketManager from '../../../socketManager';
import styles from './styles';
import LiveStreamActionButton from './LiveStreamActionButton';
import ChatInputGroup from '../../../components/ChatInputGroup';
import MessagesList from '../../../components/MessagesList';
import FloatingHearts from '../../../components/FloatingHearts';
import FloatingMessages from '../../../components/FloatingMessages';
import { RTMP_SERVER } from '../../../config';
import Logger from '../../../utils/logger';
import ResponsiveText from '../../../components/ResponsiveText';
import { Comments } from '../../../components/DummyData';
import Container from '../../../components/Container';
import Share from 'react-native-share';
import ViewerStreamerCard from '../../../components/ViewerStreamer';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
export default class Streamer extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const roomName = get(route, 'params.roomName');
    const userName = get(route, 'params.userName', '');
    this.state = {
      currentLiveStatus: LIVE_STATUS.PREPARE,
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      modalOpen: true,
      liked: false,
      comments: Comments,
      text: '',
      cameraType: 'front',
      countViewer: 0,
      appState: AppState.currentState,
      joinMessage: '',
      isVisibleJoinMessage: true,
      viewsModal: false,
      followersData: '',
      getAllDetail: '',
      usermodal: false,
      postvideo: false,
      deletevideo: true,
      recording: false,
      show: true
    };
    this.roomName = roomName;
    this.userName = userName;
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    const Info = this.props.getprofileResponse
      ? this.props.getprofileResponse.data
      : '';
    this.setState({ roomName: Info.userName });
    const userName = this.props.getprofileResponse.data.userName;
    this.requestCameraPermission();

    SocketManager.instance.emitPrepareLiveStream({
      userId: this.props.getprofileResponse.data._id,
      roomName: userName ? userName : "Hello",
    });
    SocketManager.instance.emitJoinRoom({
      userId: this.props.getprofileResponse.data._id,
      roomName: userName ? userName : "Hello",
    });

    SocketManager.instance.emitUserLeaveRoom({
      userId: this.props.getprofileResponse.data._id,
      roomName: this.roomName,
    });

    SocketManager.instance.listenLeaveLiveStream((data) => {
      this.setState({ countViewer: data.countViewer, getAllDetail: data.getAllDetail });
    });
    SocketManager.instance.listenBeginLiveStream((data) => {
      const currentLiveStatus = get(data, 'liveStatus', '');
      this.setState({ currentLiveStatus });

    });
    SocketManager.instance.listenJoinLiveStream((data) => {
      this.setState({ countViewer: data.countViewer, joinMessage: data.joinMessage, getAllDetail: data.getAllDetail });
    });

    SocketManager.instance.listenFinishLiveStream((data) => {
      const currentLiveStatus = get(data, 'liveStatus', '');
      this.setState({ currentLiveStatus });
    });
    SocketManager.instance.listenSendHeart((data) => {
      this.setState((prevState) => ({ countHeart: data.countHeart }));
    });
    SocketManager.instance.listenSendMessage((data) => {
      const messages = get(data, 'messages', []);
      this.setState({ messages });
    });

  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    const userName = this.props.getprofileResponse.data.userName;
    const userId = this.props.getprofileResponse.data._id;
    const { currentLiveStatus } = this.state;
    if (nextAppState === 'active') {
      if (currentLiveStatus == 2) {
        Alert.alert(
          'Alert ',
          'Live streaming was ended you need to restart again',
          [
            {
              text: 'Ok',
              onPress: () => {
                this.props.navigation.goBack()
              },
            }
          ],
          { cancelable: false }
        );
      } else {
        this.props.navigation.goBack()
      }
    } else if (nextAppState === 'background') {
      if (Number(currentLiveStatus) === Number(LIVE_STATUS.ON_LIVE)) {
        this.nodeCameraViewRef.stop();
        SocketManager.instance.emitFinishLiveStream({ userName: userId, roomName: userName });
        SocketManager.instance.emitLeaveRoom({ userName: userId, roomName: userName });
      }
    }
  }
  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.props.getprofileResponse.data.userName,
      userId: this.props.getprofileResponse.data._id,
    });
  };

  onPressSend = (message) => {
    if (message != '') {
      SocketManager.instance.emitSendMessage({
        roomName: this.props.getprofileResponse.data.userName,
        userName: this.props.getprofileResponse.data._id,
        message,
      });
      this.setState({ isVisibleMessages: true });
    }

  };

  onEndEditing = () => this.setState({ isVisibleMessages: true });
  onPressClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  onPressLiveStreamButton = async () => {

    const userName = this.props.getprofileResponse.data.userName;
    const userId = this.props.getprofileResponse.data._id;
    const { currentLiveStatus } = this.state;
    if (Number(currentLiveStatus) === Number(LIVE_STATUS.PREPARE)) {

      /**
  * Waiting live stream
  */
      SocketManager.instance.emitBeginLiveStream({ userName, roomName: userName });
      if (this.nodeCameraViewRef) this.nodeCameraViewRef.start();

    } else if (Number(currentLiveStatus) === Number(LIVE_STATUS.ON_LIVE)) {

      /**
       * Finish live stream
       */

      if (this.nodeCameraViewRef) {
        this.nodeCameraViewRef.stop();
        Alert.alert(
          'Alert ',
          'Are you sure  you want to end your live video',
          [
            {
              text: "Cancel",
              onPress: () => this.nodeCameraViewRef.start(),
              style: "cancel"
            },
            {
              text: 'Ok',
              onPress: () => {
                SocketManager.instance.emitFinishLiveStream({ userName: userId, roomName: userName });
                SocketManager.instance.emitLeaveRoom({ userName: userId, roomName: userName });
                // this.setState({ usermodal: true })
                this.props.navigation.navigate('Stream')
              },
            }
          ],
          { cancelable: false }
        );
      }
    }
  };

  usermodalfun = () => {
    if (this.state.postvideo) {
      this.props.navigation.goBack()
    } else {
      this.props.navigation.goBack()
    }
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
          title: 'LiveStreamExample need Camera And Microphone Permission',
          message:
            'LiveStreamExample needs access to your camera so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (this.nodeCameraViewRef) this.nodeCameraViewRef.startPreview();

      } else {
        Logger.log('Camera permission denied');
      }
    } catch (err) {
      Logger.warn(err);
    }
  };

  renderChatGroup = () => {
    return (
      <ChatInputGroup
        onPressHeart={this.onPressHeart}
        onPressSend={this.onPressSend}
        onFocus={this.onFocusChatGroup}
        onEndEditing={this.onEndEditing}
      />
    );
  };

  renderListMessages = () => {
    const { messages, isVisibleMessages } = this.state;
    if (!isVisibleMessages) return null;
    return <MessagesList messages={messages} />;
  };


  setCameraRef = (ref) => {
    this.nodeCameraViewRef = ref;
  };

  _toggleSwitch = () => {
    this.nodeCameraViewRef.switchCamera()
  }

  openViewsModal = () => {
    this.setState({ viewsModal: true });
  };

  closeViewsModal = () => {
    this.setState({ viewsModal: false });
  };

  render() {
    const { currentLiveStatus, countHeart, countViewer, getAllDetail } = this.state;
    const outputUrl = `${RTMP_SERVER}/live/${this.props.getprofileResponse.data.userName}`;

    return (
      <Container style={{ backgroundColor: 'black' }}>
        <NodeCameraView
          style={styles.streamerView}
          ref={this.setCameraRef}
          outputUrl={outputUrl}
          camera={{ cameraId: 1, cameraFrontMirror: true }}
          audio={audioConfig}
          video={videoConfig}
          smoothSkinLevel={3}
          autopreview={true}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalOpen}
          onRequestClose={() => {
            if (currentLiveStatus == 1) {
              alert('Please end your live streaming')
            } else {
              this.setState({ modalOpen: false }, () => {
                this.props.navigation.navigate('Stream');
              });
            }
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.topContainer}>
              <View style={styles.videoButtonsContainer}>
                <LiveStreamActionButton
                  currentLiveStatus={currentLiveStatus}
                  onPress={this.onPressLiveStreamButton}
                />
                <View>
                  <TouchableOpacity
                    onPress={this._toggleSwitch}
                    style={styles.SwitchCameraIconConatiner}>
                    <Image
                      source={require('../../../assets/icons/switchCamera.png')}
                      style={styles.switchCameraIcon}
                    />
                  </TouchableOpacity>
                  <TouchableWithoutFeedback
                    delayPressIn={0}
                    onPressIn={this.pressIn}
                    onPressOut={this.pressOut}
                    style={styles.centerPress}>
                    <View style={styles.centerPress} />
                  </TouchableWithoutFeedback>
                  <TouchableOpacity onPress={this.openViewsModal}
                    style={styles.ViewsContainer}>
                    <Image
                      source={require('../../../assets/icons/eye.png')}
                      style={styles.eyeIcon}
                    />
                    <ResponsiveText style={styles.viewsText}>
                      {countViewer ? countViewer : 0}
                    </ResponsiveText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onPressHeart}
                    style={styles.ViewsContainer}>
                    <Image
                      source={require('../../../assets/icons/heart.png')}
                      style={[
                        styles.eyeIcon,
                        { tintColor: countHeart ? '#FF0000' : 'white' },
                      ]}
                    />
                    <ResponsiveText style={styles.viewsText}>
                      {countHeart ? countHeart : 0}
                    </ResponsiveText>
                    <FloatingHearts count={countHeart} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      Share.open(options)
                        .then((res) => { })
                        .catch((err) => {
                          err && console.log(err);
                        })
                        .finally(() => {
                          this.closeShareModal();
                        });
                    }}
                    style={styles.shareContainer}>
                    <Image
                      source={require('../../../assets/icons/shareWhite.png')}
                      style={styles.shareIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.commentsContainer}>
              <FloatingMessages count={countViewer} />
              {this.renderChatGroup()}
              {this.renderListMessages()}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.viewsModal}
          onRequestClose={this.closeViewsModal}
        >
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeViewsModal}
          >
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
                Viewers  {countViewer ? countViewer : 0}
              </ResponsiveText>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
              }}
              data={getAllDetail}
              renderItem={({ item, index }) => {
                return (
                  <ViewerStreamerCard
                    key={index}
                    profileImg={item.profileImg}
                    userName={item.userName}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.usermodal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalCenterContainer}>
              <View style={styles.modalCenterContainerHeader}>
                <ResponsiveText style={styles.addStoryText}>
                  Live Video Ended
                </ResponsiveText>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState(prev => ({
                      postvideo: true,
                      deletevideo: false
                    }));
                  }}
                  style={styles.postToFeedContainer}>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState(prev => ({
                      postvideo: false,
                      deletevideo: true
                    }));
                  }}
                  style={styles.postToFeedContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      { backgroundColor: this.state.deletevideo ? '#000000' : 'white' },
                    ]}>
                    {this.state.deletevideo && (
                      <Image
                        source={require('../../../assets/icons/tick.png')}
                        style={styles.tickIcon}
                      />
                    )}
                  </View>
                  <ResponsiveText style={styles.modalInnerContainerText}>
                    {'   '}Delete Video
                  </ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.usermodalfun()}
                  style={styles.postButtonContainer}>
                  <ResponsiveText style={styles.postText}>Done</ResponsiveText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

Streamer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  route: PropTypes.shape({}),
};

Streamer.defaultProps = {
  navigation: {
    goBack: null,
  },
  route: null,
};

