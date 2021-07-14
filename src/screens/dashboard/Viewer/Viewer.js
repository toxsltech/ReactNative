/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Text, SafeAreaView, Animated, Modal, TouchableWithoutFeedback, FlatList, Alert } from 'react-native';
import get from 'lodash/get';
import { NodePlayerView } from 'react-native-nodemediaclient';
import moment from 'moment';
import SocketManager from '../../../socketManager';
import styles from './styles';
import FloatingHearts from '../../../components/FloatingHearts';
import ChatInputGroup from '../../../components/ChatInputGroup';
import MessagesList from '../../../components/MessagesList';
import { LIVE_STATUS } from '../../../utils/constants';
import { RTMP_SERVER } from '../../../config';
import { Comments } from '../../../components/DummyData';
import ResponsiveText from '../../../components/ResponsiveText';
import Share from 'react-native-share';
import Container from '../../../components/Container';
import FloatingMessages from '../../../components/FloatingMessages';
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
  message: 'Please check the link for live streaming',

  default: {
    title,
    subject: title,
    message: `${message}`,

  },
};

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.Animation = new Animated.Value(0);
    const { route } = props;
    const data = get(route, 'params.data');
    const roomName = get(data, 'roomName');
    const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
    const userName = get(route, 'params.userName', '');
    this.state = {
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
      liked: false,
      comments: Comments,
      text: '',
      cameraType: 'front',
      countViewer: 0,
      joinMessage: '',
      getAllDetail: '',
      viewsModal: false,
    };
    this.roomName = roomName;
    this.userName = userName;
    this.liveStatus = liveStatus;
    this.timeout = null;
  }

  componentDidMount() {
    const userName = this.props.getprofileResponse.data.userName;

    /**
     * Just for replay
     */

    if (this.liveStatus === LIVE_STATUS.FINISH) {

      SocketManager.instance.emitReplay({
        userName: userName ? userName : "Hello",
        roomName: this.roomName,
      });
      SocketManager.instance.listenReplay((data) => {
        const { beginAt, messages } = data;
        const start = moment(beginAt);
        for (let i = 0; i < messages.length; i += 1) {
          ((j, that) => {
            const end = moment(messages[j].createdAt);
            const duration = end.diff(start);
            setTimeout(() => {
              that.setState((prevState) => ({ messages: [...prevState.messages, messages[j]] }));
            }, duration);
          })(i, this);
        }
      });
      const inputUrl = `${RTMP_SERVER}/live/${this.roomName}/replayFor${userName}`;
      this.setState({ inputUrl });
    } else {
      this.setState({
        inputUrl: `${RTMP_SERVER}/live/${this.roomName}`,
        messages: this.messages,
      });

      SocketManager.instance.emitJoinRoom({
        userId: this.props.getprofileResponse.data._id,
        roomName: this.roomName,
      });
      SocketManager.instance.emitJoinsRoom({
        userId: this.props.getprofileResponse.data._id,
        roomName: this.roomName,
      });

      SocketManager.instance.listenJoinLiveStream((data) => {
        this.setState({ countViewer: data.countViewer, joinMessage: data.joinMessage, getAllDetail: data.getAllDetail });
      });
      SocketManager.instance.listenLeaveLiveStream((data) => {

        this.setState({ countViewer: data.countViewer, getAllDetail: data.getAllDetail });
      });
      SocketManager.instance.listenSendHeart((data) => {
        this.setState((prevState) => ({ countHeart: data.countHeart }));
      });
      SocketManager.instance.listenSendMessage((data) => {
        const messages = get(data, 'messages', []);
        this.setState({ messages });
      });
      SocketManager.instance.listenFinishLiveStream(() => {
        alert('Live Stream Ended')
        this.props.navigation.navigate('Stream')
      });

    }
  }

  componentWillUnmount() {
    const userName = this.props.getprofileResponse.data.userName;
    const userId = this.props.getprofileResponse.data._id;
    if (this.nodePlayerView) this.nodePlayerView.stop();
    SocketManager.instance.emitUserLeaveRoom({
      userId: this.props.getprofileResponse.data._id,
      roomName: this.roomName,
    });
    SocketManager.instance.emitLeaveRoom({
      userId: this.props.getprofileResponse.data._id,
      roomName: this.roomName,
    });
    this.setState({
      messages: [],
      countHeart: 0,
      isVisibleMessages: true,
      inputUrl: null,
    });
    clearTimeout(this.timeout);
  }
  startBackgroundAnimation = () => {
    this.Animation.setValue(0);
    Animated.timing(this.Animation, {
      toValue: 1,
      duration: 15000,
      useNativeDriver: false,
    }).start(() => {
      this.startBackgroundAnimation();
    });
  };

  onPressHeart = () => {
    SocketManager.instance.emitSendHeart({
      roomName: this.roomName,
      userId: this.props.getprofileResponse.data._id,
    });
  };

  onPressSend = (message) => {
    if (message != '') {
      SocketManager.instance.emitSendMessage({
        roomName: this.roomName,
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

  renderBackgroundColors = () => {
    const backgroundColor = this.Animation.interpolate({
      inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
      outputRange: ['#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f1c40f', '#1abc9c'],
    });
    if (this.liveStatus === LIVE_STATUS.FINISH) return null;
    return (
      <Animated.View style={[styles.backgroundContainer, { backgroundColor }]}>
        <SafeAreaView style={styles.wrapperCenterTitle}>
          <Text style={styles.titleText}>
            Stay here and wait until start live stream you will get 30% discount
          </Text>
        </SafeAreaView>
      </Animated.View>
    );
  };

  renderNodePlayerView = () => {
    const { inputUrl } = this.state;
    if (!inputUrl) return null;
    return (
      <NodePlayerView
        style={styles.playerView}
        ref={(vb) => {
          this.nodePlayerView = vb;
        }}
        inputUrl={inputUrl}
        scaleMode="ScaleAspectFit"
        bufferTime={300}
        maxBufferTime={1000}
        autoplay
      />

    );
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
  openViewsModal = () => {
    this.setState({ viewsModal: true });
  };

  closeViewsModal = () => {
    this.setState({ viewsModal: false });
  };
  render() {
    const { countHeart, countViewer, getAllDetail } = this.state;
    /**
     * Replay mode
     */
    if (this.liveStatus === LIVE_STATUS.FINISH) {
      return (
        <View style={styles.blackContainer}>
          {this.renderNodePlayerView()}
          {this.renderListMessages()}
          <TouchableOpacity style={styles.btnClose} onPress={this.onPressClose}>
            <Image
              style={styles.icoClose}
              source={require('../../../assets/icons/cross.png')}
              tintColor="white"
            />
          </TouchableOpacity>
          <FloatingHearts count={countHeart} />
        </View>
      );
    }
    /**
     * Viewer mode
     */
    return (

      <Container style={{ backgroundColor: 'black' }}>
        {this.renderNodePlayerView()}

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalOpen}
          onRequestClose={() => {
            this.setState({ modalOpen: false }, () => {
              this.props.navigation.navigate('Stream');
            });
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.topContainer}>
              <View style={styles.videoButtonsContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ modalOpen: false }, () => {
                      this.props.navigation.goBack();
                    });
                  }}>
                  <Image
                    source={require('../../../assets/icons/cross.png')}
                    style={styles.crossIcon}
                  />
                </TouchableOpacity>
                <View>

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
      </Container>
    );
  }
}

Viewer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  route: PropTypes.shape({}),
};

Viewer.defaultProps = {
  navigation: {
    goBack: () => null,
  },
  route: {},
};
