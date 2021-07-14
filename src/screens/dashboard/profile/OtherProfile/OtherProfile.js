/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ResponsiveText from '../../../../components/ResponsiveText';
import Fonts from '../../../../themes/Fonts';
import OtherFeeds from '../OtherFeeds';
import OtherVideos from '../OtherVideos';
import OtherImages from '../OtherImages';
import { BASE_URL } from '../../../../utils/env';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewMoreText from 'react-native-view-more-text';
import showNotification from '../../../../utils/services'
import { androidHeight, iosH4 } from '../../../../utils/constants';
const Tab = createMaterialTopTabNavigator();

function MyTabs(props) {
  const [activeTab, setActiveTab] = useState('Feeds');

  const DefaultScreen = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          paddingTop: wp('50'),
          alignItems: 'center',
        }}>
        <ActivityIndicator color={'#e6e6e6'} size={'small'} />
      </View>
    );
  };

  return (
    <Tab.Navigator
      removeClippedSubviews={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let Name;
          if (route.name === 'OtherFeeds') {
            Name = 'Feeds';
          } else if (route.name === 'OtherVideos') {
            Name = 'Videos';
          } else if (route.name === 'OtherImages') {
            Name = 'Images';
          }
        },
      })}
      tabBarOptions={{
        showLabel: true,
        showIcon: true,
        activeTintColor: '#000',
        inactiveTintColor: '#AEAEAE',
        labelStyle: {
          fontFamily: Fonts.RobotoBold,
          textTransform: 'capitalize',
          fontSize: wp('3.2'),
          marginVertical: -1,
        },
        style: {
          elevation: 0,
          borderBottomWidth: wp(0.3),
          borderBottomColor: '#E1E1E1',
        },
        indicatorStyle: {
          height: wp('0.8'),
          borderRadius: wp('5'),
          backgroundColor: '#000000',
          width: wp('20'),
          marginLeft: wp('7'),
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../../../assets/icons/block.png')}
              style={[styles.topTabIcon, { tintColor: color }]}
            />
          )
        }}
        listeners={{ focus: () => setActiveTab('Feeds') }}
        name="Feeds"
        component={activeTab === 'Feeds' ? OtherFeeds : DefaultScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../../../assets/icons/video.png')}
              style={[styles.topTabIcon, { tintColor: color }]}
            />
          )
        }}
        listeners={{ focus: () => setActiveTab('Videos') }}
        name="Videos"
        component={activeTab === 'Videos' ? OtherVideos : DefaultScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../../../assets/icons/image_Placeholder.png')}
              style={[styles.topTabIcon, { tintColor: color }]}
            />
          )
        }}
        listeners={{ focus: () => setActiveTab('Images') }}
        name="Images"
        component={activeTab === 'Images' ? OtherImages : DefaultScreen}
      />
    </Tab.Navigator>
  );
}

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentOffsetY: 0,
      internalScrollenable: false,
      following: false,
      userId: '',
      profile: '',
      name: '',
      desc: '',
      refreshvalueotherprofile: 'true',
      count: 0,
      email: '',
      chatId: ''
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      AsyncStorage.removeItem('userInfo');
      this.setdata()
      this.fetch()
    });
  }

  setdata = async () => {
    const { postID } = this.props.route.params;
    try {
      ('refreshvalueotherprofile', this.state.refreshvalueotherprofile)
      await AsyncStorage.setItem('postID', postID,)
    } catch (e) {
      showNotification("danger", e);

    }
  }

  fetch = async () => {
    const { postID } = this.props.route.params;
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'auth/getAllUserProfile/' + postID, {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const Info = json ? json.data : '';
        const chatId = Info.map((item) => item.chatId);
        const profile = Info.map((item) => item.profileImg);
        const name = Info.map((item) => item.userName);
        const email = Info.map((item) => item.email);
        const desc = Info.map((item) => item.description)
        const OtherData = Info.map((item) => item.followData)
        const following = Info.map((item) => item.isUserFollowing)
        const count = OtherData[0].map((item) => item.followTo.length)
        this.setState({ profile: profile, name: name, desc: desc, count: count, email: email[0], following: following[0], chatId: chatId[0] })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  onFollowRequest = () => {
    const { postID } = this.props.route.params
    this.props.onFollow(postID).then(() => this.afterFollow())
  }

  afterFollow = () => {
    this.setState({ following: !this.state.following ? true : false })
  }

  onUnFollowRequest = () => {
    const { postID } = this.props.route.params
    this.props.onUnFollow(postID).then(() => this.afterUnFollow())
  }

  afterUnFollow = () => {
    this.setState({ following: !this.state.following ? true : false })
  }

  renderViewMore = (onPress) => {
    return (
      <Text style={styles.userDescription} onPress={onPress}>View more</Text>
    )
  }
  renderViewLess = (onPress) => {
    return (
      <Text style={styles.userDescription} onPress={onPress}>View less</Text>
    )
  }

  render() {
    const { profile, name, desc, count, email, following, chatId } = this.state;
    const { postID } = this.props.route.params
    return (
      <Container style={{
        flex: 1, paddingVertical: Platform.OS === 'ios' ? iosH4 : androidHeight

      }}
      >
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Storescreen')}
              style={styles.cartIconContainer}>
              <Image
                source={require('../../../../assets/icons/cart.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
            {!this.props.route.params && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Setting')}
                style={styles.settingIconContainer}>
                <Image
                  source={require('../../../../assets/icons/setting.png')}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.userDetailsContainer}>
          <View style={styles.userDetailsSubContainer}>

            {profile == '' ?
              <Image
                source={require('../../../../assets/images/model.jpg')}
                style={styles.profileImage}
              /> :
              <FastImage
                style={styles.profileImage}
                source={{
                  uri: BASE_URL + profile,
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
              />
            }

            <View style={styles.nameContainer}>
              <View style={styles.nameInnerContainer}>
                <ResponsiveText style={styles.nameText}>
                  {name ? name : ''}
                </ResponsiveText>
                <ResponsiveText style={styles.userName}>
                  @{email != undefined ? email.split("@")[0] : ''}
                </ResponsiveText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Fams')}>
                  <ResponsiveText style={styles.famText}>
                    {count}  Fams
                  </ResponsiveText>
                </TouchableOpacity>

              </View>

              <View style={styles.followButtonsContainer}>
                <TouchableOpacity
                  onPress={() => following != true ? this.onFollowRequest() : this.onUnFollowRequest()}
                  style={[
                    styles.followButton,
                    {
                      backgroundColor: following == true
                        ? '#000000'
                        : 'white',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.followButtonText,
                      { color: following == true ? 'white' : '#000000' },
                    ]}>
                    {following == true ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Messages', {
                      postID: postID,
                      profile_image: profile[0],
                      user_name: name[0],
                      chatId: chatId ? chatId : ''
                    })
                  }
                  style={styles.messageButton}>
                  <ResponsiveText style={styles.messageButtonText}>
                    Message
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
              {/* )} */}
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>

            </View>
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={this.renderViewMore}
              renderViewLess={this.renderViewLess}

            >
              <ResponsiveText style={styles.userInfoDescription}>
                {desc ? desc : ''}
              </ResponsiveText>
            </ViewMoreText>

          </View>
        </View>
        <MyTabs />

      </Container>
    );
  }
}

export default OtherProfile;

const styles = {
  header: {
    height: wp('15'),

    justifyContent: 'center',
    paddingHorizontal: wp('2'),
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  headerIcon: {
    height: wp('7.5'),
    width: wp('7.5'),
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  cartIconContainer: { marginRight: wp('2'), padding: wp('2') },
  settingIconContainer: { padding: wp('2') },
  userDetailsContainer: {

    paddingHorizontal: wp('4'),
  },
  userDetailsSubContainer: {

    flexDirection: 'row',
  },
  profileImage: {
    height: wp('20'),
    width: wp('20'),
    borderRadius: wp('20'),
  },
  nameContainer: {
    marginLeft: wp('4'),
    maxHeight: wp('30'),
    maxWidth: wp('65'),
    paddingTop: wp('1'),
  },
  nameText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.3,
    marginRight: wp('2'),
    maxWidth: wp('40'),
  },
  userName: {
    fontSize: 3.5,
    marginRight: wp('2'),
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#767676',

  },
  verifyMark: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',

  },
  nameInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: wp('65'),
  },
  famText: {
    fontSize: 4.3,
    fontFamily: Fonts.SourceSansProSemiBold,

  },
  famText1: {
    fontSize: 4.3,
    fontFamily: Fonts.SourceSansProSemiBold,
    marginLeft: wp('10'),
  },
  descriptionContainer: {

    marginTop: wp('1'),
  },
  userTitle: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 3.1,
  },
  flagIcon: {
    height: wp('3.1'),
    width: wp('3.1'),
    resizeMode: 'contain',
    marginLeft: wp('1.8'),
  },
  userInfoDescription: {
    maxWidth: wp('94'),
    marginTop: wp('2'),
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 3.6,
    marginBottom: wp('4'),
    lineHeight: wp('5'),
    color: '#3A3A3A',
  },
  topTabIcon: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
  },
  followButtonsContainer: {
    marginTop: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',

  },
  followButton: {
    paddingVertical: wp('1'),
    paddingHorizontal: wp('3.5'),
    borderWidth: wp('0.2'),
    borderRadius: wp('5'),
    borderColor: '#000000',
    marginRight: wp('2'),
  },
  followButtonText: {
    color: '#000000',
    fontSize: wp(3),
  },
  messageButton: {
    paddingVertical: wp('1.1'),
    paddingHorizontal: wp('4.5'),
    borderWidth: wp('0.2'),
    borderRadius: wp('5'),
    borderColor: '#AEAEAE',
    marginRight: wp('2'),
  },
  messageButtonText: {
    color: '#AEAEAE',
    fontSize: 3,
  },
};
