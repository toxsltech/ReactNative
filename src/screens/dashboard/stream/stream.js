/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */



import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import AppHeader from '../../../components/AppHeader';
import Container from '../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import InputField from '../../../components/InputField';
import Fonts from '../../../themes/Fonts';
import ResponsiveText from '../../../components/ResponsiveText';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Global from './Global';
import Games from './Games';
import Dance from './Dance';
import Sports from './Sports';
import { BASE_URL } from '../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'
import { androidHeight, iosH3 } from '../../../utils/constants';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#CECECE',
        labelStyle: {
          fontFamily: Fonts.RobotoBold,
          textTransform: 'capitalize',
          fontSize: wp('4.2'),
          marginBottom: -2,
        },
        tabStyle: { paddingHorizontal: wp(3) },
        style: {
          elevation: 0,
          borderBottomWidth: wp(0.3),
          borderBottomColor: '#E1E1E1',
          marginHorizontal: wp('3'),
        },
        indicatorStyle: {
          height: wp('0.7'),
          borderRadius: wp('5'),
          backgroundColor: '#000000',
          marginRight: wp('10'),
          alignSelf: 'center',
          width: wp('16'),
          marginLeft: wp('4'),
        },
      }}>
      {/* <Tab.Screen name="Global" component={() => <Global data={this.state.Stories} />} /> */}
      <Tab.Screen name="Global" component={Global} />
      <Tab.Screen name="Games" component={Games} />
      <Tab.Screen name="Dance" component={Dance} />
      <Tab.Screen name="Sports" component={Sports} />
    </Tab.Navigator>
  );
}

class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedToggle: 'Popular',
      stories: [1, 2, 3, 4, 5, 6],
      postMenu: false,
      profile: '',
      story: [],
      Posts: [],
      isFetching: false,
      Stories: [],
      notifiCount: 0
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.notification()
    });
    this.props.onGetStory().then(() => this.afterGetStory());
    this.props.onGetPosts().then(() => this.afterGetPost());
    this.props.onGetProfile().then(() => this.afterGetProfile());
    this.props.onGetAllStory().then(() => this.afterGetAllStory());
  }

  afterGetStory = () => {
    const storyData = this.props.getstoryResponse ? this.props.getstoryResponse.data : '';
    this.setState({ story: storyData });

  }
  afterGetPost = () => {
    const postData = this.props.getpostResponse ? this.props.getpostResponse.data : '';
    this.setState({ Posts: postData, isFetching: false });
  }
  afterGetProfile = () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    this.setState({ profile: Info.profileImg });
  };

  afterGetAllStory = () => {
    const stories = this.props.getallstoryResponse ? this.props.getallstoryResponse.data : '';
    this.setState({ Stories: stories, isFetching: false });
  }
  notification = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'notification/allNotification/', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json ? json.count : ''
        this.setState({ notifiCount: data })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  render() {

    return (
      <Container style={{ flex: 1, paddingVertical: Platform.OS === 'ios' ? iosH3 : androidHeight }}>
        <AppHeader
          left={
            <View style={{
              ...styles.headerprofileImageContainer,

              borderColor: this.state.story.count
                ? '#0089FF'
                : '#F2F2F2',
            }}>
              {this.state.profile ? (
                <Image
                  source={
                    this.state.profile
                      ? { uri: BASE_URL + this.state.profile }
                      : require('../../../assets/images/model.jpg')
                  }
                  style={styles.headerProfileImage}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/model.jpg')}
                  style={styles.headerProfileImage}
                />
              )}
            </View>
          }
          leftPress={() => { this.state.story.count == null ? this.props.navigation.navigate('AddPost') : this.props.navigation.navigate('Story') }

          }
          body={
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}>
              <InputField
                editable={false}
                leftIcon={
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={styles.searchIcon}
                  />
                }
                inputField={styles.searchText}
                containerStyle={styles.headerSearchbar}
                placeholder={'Search'}
              />
            </TouchableOpacity>
          }
          right={
            <View>
              <Image
                source={require('../../../assets/icons/Notification.png')}
                style={styles.headerNotificationIcon}
              />
              {this.state.notifiCount && this.state.notifiCount != '0' ? (
                <View style={styles.notificationBadge}>
                  <ResponsiveText
                    style={{
                      fontSize: 2.5,
                      color: '#000',
                      fontFamily: Fonts.OpenSansRegular,
                    }}>
                    {this.state.notifiCount}
                  </ResponsiveText>
                </View>
              ) : null}
            </View>
          }
          rightPress={() => this.props.navigation.navigate('Notification')}
        />
        <View style={{ flexGrow: 1 }}>
          <MyTabs />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('GoLive')}

          style={styles.goLiveButton}>
          <ResponsiveText style={styles.GoLiveText}>Go Live</ResponsiveText>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default Stream;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  headerProfileImage: {
    height: wp('10'),
    width: wp('10'),
    borderRadius: wp('10'),
    backgroundColor: '#F3F3F3',

    // resizeMode:'contain'
    // padding:wp('5')
  },
  headerprofileImageContainer: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    borderWidth: wp('0.6'),
    borderColor: '#0089FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerNotificationIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
    tintColor: '#025960',
  },
  headerSearchbar: {
    width: wp('65'),
    height: wp('11.5%'),
    borderRadius: wp('10'),
    marginLeft: wp('4.5'),
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    paddingLeft: wp('3'),
  },
  notificationBadge: {
    height: wp('3.8'),
    width: wp('3.8'),
    backgroundColor: '#59EF0E',
    borderRadius: wp('3.8'),
    position: 'absolute',
    right: -6,
    top: -4,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),
  },
  searchText: {
    fontFamily: Fonts.RobotoBold,
    fontSize: wp('3.5'),
    // marginLeft: -wp('1.5'),
  },
  goLiveButton: {
    height: wp('11'),
    width: wp('25'),
    backgroundColor: '#ffce31',
    borderRadius: wp('10'),
    elevation: 8,
    position: 'absolute',
    bottom: wp('5'),
    right: wp('5'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  GoLiveText: {
    color: '#000000',
    fontFamily: Fonts.RobotoBold,
    fontWeight: 'bold'
  },
};
