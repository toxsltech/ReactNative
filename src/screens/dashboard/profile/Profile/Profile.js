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
  ActivityIndicator, StatusBar
} from 'react-native';
import Container from '../../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ResponsiveText from '../../../../components/ResponsiveText';
import Fonts from '../../../../themes/Fonts';
import Feeds from '../Feeds';
import Videos from '../Videos';
import Images from '../Images';
import { BASE_URL } from '../../../../utils/env';
import ViewMoreText from 'react-native-view-more-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../../utils/services'
import { androidH4, iosH4 } from '../../../../utils/constants';
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

          if (route.name === 'Feeds') {
            Name = 'Feeds';
          } else if (route.name === 'Videos') {
            Name = 'Videos';
          } else if (route.name === 'Images') {
            Name = 'Images';
          }
          if (Name == 'Feeds') {
            return (
              <Image
                source={require('../../../../assets/icons/block.png')}
                style={[styles.topTabIcon, { tintColor: color }]}
              />
            );
          }
          if (Name == 'Videos') {
            return (
              <Image
                source={require('../../../../assets/icons/video.png')}
                style={[styles.topTabIcon, { tintColor: color }]}
              />
            );
          }
          if (Name == 'Images') {
            return (
              <Image
                source={require('../../../../assets/icons/image_Placeholder.png')}
                style={[styles.topTabIcon, { tintColor: color }]}
              />
            );
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
        listeners={{ focus: () => setActiveTab('Feeds') }}
        name="Feeds"
        component={activeTab === 'Feeds' ? Feeds : DefaultScreen}
      />
      <Tab.Screen
        listeners={{ focus: () => setActiveTab('Videos') }}
        name="Videos"
        component={activeTab === 'Videos' ? Videos : DefaultScreen}
      />
      <Tab.Screen
        listeners={{ focus: () => setActiveTab('Images') }}
        name="Images"
        component={activeTab === 'Images' ? Images : DefaultScreen}
      />
    </Tab.Navigator>
  );
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentOffsetY: 0,
      internalScrollenable: false,
      followed: false,
      refreshvalueotherprofile: 'false',
      count: [],
      postCount: 0,
      seller: false
    };
  }

  componentDidMount = () => {
    const subscribe = this.props.navigation.addListener('focus', () => {
      this.setdata()
      this.getfollowindrefresh()
      this.props.onGetProfile().then(() => this.afterGetProfile())

    });
    this.props.onGetProfile().then(() => this.afterGetProfile())
    this.props.onGetFeeds().then(() => this.afterGetFeed());

  }

  afterGetFeed = () => {
    const postData = this.props.getfeedResponse ? this.props.getfeedResponse.data : '';
    this.setState({ postCount: postData.length })
  }

  afterGetProfile = async () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    const seller = Info.isSeller
    const follows = Info.follows;
    const count = follows.map((item) => item.followTo.length)
    this.setState({ count: count, seller: seller })
  };

  getfollowindrefresh = async () => {

    try {
      const followindrefresh = await AsyncStorage.getItem('followindrefresh')
      if (followindrefresh == 'true') {
        await AsyncStorage.setItem('followindrefresh', 'false')
        this.props.onGetProfile().then(() => this.afterGetProfile());
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  setdata = async () => {
    try {
      await AsyncStorage.setItem('refreshvalueotherprofile', this.state.refreshvalueotherprofile)
    } catch (e) {
      showNotification("danger", e);
    }
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
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    return (
      <Container style={{
        flex: 1, paddingVertical: Platform.OS === 'ios' ? iosH4 : androidH4
      }}
      >

        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            {this.state.seller == true ?
              <TouchableOpacity style={styles.cartIconContainer}
                onPress={() => this.props.navigation.navigate('Storescreen', { sellerId: Info ? Info._id : '' })}>
                <Image
                  source={require('../../../../assets/icons/ic_profileselected.png')}
                  style={styles.headerIcon1}
                />
              </TouchableOpacity>
              : null}
            {!this.props.route.params && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Setting', { statusofpage: 'profile' })}
                style={styles.settingIconContainer}>
                <Image
                  source={require('../../../../assets/icons/setting.png')}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {Info ?
          <View style={styles.userDetailsContainer}>
            <View style={styles.userDetailsSubContainer}>
              {Info.profileImg ? (
                <Image
                  source={{ uri: BASE_URL + Info.profileImg }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../../../../assets/images/model.jpg')}
                  style={styles.profileImage}
                />
              )}
              <View style={styles.nameContainer}>
                <View>
                  <View style={styles.nameInnerContainer}>
                    <ResponsiveText style={styles.nameText}>
                      {Info ? Info.userName.length < 15 ? Info.userName : `${Info.userName.substring(0, 15)}....` : ''}
                    </ResponsiveText>

                  </View>
                  <ResponsiveText style={styles.userName}>
                    @{Info ? Info.email.split("@")[0].length < 15 ? Info.email.split("@")[0] : `${Info.email.split("@")[0].substring(0, 15)}....` : ''}
                  </ResponsiveText>
                </View>
                <View style={{ marginLeft: wp('15') }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Fams')}>
                    <ResponsiveText style={styles.famText}>   {this.state.count.length == [] ? 0 : this.state.count}</ResponsiveText>
                    <ResponsiveText style={styles.famText}>
                      Fams
                    </ResponsiveText>
                  </TouchableOpacity>
                </View>
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
                  {Info ? Info.description : ''}
                </ResponsiveText>
              </ViewMoreText>
            </View>
          </View> : null}
        <MyTabs />
      </Container>
    );
  }
}

export default Profile;

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
  headerIcon1: {
    height: wp('7'),
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
    flexDirection: 'row'
  },
  nameText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.3,
    marginRight: wp('2'),
    maxWidth: wp('40'),
  },
  nameTextMain: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 6.3,
    marginRight: wp('2'),
    maxWidth: wp('40'),
  },
  userName: {
    fontSize: 4.5,
    marginRight: wp('2'),
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#2874a6',

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
  userDescription: {
    fontFamily: Fonts.SourceSansProRegular,
    fontSize: 12,
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
