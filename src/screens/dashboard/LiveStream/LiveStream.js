/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  View,
  StatusBar,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Container from '../../../components/Container';
import ResponsiveText from '../../../components/ResponsiveText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../components/Button';
import Fonts from '../../../themes/Fonts';
import InputField from '../../../components/InputField';
import { Comments } from '../../../components/DummyData';
import LiveStreamCommentCard from '../../../components/LiveStreamCommentCard';
import { RNCamera } from 'react-native-camera';
import Share from 'react-native-share';
import { RTMP_SERVER } from '../../../config';

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

class LiveStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: true,
      cameraType: 'front',
      liked: false,
      comments: Comments,
      text: '',
      userName: ''
    };
  }

  componentDidMount() {
    const Info = this.props.getprofileResponse
      ? this.props.getprofileResponse.data
      : '';
    this.setState({ userName: Info.userName });
    this.focus = this.props.navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
    });
    this.blur = this.props.navigation.addListener('blur', () => {
      StatusBar.setHidden(false);
    });
  }

  componentWillUnmount() {
    this.focus();
    this.blur();
  }

  addComment = () => {
    const { text } = this.state;
    let newComment = {
      avatar: 'https://picsum.photos/id/350/100',
      name: 'Haadi Tariq',
      Comment: text,
      time: 'just now',
    };
    if (text.trim().length > 0) {
      this.setState((prev) => ({
        comments: prev.comments.concat(newComment),
        text: '',
      }));
      setTimeout(() => {
        this.listViewRef.scrollToEnd({ animated: true });
      }, 200);
    }
  };


  render() {
    const { liked, comments, text } = this.state;
    const outputUrl = `${RTMP_SERVER}/live/${this.props.getprofileResponse.data.userName}`;
    return (
      <Container style={{ backgroundColor: 'black' }}>

        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={{
            flexGrow: 1,
          }}
          outputUrl={outputUrl}
          type={RNCamera.Constants.Type.front}
          type={this.state.cameraType}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />

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

                <Button
                  text={'End'}
                  containerStyle={styles.endButton}
                  textStyle={styles.endButtonText}
                  onPress={() => {
                    this.setState({ modalOpen: false }, () => {
                      this.props.navigation.navigate('Stream');
                    });
                  }}
                />

                <View>
                  {this.props.route.params.myStream && (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState((prev) => ({
                          cameraType:
                            prev.cameraType == 'back' ? 'front' : 'back',
                        }))
                      }
                      style={styles.SwitchCameraIconConatiner}>
                      <Image
                        source={require('../../../assets/icons/switchCamera.png')}
                        style={styles.switchCameraIcon}
                      />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity style={styles.ViewsContainer}>
                    <Image
                      source={require('../../../assets/icons/eye.png')}
                      style={styles.eyeIcon}
                    />
                    <ResponsiveText style={styles.viewsText}>
                      221
                    </ResponsiveText>
                  </TouchableOpacity>
                  {!this.props.route.params.myStream && (
                    <TouchableOpacity
                      onPress={() => {
                        this.setState((prev) => ({ liked: !prev.liked }));
                      }}
                      style={styles.ViewsContainer}>
                      <Image
                        source={require('../../../assets/icons/heart.png')}
                        style={[
                          styles.eyeIcon,
                          { tintColor: liked ? '#FF0000' : 'white' },
                        ]}
                      />
                      <ResponsiveText style={styles.viewsText}>
                        {liked ? 221 : 220}
                      </ResponsiveText>
                    </TouchableOpacity>
                  )}

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
              <FlatList
                ref={(ref) => {
                  this.listViewRef = ref;
                }}
                style={{ marginBottom: wp('0') }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: wp('6'),
                  paddingTop: wp('2'),
                  flexGrow: 1,
                  justifyContent: 'flex-end',

                }}
                data={comments}
                renderItem={({ item, index }) => {
                  return (
                    <LiveStreamCommentCard
                      key={index}
                      avatar={item.avatar}
                      name={item.name}
                      Comment={item.Comment}
                      navigation={this.props.navigation}
                    />
                  );
                }}
                keyExtractor={(item, index) => `${index}`}
              />

              <View style={styles.sendInputContainer}>
                <InputField

                  placeholder={'Say some thing here ...'}
                  value={text}
                  placeholderTextColor={'#9E9E9E'}
                  containerStyle={styles.SendInput}
                  onChangeText={(e) => this.setState({ text: e })}
                  right={
                    <View style={styles.sendButton}>
                      <Image
                        source={require('../../../assets/icons/ic_send.png')}
                        style={styles.sendIcon}
                      />
                    </View>
                  }

                  rightPress={this.addComment}
                  rightStyle={{ padding: 0, marginRight: -5 }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

export default LiveStream;

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    height: '40%',
    width: wp('100'),
    // backgroundColor: 'grey',
  },
  commentsContainer: {
    height: '60%',
    width: wp('100'),
    // backgroundColor: 'green',
  },
  videoButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('6'),
    paddingTop: wp('10'),
  },
  endButton: {
    height: wp('11'),
    width: wp('25'),
    borderRadius: wp('8'),
    backgroundColor: '#FF0000',
    elevation: 0,
  },
  endButtonText: {
    fontFamily: Fonts.RobotoBold,
  },
  switchCameraIcon: {
    height: wp('10'),
    width: wp('12'),
    resizeMode: 'contain',
  },
  SwitchCameraIconConatiner: {
    marginBottom: wp('3.5'),
  },
  ViewsContainer: {
    width: wp('11.5'),
    paddingVertical: wp('2'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: wp('2'),
    justifySelf: 'center',
    alignItems: 'center',
    marginBottom: wp('4.5'),
  },
  eyeIcon: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    tintColor: 'white',
    marginBottom: wp('0.5'),
  },
  viewsText: {
    color: 'white',
    fontSize: 3.2,
  },
  shareContainer: {
    width: wp('11.5'),
    height: wp('9.5'),
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: wp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    height: wp('4'),
    width: wp('4'),
    resizeMode: 'contain',
  },
  sendInputContainer: {
    height: wp('20'),
    width: wp('100'),
    // position: 'absolute',
    bottom: wp('1.5'),
    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: 'center',
  },
  SendInput: {
    width: wp('88'),
    backgroundColor: 'white',

    paddingLeft: wp('5'),
    borderWidth: 0,
    borderRadius: wp('13'),
    height: wp('12.5'),
    paddingRight: 2,
    // marginBottom: wp('6'),
  },
  sendButton: {
    // height: wp('10'),
    // width: wp('10'),
    // borderRadius: wp('10'),
    // backgroundColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: wp('10'),
    width: wp('10'),
    // tintColor: 'white',
    resizeMode: 'contain',
  },
  crossIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
  },
};
