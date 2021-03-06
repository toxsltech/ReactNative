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
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import ResponsiveText from './ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../themes/Fonts';
import { BASE_URL } from '../utils/env';
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-swipeable';
import showNotification from '../utils/services'

class NotificationCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {
    const { notificationData } = this.props;
    this.seen(notificationData._id)
  }
  seen = async (id) => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'notification/seenUnseen/' + id, {
      method: 'PUT',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.tag()
      }
      )
      .catch(err => {
        showNotification("danger", err.message);

      });
  }

  Delete = async (id) => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'notification/deleteNotification/' + id, {
      method: 'DELETE',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.tag()
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      });
  }


  renderRightButtons(id) {
    return [
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => this.Delete(id)}>
        <View style={styles.deleteContainer}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      </TouchableOpacity>
      ,
    ];
  }
  render() {
    const { notificationData } = this.props;
    return (
      <>
        {notificationData.notificationType === 'Follow' && (
          <Swipeable
            rightButtons={this.renderRightButtons(notificationData._id)}
            rightButtonWidth={75}>
            <View style={{ flexDirection: 'row', ...styles.cardContainer }}>

              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={require('../assets/images/placeholder.png')}
                    style={styles.placeholderImage}>
                    <Image
                      source={{ uri: BASE_URL + notificationData.sendBy.profileImg }}
                      style={styles.profileImage}
                    />
                  </ImageBackground>
                </View>

              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OtherProfile', { postID: notificationData.sendBy._id })}
                activeOpacity={0.8}
              >
                <View style={styles.innerContainer}>

                  <View style={styles.nameContainer}>
                    <View style={{ flexDirection: 'row' }}>
                      <ResponsiveText style={styles.name}>
                        {notificationData.sendBy.userName.length < 15
                          ? notificationData.sendBy.userName
                          : `${notificationData.sendBy.userName.substring(0, 14)}...`}
                      </ResponsiveText>
                      <ResponsiveText style={styles.action}>
                        {' '}
                        Follows you
                      </ResponsiveText>
                    </View>
                    <ResponsiveText style={styles.lastMessage}>
                      {moment(notificationData.createdAt).calendar()}
                    </ResponsiveText>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Swipeable>
        )}
        {notificationData.notificationType === 'Comment' && (
          <Swipeable
            rightButtons={this.renderRightButtons(notificationData._id)}
            rightButtonWidth={75}>
            <View style={{ flexDirection: 'row', ...styles.cardContainer }}>
              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={require('../assets/images/placeholder.png')}
                    style={styles.placeholderImage}>
                    <Image
                      source={{ uri: BASE_URL + notificationData.sendBy.profileImg }}
                      style={styles.profileImage}
                    />
                  </ImageBackground>
                </View>

              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OtherProfile', { postID: notificationData.sendBy._id })}
                activeOpacity={0.8}
              >
                <View style={styles.innerContainer}>

                  <View style={styles.nameContainer}>
                    <View style={{ flexDirection: 'row' }}>
                      <ResponsiveText style={styles.name}>
                        {notificationData.sendBy.userName.length < 15
                          ? notificationData.sendBy.userName
                          : `${notificationData.sendBy.userName.substring(0, 14)}...`}
                      </ResponsiveText>
                      <ResponsiveText style={styles.action}>
                        {' '}
                        Comment on your post
                      </ResponsiveText>
                    </View>
                    <ResponsiveText style={styles.lastMessage}>
                      {/* {notificationData.time} */}
                      {moment(notificationData.createdAt).calendar()}
                    </ResponsiveText>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          </Swipeable>
        )}
        {notificationData.notificationType === 'SubComment' && (
          <Swipeable
            rightButtons={this.renderRightButtons(notificationData._id)}
            rightButtonWidth={100}>
            <View style={{ flexDirection: 'row', ...styles.cardContainer }}>
              <View>
                <View style={styles.imageContainer}>
                  <ImageBackground
                    source={require('../assets/images/placeholder.png')}
                    style={styles.placeholderImage}>
                    <Image
                      source={{ uri: BASE_URL + notificationData.sendBy.profileImg }}
                      style={styles.profileImage}
                    />
                  </ImageBackground>
                </View>

              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OtherProfile', { postID: notificationData.sendBy._id })}
                activeOpacity={0.8}
              >
                <View style={styles.innerContainer}>
                  <View style={styles.nameContainer}>
                    <View style={{ flexDirection: 'row' }}>
                      <ResponsiveText style={styles.name}>
                        {notificationData.sendBy.userName.length < 15
                          ? notificationData.sendBy.userName
                          : `${notificationData.sendBy.userName.substring(0, 14)}...`}
                      </ResponsiveText>
                      <ResponsiveText style={styles.action}>
                        {' '}
                        SubReply on your comment
                      </ResponsiveText>
                    </View>
                    <ResponsiveText style={styles.lastMessage}>
                      {moment(notificationData.createdAt).calendar()}
                    </ResponsiveText>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Swipeable>
        )}
        {notificationData.notificationType === 'Like' && (
          <Swipeable
            rightButtons={this.renderRightButtons(notificationData._id)}
            rightButtonWidth={75}
          >
            {notificationData.postId ?
              <View style={{ flexDirection: 'row', ...styles.cardContainer }}>
                <View>
                  <View style={styles.imageContainer}>
                    <ImageBackground
                      source={require('../assets/images/placeholder.png')}
                      style={styles.placeholderImage}>
                      <Image
                        source={{ uri: BASE_URL + notificationData.sendBy.profileImg }}
                        style={styles.profileImage}
                      />
                    </ImageBackground>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('OtherProfile', { postID: notificationData.sendBy._id })}
                  activeOpacity={0.8}
                >
                  <View style={styles.innerContainer}>
                    <View style={styles.nameContainer}>
                      <View style={{ flexDirection: 'row' }}>
                        <ResponsiveText style={styles.name}>
                          {notificationData.sendBy.userName.length < 15
                            ? notificationData.sendBy.userName
                            : `${notificationData.sendBy.userName.substring(0, 14)}...`}
                        </ResponsiveText>
                        <ResponsiveText style={styles.action}>
                          Likes your post

                        </ResponsiveText>
                      </View>
                      <ResponsiveText style={styles.lastMessage}>
                        {moment(notificationData.createdAt).calendar()}
                      </ResponsiveText>

                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.headerbuttons}>
                  {notificationData.postId.type == 0 ?
                    <Image source={{ uri: BASE_URL + notificationData.postId.postImg }} style={styles.images} /> :
                    <ImageBackground
                      source={{ uri: BASE_URL + notificationData.postId.thumbnail }}
                      style={styles.postImage12}
                    >
                      <Image
                        source={require('../assets/icons/smallplay.png')}
                        style={styles.postImage11}
                      />
                    </ImageBackground>
                  }
                </View>
              </View>
              : null}
            {/* <View style={styles.headerbuttons}>
              {notificationData.postId.type == 0 ?
                <Image source={{ uri: BASE_URL + notificationData.postId.postImg }} style={styles.images} /> :
                <ImageBackground
                  source={{ uri: BASE_URL + notificationData.postId.thumbnail }}
                  style={styles.postImage12}
                >
                  <Image
                    source={require('../assets/icons/smallplay.png')}
                    style={styles.postImage11}
                  />
                </ImageBackground>
              }
            </View> */}
          </Swipeable>
        )
        }
      </>
    );
  }
}

export default NotificationCard;

const styles = {
  cardContainer: {
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  LikeCardContainer: {
    height: wp('35'),
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    justifyContent: 'center',
  },
  likeInnerContainer: {
    width: '100%',
    height: wp('28'),
    flexDirection: 'row',
  },
  innerContainer: {
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('14'),
    width: wp('14'),
  },
  profileImage: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
  },
  unseenBadge: {
    borderRadius: wp('10'),
    backgroundColor: '#0089FF',
    position: 'absolute',
    right: 0,
    fontSize: 3,
    paddingVertical: wp('0.7'),
    paddingHorizontal: wp('1.5'),
    color: 'white',
    fontFamily: Fonts.OpenSansRegular,
    elevation: 1,
  },
  nameContainer: {
    marginLeft: wp('3'),
    width: wp('70'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  LikenameContainer: {
    marginLeft: wp('3'),
    width: wp('65'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 4.3,
    marginBottom: wp('1.5'),
  },
  action: {
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 4.3,
    marginBottom: wp('1'),
    color: '#8C8C8C',
  },
  lastMessage: {
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 3.1,
    color: '#979797',
  },
  timeContainer: {
    flexGrow: 1,
  },
  time: {
    fontSize: 3,
    marginTop: wp('1'),
    color: '#3A3A3A',
    opacity: 0.5,
  },
  images: {
    height: wp('12'),
    width: wp('11.5'),
    borderRadius: wp('2'),
    marginLeft: wp('5'),
    marginTop: wp('3'),
    backgroundColor: '#BBBBBB',
  },
  moreImages: {
    alignSelf: 'center',
    color: '#ABABAB',
    fontFamily: Fonts.SourceSansProRegular,
    marginLeft: wp('3'),
  },
  headerbuttons: {
    position: 'absolute',
    right: wp(0.5),
  },
  postImage11: {
    resizeMode: 'center',
  },
  postImage12: {
    width: wp('35'),
    justifyContent: 'center',
    alignItems: "center",
    height: wp('12'),
    width: wp('11.5'),
    borderRadius: wp('2'),
    marginLeft: wp('5'),
    marginTop: wp('3'),
    backgroundColor: '#BBBBBB',
  },
  deleteContainer: {
    borderColor: "red",
    borderWidth: 0.5,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    width: 90,
    height: "93%",
    backgroundColor: "#fe386b",
    marginLeft: 30,
    justifyContent: "center",
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff'
  }
};


