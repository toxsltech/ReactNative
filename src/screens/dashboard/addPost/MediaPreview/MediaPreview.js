/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  Animated, ActivityIndicator, FlatList
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen/index';
import ResponsiveText from '../../../../components/ResponsiveText';
import Toast, { DURATION } from 'react-native-easy-toast';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../../../../themes/Fonts';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { createThumbnail } from "react-native-create-thumbnail"
const position = new Animated.ValueXY({ x: 0, y: 0 })
import FollowingCard from '../../../../components/FollowingCard';
import { BASE_URL } from '../../../../utils/env'
import showNotification from '../../../../utils/services'


class MediaPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addStorymodal: false,
      oneDay: false,
      twoDay: false,
      threeDay: true,
      postToFeed: false,
      paused: true,
      title: 'title',
      description: '',
      storyImg: '',
      postImg: '',
      storyVideo: '',
      totalTime: 0,
      thumbnail: '',
      input: false,
      xcoord: 0, ycoord: 0,
      color: false,
      colorcode: 'white',
      scale: 1,
      refreshvalue: 'true',
      storyDay: '',
      postuserstatus: true,
      searchText: '',
      modalVisible: false,
      users: [],
    };
  }

  componentWillMount = () => {
    this.setState({
      storyImg: this.props.route.params.imageData,
      totalTime: this.props.route.params.totalTime
    });

    this.setState({ storyVideo: this.props.route.params.videoData });
    this.setState({ postImg: this.props.route.params.imageData });
    this.setState({ postVideo: this.props.route.params.videoData });
    createThumbnail({
      url: this.props.route.params.videoData,
      timeStamp: 4000,
    })
      .then(response => {
        this.setState({ thumbnail: response.path })
      })
      .catch(err => {
        
      })
  };


  onPostPosts = () => {
    const imgdata = this.state.postImg;
    const videoData = this.state.postVideo;
    const thumbnailData = this.state.thumbnail;
    let file = {
      uri: Platform.OS === 'android' ? imgdata : imgdata,
      type: "image/jpeg",
      name: 'profile',
    }
    let file1 = {
      uri: Platform.OS === 'android' ? videoData : videoData,
      type: "video/mp4",
      name: 'video.mp4',
      postType: 'VIDEO',
    }
    let file2 = {
      uri: Platform.OS === 'android' ? thumbnailData : thumbnailData.replace('file://', ''),
      type: "image/jpeg",
      name: 'thumbnail',
    }
    this.setState({
      addStorymodal: false,
      oneDay: false,
      twoDay: false,
      threeDay: false,
      postToFeed: true,
      loadingVideoback: true
    });
    const { title, description, totalTime, thumbnail } = this.state;
    this.props
      .onAddPosts(title, description.split(" ").toString(), imgdata ? file : '', videoData ? file1 : '', totalTime ? totalTime : "", thumbnailData ? file2 : '')
      .then(() => this.afterAddPosts());
  };

  onPost = () => {
    this.onPostStory()
    this.onPostPosts()
  }

  onPostStory = () => {
    const imgdata = this.state.storyImg;
    const videoData = this.state.storyVideo;
    let file = {
      uri: Platform.OS === 'android' ? imgdata : imgdata,
      type: "image/png",
      name: 'profile.png',
    }
    let file1 = {
      uri: Platform.OS === 'android' ? videoData : videoData,
      type: "video/mp4",
      name: 'video.mp4',
      postType: 'VIDEO',

    }
    setTimeout(() => {
      if (this.state.oneDay) {
        this.setState({ storyDay: 'oneDay' })
      }
      else if (this.state.twoDay) {
        this.setState({ storyDay: 'twoDay' })
      }
      else {
        this.setState({ storyDay: 'threeDay' })
      }
      this.setState({ postToFeed: false, })
      const { title, description, totalTime, xcoord, ycoord, colorcode, scale, storyDay } = this.state;
      this.props
        .onAddStory(title, description, imgdata ? file : '', videoData ? file1 : '', totalTime ? totalTime : "", xcoord, ycoord, colorcode, scale, storyDay)
        .then(() => this.afterAddStory());

      this.setState({
        addStorymodal: false,
        oneDay: false,
        twoDay: false,
        threeDay: true,
        postToFeed: false,
        loadingVideoback: true
      });
    }, 100);
  };

  afterAddStory = () => {
    this.setdata11()
    this.setState({ loadingVideoback: false })
    this.props.navigation.navigate('Home');
  };

  afterAddPosts = () => {
    this.setdata()
    this.setState({ loadingVideoback: false })
    this.props.navigation.navigate('Home');
  };

  componentDidMount() {
    this.focus = this.props.navigation.addListener('focus', () => {
      this.usewrdata()
      StatusBar.setHidden(true);
    });
    this.blur = this.props.navigation.addListener('blur', () => {
    });
  }

  usewrdata = () => {
    const { postuserstatus } = this.props.route.params;
    this.setState({ postuserstatus: postuserstatus })
  }

  setdata = async () => {
    try {
      await AsyncStorage.setItem('refreshvaluePosts', 'true')
      await AsyncStorage.setItem('refreshvalue12', 'true')
      await AsyncStorage.setItem('refreshvalue11', 'true')
    } catch (e) {
      showNotification("danger", e);
    }
  }

  setdata11 = async () => {
    try {
      await AsyncStorage.setItem('storyRefresh', 'true')
    } catch (e) {
      showNotification("danger", e);
    }
  }

  togglePlay = () => {
    this.setState(prev => ({ paused: !prev.paused }));
  };

  componentWillUnmount() {
    this.focus();
    this.blur();
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('inputtext', this.state.description)
    } catch (e) {
      showNotification("danger", e);
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('inputtext')
      if (value !== null) {
        this.setState({ description: value })
      }
    } catch (e) {
      showNotification("danger", e);
    }
  }

  cleardata = async () => {
    await AsyncStorage.clear()
  }

  closeViewsModal = () => {
    this.setState({ modalVisible: false, });
  };

  parentMethod(data) {
    this.setState({ xcoord: data.offsetX, ycoord: data.offsetY, scale: data.scale })
  }

  hashtag = (str) => {
    let str1 = str.slice(str.length - 2, str.length);
    let str2 = str.charAt(0)
    if (str1 == ' #' || str2 == '#') {
      this.setState({ hashtag: str })
    }
  }

  users = async () => {
    var token = await AsyncStorage.getItem('token');
    const { searchText } = this.state
    fetch(BASE_URL + 'auth/users', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json ? json.data : ''
        this.setState({
          users: searchText == 0 ? null :
            data.filter((item) =>
              item.userName.toLowerCase().startsWith(searchText.toLowerCase()),
            ),
          modalVisible: true,
        })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  render() {
    const { imageData, videoData } = this.props.route.params;
    const { oneDay, twoDay, threeDay, postToFeed, users } = this.state;


    return (
      <View style={styles.container}>
        {this.state.loadingVideoback && (
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
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

        {imageData && !this.state.postuserstatus && (

          <ImageBackground source={{ uri: imageData }} style={styles.image}>
            <TouchableOpacity
              onPress={() => this.setState({ color: !this.state.color, })}
              style={styles.colorContainer}
            >
              <Image
                source={require('../../../../assets/icons/color.png')}
                style={styles.headerColorButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ input: !this.state.input })}
              style={styles.inputContainer}
            >
              <Image
                source={require('../../../../assets/icons/inputicon.png')}
                style={styles.headerSingleButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.cleardata()
                this.props.navigation.goBack()
              }}
              style={styles.crossContainer}>
              <Image
                source={require('../../../../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
            {this.state.color ?
              <View style={{
                marginTop: wp('100'), flexDirection: 'row', justifyContent: 'center'
              }}>
                <TouchableOpacity onPress={() => this.setState({ colorcode: 'red', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: 'red', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: 'green', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: 'green', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: 'blue', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: 'blue', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: 'pink', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: 'pink', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: '#7d3c98', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: '#7d3c98', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: '#f4d03f', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: '#f4d03f', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: '#45b39d', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: '#45b39d', }}></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ colorcode: '#4a235a', input: true, color: false })}>
                  <View style={{ ...styles.colorview, backgroundColor: '#4a235a', }}></View>
                </TouchableOpacity>
              </View>
              : null
            }
            {this.state.input ?

              <PinchZoomView
                onRef={ref => (this.parentReference = ref)}
                parentReference={this.parentMethod.bind(this)}
              >
                <Animated.View
                  style={{
                    marginTop: this.state.color ? 0 : wp('70'),
                  }}>
                  <TextInput
                    style={{ color: this.state.colorcode, fontSize: 20, textAlign: 'center', }}
                    autoFocus={true}
                    onChangeText={(input) => {
                      this.setState({ description: input })
                    }}
                    value={this.state.description}
                    onSubmitEditing={() => {
                      this.storeData()
                      setTimeout(() => { this.getData() }, 10);
                    }}
                  />
                </Animated.View>
              </PinchZoomView>
              : null
            }

            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.refs.toast.show('Saved', DURATION.LENGTH_LONG);
                }}
                style={styles.bottomSingleItemContainer}>
                <Image
                  source={require('../../../../assets/icons/download.png')}
                  style={styles.BottomIcon}
                />
                <ResponsiveText style={styles.BottomItemText}>
                  Save
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ addStorymodal: true })}
                style={styles.bottomSingleItemContainer}>
                <Image
                  source={require('../../../../assets/icons/addStory.png')}
                  style={styles.BottomIcon}
                />
                <ResponsiveText style={styles.BottomItemText}>
                  Add story
                </ResponsiveText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
        {imageData && this.state.postuserstatus && (

          <View style={styles.image}>
            {this.state.input ?
              <Animated.View
                style={{
                  marginTop: wp('30'),
                }}>

                <TextInput
                  style={{ color: this.state.colorcode, fontSize: 20, textAlign: 'center', }}
                  autoFocus={true}
                  onChangeText={(input) => {
                    this.hashtag(input),

                      this.setState({ description: input })
                  }}
                  value={this.state.description}
                  onSubmitEditing={() => {
                    this.storeData()
                    setTimeout(() => { this.getData() }, 10);
                  }}
                />
              </Animated.View>
              : null
            }
            <Image source={{ uri: imageData }} style={{
              width: wp('100'),
              height: wp('65'), marginTop: this.state.input ? wp('10') : wp('60')
            }} />
            <TouchableOpacity
              onPress={() => this.setState({ input: !this.state.input })}
              style={styles.inputContainer}
            >
              <Image
                source={require('../../../../assets/icons/inputicon.png')}
                style={styles.headerSingleButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.cleardata()
                this.props.navigation.goBack()
              }}
              style={styles.crossContainer}>

              <Image
                source={require('../../../../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>

            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.refs.toast.show('Saved', DURATION.LENGTH_LONG);
                }}
                style={styles.bottomSingleItemContainer}>
                <Image
                  source={require('../../../../assets/icons/download.png')}
                  style={styles.BottomIcon}
                />
                <ResponsiveText style={styles.BottomItemText}>
                  Save
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ addStorymodal: true })}
                style={styles.bottomSingleItemContainer}>
                <Image
                  source={require('../../../../assets/icons/addStory.png')}
                  style={styles.BottomIcon}
                />
                <ResponsiveText style={styles.BottomItemText}>
                  Add post
                </ResponsiveText>
              </TouchableOpacity>
            </View>

          </View>
        )}
        {videoData && (
          <>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this.togglePlay}
                style={{
                  height: '85%',
                  width: '100%',
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  zIndex: 10,
                }}
              >
                {this.state.color ?
                  <View style={{
                    marginTop: wp('100'), flexDirection: 'row', justifyContent: 'center'
                  }}>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: 'red', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: 'red', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: 'green', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: 'green', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: 'blue', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: 'blue', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: 'pink', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: 'pink', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: '#7d3c98', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: '#7d3c98', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: '#f4d03f', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: '#f4d03f', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: '#45b39d', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: '#45b39d', }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ colorcode: '#4a235a', input: true, color: false })}>
                      <View style={{ ...styles.colorview, backgroundColor: '#4a235a', }}></View>
                    </TouchableOpacity>
                  </View>
                  : null
                }
                {this.state.input ?
                  <PinchZoomView
                    onRef={ref => (this.parentReference = ref)}
                    parentReference={this.parentMethod.bind(this)}
                  >
                    <Animated.View
                      style={{
                        marginTop: this.state.color ? 0 : wp('80'),
                      }}>
                      <TextInput
                        style={{ color: this.state.colorcode, fontSize: 20, textAlign: 'center', }}
                        autoFocus={true}
                        onChangeText={(input) => this.setState({ description: input })}
                        value={this.state.description}
                        onSubmitEditing={() => {
                          this.storeData()
                          setTimeout(() => { this.getData() }, 10);
                        }}
                      />
                    </Animated.View>
                  </PinchZoomView>
                  : null
                }
              </TouchableOpacity>
              {this.state.paused && (
                <Image
                  source={require('../../../../assets/icons/play.png')}
                  style={styles.playIcon}
                />
              )}
              <Video
                source={{
                  uri: videoData,
                }}
                fullscreen={true}
                paused={this.state.paused}
                ref={ref => {
                  this.Player = ref;
                }}
                autoPlay={false}
                resizeMode={
                  this.state.orientaion === 'portrait' ? 'cover' : 'contain'
                }
                onEnd={() => this.setState({ paused: true })}
                playWhenInactive={false}
                playInBackground={false}
                ignoreSilentSwitch={'ignore'}
                onLoad={video => {
                  this.setState({ orientaion: video.naturalSize.orientation });
                  this.Player.seek(0.1);
                }}
                style={{
                  flexGrow: 1,
                }}

              />
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ color: !this.state.color, })}
              style={styles.colorContainer}
            >
              <Image
                source={require('../../../../assets/icons/color.png')}
                style={styles.headerColorButton}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ input: !this.state.input })}
              style={styles.inputContainer}
            >
              <Image
                source={require('../../../../assets/icons/inputicon.png')}
                style={styles.headerSingleButton}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.crossContainer}>
              <Image
                source={require('../../../../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.refs.toast.show('Saved', DURATION.LENGTH_LONG);
                }}
                style={styles.bottomSingleItemContainer}>
                <Image
                  source={require('../../../../assets/icons/download.png')}
                  style={styles.BottomIcon}
                />
                <ResponsiveText style={styles.BottomItemText}>
                  Save
                </ResponsiveText>
              </TouchableOpacity>
              {!this.state.postuserstatus ?
                <TouchableOpacity
                  onPress={() => this.setState({ addStorymodal: true, postuserstatus: false })}
                  style={styles.bottomSingleItemContainer}>
                  <Image
                    source={require('../../../../assets/icons/addStory.png')}
                    style={styles.BottomIcon}
                  />
                  <ResponsiveText style={styles.BottomItemText}>
                    Add story
                  </ResponsiveText>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={() => this.setState({ addStorymodal: true, postuserstatus: true })}
                  style={styles.bottomSingleItemContainer}>
                  <Image
                    source={require('../../../../assets/icons/addStory.png')}
                    style={styles.BottomIcon}
                  />
                  <ResponsiveText style={styles.BottomItemText}>
                    Add Post
                  </ResponsiveText>
                </TouchableOpacity>
              }
            </View>
          </>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.addStorymodal}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ addStorymodal: false })}
              style={styles.crossContainer}>
              <Image
                source={require('../../../../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
            <View style={styles.modalCenterContainer}>
              <View style={styles.modalCenterContainerHeader}>
                {this.state.postuserstatus ?
                  <ResponsiveText style={styles.addStoryText}>
                    Add Post
                  </ResponsiveText>
                  :
                  <ResponsiveText style={styles.addStoryText}>
                    Add Story
                  </ResponsiveText>}
              </View>
              <View style={styles.modalCenterContainerContent}>
                {!this.state.postuserstatus ?
                  <View>
                    <ResponsiveText style={styles.modalInnerContainerText}>
                      Stories Live for
                    </ResponsiveText>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({
                          oneDay: true,
                          twoDay: false,
                          threeDay: false,
                        });
                      }}
                      style={[styles.checkItemContainer, { marginTop: wp('2') }]}>
                      <View
                        style={[
                          styles.checkCircle,
                          { backgroundColor: oneDay ? '#000000' : '#EFEFEF' },
                        ]}
                      />
                      <ResponsiveText style={styles.modalInnerContainerText}>
                        {'   '}1 day
                      </ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({
                          oneDay: false,
                          twoDay: true,
                          threeDay: false,
                        });
                      }}
                      style={styles.checkItemContainer}>
                      <View
                        style={[
                          styles.checkCircle,
                          { backgroundColor: twoDay ? '#000000' : '#EFEFEF' },
                        ]}
                      />
                      <ResponsiveText style={styles.modalInnerContainerText}>
                        {'   '}2 day
                      </ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({
                          oneDay: false,
                          twoDay: false,
                          threeDay: true,
                        });
                      }}
                      style={styles.checkItemContainer}>
                      <View
                        style={[
                          styles.checkCircle,
                          { backgroundColor: threeDay ? '#000000' : '#EFEFEF' },
                        ]}
                      />
                      <ResponsiveText style={styles.modalInnerContainerText}>
                        {'   '}3 day (Set as default)
                      </ResponsiveText>
                    </TouchableOpacity>
                  </View>
                  :
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.setState(prev => ({
                        postToFeed: !prev.postToFeed,
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
                          source={require('../../../../assets/icons/tick.png')}
                          style={styles.tickIcon}
                        />
                      )}
                    </View>
                    <ResponsiveText style={styles.modalInnerContainerText}>
                      {'   '}Post to feeds
                    </ResponsiveText>
                  </TouchableOpacity>
                }
              </View>
              {this.state.postuserstatus ?

                <TouchableOpacity
                  onPress={this.onPostPosts}
                  style={styles.postButtonContainer}>
                  <ResponsiveText style={styles.postText}>Post</ResponsiveText>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  onPress={this.onPostStory}
                  style={styles.postButtonContainer}>
                  <ResponsiveText style={styles.postText}>Post</ResponsiveText>
                </TouchableOpacity>
              }
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.closeViewsModal}
        >
          <TouchableWithoutFeedback
            delayPressIn={0}
            onPressIn={this.closeViewsModal}>
            <View
              style={{
                height: hp('25'),
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              height: hp('45'),
              width: '100%',
              backgroundColor: 'white',
              borderTopLeftRadius: wp('4'),
              borderTopRightRadius: wp('4'),
              marginTop: wp('10'),

            }}>
            <View style={styles.ViewModalHeader}>
              <ResponsiveText style={styles.shareHeaderText}>
              </ResponsiveText>
              <Image
                style={styles.shareModalIcon}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: wp('5.5'),
                paddingTop: wp('4'),
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: wp('55'),
                    }}>
                    <ResponsiveText style={{ color: 'grey' }}>
                      No Result found !
                    </ResponsiveText>
                  </View>
                );
              }}
              data={users}
              renderItem={({ item, index }) => {
                return (
                  <FollowingCard
                    key={index}
                    profile_image={item.profileImg}
                    user_name={item.userName}
                    id={item._id}
                    following={item.isUserFollowing}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </Modal>
        <Toast
          ref="toast"
          style={{
            backgroundColor: '#0CC208',
            width: '100%',
            borderRadius: 0,
            height: 45,
            justifyContent: 'center',
          }}
          position="top"
          positionValue={0}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'white', fontFamily: Fonts.OpenSansRegular }}
        />
      </View>
    );
  }
}

export default MediaPreview;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
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
    zIndex: 20,
  },
  inputContainer: {
    position: 'absolute',
    top: wp('5'),
    right: wp('15'),
    zIndex: 20,
  },
  colorContainer: {
    position: 'absolute',
    top: wp('5'),
    right: wp('25'),
    zIndex: 20,
  },
  headerColorButton: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',

  },
  headerSingleButton: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
    tintColor: 'white'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: wp('6'),
    width: wp('100'),
    height: wp('17'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('6'),
  },
  BottomIcon: {
    height: wp('6.5'),
    width: wp('6.5'),
    resizeMode: 'contain',
    marginBottom: wp('2'),
  },
  bottomSingleItemContainer: {
    alignItems: 'center',
    marginRight: wp('6'),
  },
  BottomItemText: {
    color: 'white',
    fontFamily: Fonts.RobotoBold,
    fontSize: 3.7,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCenterContainer: {
    width: '62%',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 30,
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
  modalCenterContainerContent: {
    paddingHorizontal: wp('5'),
    paddingVertical: wp('4.5'),
  },
  modalInnerContainerText: {
    fontSize: 3.3,
    fontFamily: Fonts.OpenSansRegular,
  },
  checkItemContainer: {
    height: wp('8'),
    marginHorizontal: wp('4'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  postToFeedContainer: {
    height: wp('8'),
    marginTop: wp('3'),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('4'),
  },
  checkCircle: {
    height: wp('5'),
    width: wp('5'),
    borderRadius: wp('5'),
    borderWidth: wp('0.8'),
    borderColor: '#EFEFEF',
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
  postButtonContainer: {
    padding: wp('2'),
    position: 'absolute',
    bottom: 10,
    right: wp('6'),
  },
  postText: {
    color: '#000000',
    fontFamily: Fonts.OpenSansRegular,
  },
  tickIcon: {
    height: 11,
    width: 11,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  playIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    position: 'absolute',
    top: '45%',

    left: '43%',
    right: 0,
    zIndex: 1,
    alignSelf: 'center',
  },
  colorview: {
    borderRadius: 20,
    height: 30,
    width: 30,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: 'white'
  },
  ViewModalHeader: {
    height: wp('18'),
    // width: wp('100'),
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5'),
    marginBottom: wp('3'),

    justifyContent: 'space-between',
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
};






