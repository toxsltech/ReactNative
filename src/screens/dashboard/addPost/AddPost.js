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
  Platform,
  Modal,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ImagePicker from 'react-native-image-crop-picker';
import ResponsiveText from '../../../components/ResponsiveText';
import Fonts from '../../../themes/Fonts';
import Easing from 'react-native/Libraries/Animated/src/Easing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'

const options = {
  title: 'Select Picture',
  quality: 0.1,
  storageOptions: {
    skipBackup: true,
  },

};
const DESIRED_RATIO = '2:1'
class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScreenFocused: true,
      addStoryModal: false,
      imageUri: null,
      flashMode: 'off ',
      recording: false,
      processing: false,
      videoFormData: '',
      CameraType: 'back',
      seconds: 0,
      showInfoPopup: true,
      profileImg: '',
      takingPic: false,
      postToFeed: true,
      storyToFeed: false,
      usermodal: false,
      usermodaldata: false,

    };
  }

  setSecondsInterval = () => {
    this.intervalHandle = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showInfoPopup: false });
    }, 5000);
    this.focus = this.props.navigation.addListener('focus', () => {
      this.setState({ isScreenfocused: true, });
      this.getcameradata()
    });

    this.blur = this.props.navigation.addListener('blur', () => {
      this.setState({ isScreenfocused: false, recording: false, seconds: 0, usermodaldata: false });
      clearInterval(this.intervalHandle);
    });
  }
  prepareRatio = async () => {
    if (Platform.OS === 'android' && this.camera) {
      const ratios = await this.camera.getSupportedRatiosAsync();
      const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
      this.setState({ ratio });
    }
  }

  getcameradata = async () => {
 
    try {
      const camerarefresh = await AsyncStorage.getItem('camerarefresh')
      if (camerarefresh == 'true') {
        this.setState({ usermodal: true })
      }
    } catch (e) {
      showNotification("danger", e);
    }
  }

  handleShortCapture = async (options, response) => {
    const photoData = await this.camera.takePictureAsync();
    if (photoData) {
      const { uri } = photoData;
      this.setState({ imageUri: uri, showInfoPopup: false });
      if (this.state.postToFeed) {

        ImagePicker.openCropper({
          path: uri,
          width: wp('100'),
          height: wp('65'),
          compressImageQuality: 1,
          cropping: true
        }).then(image => {

          this.props.navigation.navigate('MediaPreview', {
            imageData: image.path,
            postuserstatus: true
          });
        });
      } else {
        this.props.navigation.navigate('MediaPreview', {
          imageData: uri,
          postuserstatus: false
        });
      }
    }
  };

  getImage = () => {
    if (this.state.postToFeed) {
      ImagePicker.openPicker({
        mediaType: "any",
      }).then(image => {
        if (image.mime == "video/mp4") {
          image.size > 31000000 ? alert("can't upload video more then 30MB") : image.duration > 100000 ? alert("Video duration not more then 60sec")
            : this.props.navigation.navigate('MediaPreview', { videoData: image.path, totalTime: image.duration / 1000, postuserstatus: true })
        } else {
          ImagePicker.openCropper({
            path: image.path,
            width: wp('100'),
            height: wp('65'),
            compressImageQuality: 1,
            cropping: true
          }).then(image => {
            this.props.navigation.navigate('MediaPreview', {
              imageData: image.path,
              postuserstatus: true
            });
          })
        }
      })

    } else {
      ImagePicker.openPicker({
        mediaType: "any",
      }).then((video) => {
        if (video.mime == "video/mp4") {
          video.size > 31000000 ? alert("can't upload video more then 30MB") : video.duration > 60000 ? alert("Video duration not more then 30sec")
            : this.props.navigation.navigate('MediaPreview', { videoData: video.path, totalTime: video.duration / 1000, postuserstatus: false })
        } else {
          this.props.navigation.navigate('MediaPreview', {
            imageData: video.path,
            postuserstatus: false
          });
        }
      });
    }
  };

  handleLongCapture = async () => {
    this.setSecondsInterval();
    this.setState({
      recording: true,
    });
    try {
      const options = {
        quality: 0.1,
        videoBitrate: 2097152,
        maxDuration: 62,
      };
      const promise = this.camera.recordAsync(options);
      if (promise) {
        this.setState({ recording: true, showInfoPopup: false });
        const { uri, codec = 'mp4' } = await promise;
        this.setState({ flashMode: 'off' });
        this.setState({ recording: false });
        const type = `video/${codec}`;
        if (this.state.seconds <= 6) {
          this.setState({ seconds: 0, recording: false })
        } else {
          this.setState({ recording: false })
          this.props.navigation.navigate('MediaPreview', { videoData: uri, totalTime: this.state.seconds, postuserstatus: this.state.postToFeed ? true : false });

        }
      }
    } catch (error) {
      showNotification("danger", error.message);
    }
  };

  handleCaptureOut = () => {
    if (this.state.recording == true && this.state.seconds <= 6) {
      alert('Video duration must be more then 6sec')
      this.setState(
        () => {
          clearInterval(this.intervalHandle);
          this.camera.stopRecording();
        },
      )
    }
    else {
      this.setState(
        () => {
          clearInterval(this.intervalHandle);
          this.camera.stopRecording();
        },
      );
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
    this.focus();
    this.blur();
  }


  render() {
    const { recording, showInfoPopup, seconds, postToFeed, storyToFeed } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          onCameraReady={this.prepareRatio}
          ratio={DESIRED_RATIO}
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.CameraType}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={this.state.flashMode}
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
          }}>
          <>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.crossContainer}>
              <Image
                source={require('../../../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => this.getImage()}
              >
                <Image
                  source={require('../../../assets/icons/gallery.png')}
                  style={styles.galleryIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleShortCapture}
                onLongPress={this.handleLongCapture}
                onPressOut={this.handleCaptureOut}

              >
                <>
                  <View style={styles.durationContainer}>
                    {showInfoPopup && (
                      <View style={styles.InfoPopupContainer}>
                        <ResponsiveText style={styles.infoPopupText}>
                          Hold for video, tap for photo
                        </ResponsiveText>
                        <Image
                          source={require('../../../assets/icons/triangle.png')}
                          style={styles.triangle}
                        />
                      </View>
                    )}
                    {seconds > 29 && seconds < 35 && (
                      <View style={styles.splitPopupContainer}>
                        <ResponsiveText style={styles.infoPopupText}>
                          More than 30s video split into pieces
                        </ResponsiveText>
                        <Image
                          source={require('../../../assets/icons/triangle.png')}
                          style={styles.triangle}
                        />
                      </View>
                    )}

                    {recording === true ? (
                      <ResponsiveText style={styles.durationText}>
                        {Math.floor(seconds / 60) < 10
                          ? `0${Math.floor(seconds / 60)}`
                          : Math.floor(seconds / 60)}
                        :
                        {Math.floor(seconds % 60) < 10
                          ? `0${Math.floor(seconds % 60)}`
                          : Math.floor(seconds % 60)}
                        s
                      </ResponsiveText>
                    ) : null}
                  </View>
                  {recording === true ? (
                    <AnimatedCircularProgress
                      ref={ref => (this.circularProgress = ref)}
                      size={wp('25')}
                      width={wp('1.5')}
                      fill={100}
                      tintColor="white"
                      backgroundColor="#242424"
                      padding={10}
                      easing={Easing.linear}
                      duration={60000}
                      rotation={0}

                      onAnimationComplete={this.handleCaptureOut}>
                      {fill => (
                        <View
                          style={{
                            height: wp('12'),
                            width: wp('12'),
                            borderRadius: wp('12'),
                            backgroundColor: '#242424',

                          }}
                        />
                      )}
                    </AnimatedCircularProgress>
                  ) : (
                    <View style={styles.cameraOuterContainer}>
                      <Image
                        source={require('../../../assets/icons/camera.png')}
                        style={{
                          height: wp('10'),
                          width: wp('10'),
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  )}
                </>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState((prev) => ({
                    CameraType:
                      prev.CameraType == 'back' ? 'front' : 'back',
                  }))
                }
                style={styles.SwitchCameraIconConatiner}>
                <Image
                  source={require('../../../assets/icons/switchCamera.png')}
                  style={styles.switchCameraIcon}
                />
              </TouchableOpacity>
            </View>

          </>
        </RNCamera>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.usermodal}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ usermodal: false })
                this.props.navigation.goBack()
              }}
              style={styles.crossContainer}>
              <Image
                source={require('../../../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
            <View style={styles.modalCenterContainer}>
              <View style={styles.modalCenterContainerHeader}>
                <ResponsiveText style={styles.addStoryText}>
                  Select Any one
                </ResponsiveText>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState(prev => ({
                    postToFeed: true,
                    storyToFeed: false,

                  }));
                }}
                style={styles.postToFeedContainer}>
                <View
                  style={[
                    styles.checkbox,
                    { backgroundColor: postToFeed ? '#000000' : 'white' },
                  ]}>
                  {postToFeed && (
                    <Image
                      source={require('../../../assets/icons/tick.png')}
                      style={styles.tickIcon}
                    />
                  )}
                </View>
                <ResponsiveText style={styles.modalInnerContainerText}>
                  {'   '}Add Post
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.setState(prev => ({
                    storyToFeed: true,
                    postToFeed: false,
                  }));
                }}
                style={styles.postToFeedContainer}>
                <View
                  style={[
                    styles.checkbox,
                    { backgroundColor: storyToFeed ? '#000000' : 'white' },
                  ]}>
                  {storyToFeed && (
                    <Image
                      source={require('../../../assets/icons/tick.png')}
                      style={styles.tickIcon}
                    />
                  )}
                </View>
                <ResponsiveText style={styles.modalInnerContainerText}>
                  {'   '}Add Story
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ usermodal: false })}
                style={styles.postButtonContainer}>
                <ResponsiveText style={styles.postText}>Done</ResponsiveText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View >
    );
  }
}

export default AddPost;

const styles = {
  container: {
    flex: 1,

  },
  preview: {
    flex: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    height: wp('30'),
    width: wp('100'),
    position: 'absolute',
    bottom: wp('7'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('10'),
  },
  cross: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
  },
  crossContainer: {
    position: 'absolute',
    top: wp('5'),
    right: wp('5'),
  },
  galleryIcon: {
    height: wp('11'),
    width: wp('11'),
    resizeMode: 'contain',
  },
  durationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: -wp('7'),

  },
  durationText: {
    color: '#ffffff',
    fontFamily: Fonts.RobotoBold,
    fontSize: 4.2,
  },
  InfoPopupContainer: {
    position: 'absolute',
    top: -wp('12'),
    height: wp('11%'),
    width: wp('60'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: wp('2.5'),
  },
  infoPopupText: {
    fontFamily: Fonts.RobotoBold,
    // marginBottom: wp('3'),
    textAlign: 'center',
    width: '85%',
  },
  VideoSplitPopupContainer: {
    position: 'absolute',
    top: -wp('30'),
    height: wp('25'),
    width: wp('65'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cameraOuterContainer: {
    height: wp('22'),
    width: wp('22'),
    borderRadius: wp('22'),
    backgroundColor: 'transparent',
    borderWidth: wp('1.5'),
    borderColor: '#ffce31',
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: wp('12')
  },
  triangle: {
    height: wp('10'),
    width: wp('10'),
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -20,
    tintColor: 'white',
  },
  splitPopupContainer: {
    position: 'absolute',
    top: -wp('18'),
    height: wp('14%'),
    width: wp('60'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: wp('3'),

  },
  switchCameraIcon: {
    height: wp('10'),
    width: wp('12'),
    resizeMode: 'contain',
  },
  SwitchCameraIconConatiner: {
    marginBottom: wp('3.5'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cross: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
  },
  crossContainer: {
    position: 'absolute',
    top: wp('5'),
    right: wp('5'),

  },
  modalCenterContainer: {

    width: '62%',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  postToFeedContainer: {
    height: wp('8'),
    marginTop: wp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('4'),
  },
  checkbox: {
    height: wp('4.5'),
    width: wp('4.5'),
    borderRadius: wp('1'),
    borderWidth: wp('0.4'),
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tickIcon: {
    height: 11,
    width: 11,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  modalCenterContainerHeader: {
    justifyContent: 'center',
    borderBottomWidth: wp(0.3),
    borderBottomColor: '#E9E9E9',
    paddingVertical: wp('4.5'),
    paddingHorizontal: wp('5'),

  },
  addStoryText: {
    fontFamily: Fonts.OpenSansRegular,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10

  },
  postButtonContainer: {
    padding: wp('2'),
    position: 'absolute',
    bottom: 0,
    right: wp('6'),
  },
  postText: {
    color: '#000000',
    fontFamily: Fonts.OpenSansRegular,
  },
};
