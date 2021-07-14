/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import 'react-native-gesture-handler';
import React from 'react';
import { Image, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import GetStarted from '../screens/authentication/GetStarted';
import Walkthrough from '../screens/authentication/Walkthrough';
import Login from '../screens/authentication/Login';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import passwordResetSuccess from '../screens/authentication/PasswordResetSuccess';
import UserName from '../screens/authentication/UserName';
import SetPassword from '../screens/authentication/SetPassword';
import MobileNumber from '../screens/authentication/MobileNumber';
import ConfirmationCode from '../screens/authentication/ConfirmationCode';
import GetReady from '../screens/authentication/GetReady';
import ChooseInterest from '../screens/authentication/ChooseInterest';
import Home from '../screens/dashboard/Home';
import Stream from '../screens/dashboard/stream/index';
import Inbox from '../screens/dashboard/inbox/Inbox';
import Profile from '../screens/dashboard/profile/Profile';
import OtherProfile from '../screens/dashboard/profile/OtherProfile';
import Notification from '../screens/dashboard/Notification';
import ResponsiveText from '../components/ResponsiveText';
import Fonts from '../themes/Fonts';
import AddPost from '../screens/dashboard/addPost/AddPost';
import Setting from '../screens/dashboard/Setting';
import Fams from '../screens/dashboard/profile/fams/Fams';
import LikedBy from '../screens/dashboard/LikedBy';
import StoryLikes from '../screens/dashboard/StoryLIkes';
import StoryDisLike from '../screens/dashboard/StoryDislike';
import Messages from '../screens/dashboard/inbox';
import MessageBubbleVideo from '../components/MessageBubbleVideo';
import Story from '../screens/dashboard/story';
import OtherStory from '../screens/dashboard/otherStory';
import MediaPreview from '../screens/dashboard/addPost/MediaPreview';
import Search from '../screens/dashboard/search';
import Viewers from '../screens/dashboard/Viewers';
import InviteFriends from '../screens/dashboard/InviteFriends';
import SinglePost from '../screens/dashboard/profile/SinglePost';
import OtherSinglePost from '../screens/dashboard/profile/OtherSinglePost';
import BlockedUsers from '../screens/dashboard/BlockedUsers';
import EditProfile from '../screens/dashboard/profile/EditProfile';
import LiveStream from '../screens/dashboard/LiveStream';
import Comments from '../screens/dashboard/Comments';
import StreamedVideo from '../screens/dashboard/StreamedVideo';
import GoLive from '../screens/dashboard/GoLive';
import Hub from '../screens/dashboard/Hub';
import EnterEmail from '../screens/authentication/EnterEmail';
import Streamer from '../screens/dashboard/Streamer';
import Viewer from '../screens/dashboard/Viewer';
import MessagesList from '../components/MessagesList'
import Homescreen from '../screens/Ecommerce/Homescreen';
import Bottomnavigation from '../screens/Ecommerce/Bottomnavigation';
import Notificationsscreen from '../screens/Ecommerce/Notificationsscreen';
import Cartscreen from '../screens/Ecommerce/cartScreen';
import CartList from '../screens/Ecommerce/CartList';
import Myorder from '../screens/Ecommerce/Myorder';
import Wishlist from '../screens/Ecommerce/Wishlist';
import Filtersearch from '../screens/Ecommerce/Filtersearch';
import Orderreturn from '../screens/Ecommerce/Orderreturn';
import Paymentscreen from '../screens/Ecommerce/Paymentscreen';
import Billingscreen from '../screens/Ecommerce/Billingscreen';
import Newcard from '../screens/Ecommerce/Newcard';
import Filterscreen from '../screens/Ecommerce/Filterscreen';
import Trackscreen from '../screens/Ecommerce/Trackscreen';
import Success from '../screens/Ecommerce/Success';
import Storescreen from '../screens/Ecommerce/Storescreen';
import Storeprofile from '../screens/Ecommerce/Storeprofile';
import Message from '../screens/Ecommerce/Message';
import profilescreen from '../screens/Ecommerce/profilescreen';
import Newhome from '../screens/Ecommerce/NewHome';
import Sellerprofile from '../screens/Ecommerce/Sellerprofile';
import ImagesDispalyed from '../ecommerceComponents/ImageDisplayed';
import cartdetail from '../screens/Ecommerce/cartdetail'
import Address from '../screens/Ecommerce/Address';
import coupan from '../screens/Ecommerce/coupan';
import PaymentCard from '../screens/Ecommerce/PaymentCard';
import FlashMessage from "react-native-flash-message";
import Contactus from '../screens/Ecommerce/Contactus';
import ChatMessages from '../screens/Ecommerce/ChatMessages'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="userProfile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <Stack.Screen
        name="OtherProfile"
        options={{ headerShown: false }}
        component={OtherProfile}
      />
      <Stack.Screen
        name="Fams"
        options={{ headerShown: false }}
        component={Fams}
      />

      <Stack.Screen
        name="SinglePost"
        options={{ headerShown: false }}
        component={SinglePost}
      />
      <Stack.Screen
        name="OtherSinglePost "
        options={{ headerShown: false }}
        component={OtherSinglePost}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <Stack.Screen
        name="OtherProfile"
        options={{ headerShown: false }}
        component={OtherProfile}
      />
      <Stack.Screen
        name="Fams"
        options={{ headerShown: false }}
        component={Fams}
      />
      <Stack.Screen
        name="SinglePost"
        options={{ headerShown: false }}
        component={SinglePost}
      />
      <Stack.Screen
        name="OtherSinglePost "
        options={{ headerShown: false }}
        component={OtherSinglePost}
      />
    </Stack.Navigator>
  );
}

function DashboardTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'Home';
          } else if (route.name === 'Stream') {
            iconName = 'Stream';
          } else if (route.name === 'AddPost') {
            iconName = 'AddPost';
          } else if (route.name === 'Inbox') {
            iconName = 'Inbox';
          } else if (route.name === 'ProfileStack') {
            iconName = 'Profile';
          }

          if (iconName == 'Home') {
            return (
              <>
                <Image
                  source={require('../assets/icons/home_tab.png')}
                  style={[styles.tabBarIcon, { tintColor: color }]}
                />
                <Text
                  style={{
                    color: color,
                    fontSize: wp('3'),
                    fontFamily: Fonts.RobotoBold,
                  }}>
                  {iconName}
                </Text>
              </>
            );
          }
          if (iconName == 'Stream') {
            return (
              <>
                <Image
                  source={require('../assets/icons/stream_tab.png')}
                  style={[styles.tabBarIcon, { tintColor: color }]}
                />
                <Text
                  style={{
                    color: color,
                    fontSize: wp('3'),
                    fontFamily: Fonts.RobotoBold,
                  }}>
                  {iconName}
                </Text>
              </>
            );
          }
          if (iconName == 'AddPost') {
            return (
              <>
                <View style={styles.plusContainer}>
                  <Image
                    source={require('../assets/icons/plus.png')}
                    style={styles.plusIcon}
                  />
                </View>
              </>
            );
          }

          if (iconName == 'Inbox') {
            return (
              <>
                <Image
                  source={require('../assets/icons/ic_comment_un.png')}
                  style={[styles.tabBarIcon, { tintColor: color }]}
                />
                <Text
                  style={{
                    color: color,
                    fontSize: wp('3'),
                    fontFamily: Fonts.RobotoBold,
                  }}>
                  {iconName}
                </Text>
              </>
            );
          }
          if (iconName == 'Profile') {
            return (
              <>
                <Image
                  source={require('../assets/icons/profile_tab.png')}
                  style={[styles.tabBarIcon, { tintColor: color }]}
                />
                <Text
                  style={{
                    color: color,
                    fontSize: wp('3'),
                    fontFamily: Fonts.RobotoBold,
                  }}>
                  {iconName}
                </Text>
              </>
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1e686e',
        inactiveTintColor: '#CECECE',
        style: {
          height: wp('19'),
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        options={{ title: '' }}
        component={HomeStack}
      />
      <Tab.Screen name="Stream" options={{ title: '' }} component={Stream} />
      <Tab.Screen
        name="AddPost"
        options={{ title: '', tabBarVisible: false }}
        component={AddPost}
      />
      <Tab.Screen name="Inbox" options={{ title: '' }} component={Inbox} />
      <Tab.Screen
        name="ProfileStack"
        options={{ title: '' }}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
const auth = false;
class Navigation extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <StatusBar
          translucent backgroundColor="transparent"
          barStyle='dark-content'
        />
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="GetStarted"
            options={{ headerShown: false }}
            component={GetStarted}
          />
          <Stack.Screen
            name="Walkthrough"
            options={{ headerShown: false }}
            component={Walkthrough}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Streamer"
            options={{ headerShown: false }}
            component={Streamer}
          />
          <Stack.Screen
            name="Viewers"
            options={{ headerShown: false }}
            component={Viewers}
          />
          <Stack.Screen
            name="ForgotPassword"
            options={{ headerShown: false }}
            component={ForgotPassword}
          />
          <Stack.Screen
            name="passwordResetSuccess"
            options={{ headerShown: false }}
            component={passwordResetSuccess}
          />
          <Stack.Screen
            name="UserName"
            options={{ headerShown: false }}
            component={UserName}
          />
          <Stack.Screen
            name="EnterEmail"
            options={{ headerShown: false }}
            component={EnterEmail}
          />
          <Stack.Screen
            name="SetPassword"
            options={{ headerShown: false }}
            component={SetPassword}
          />
          <Stack.Screen
            name="MobileNumber"
            options={{ headerShown: false }}
            component={MobileNumber}
          />
          <Stack.Screen
            name="ConfirmationCode"
            options={{ headerShown: false }}
            component={ConfirmationCode}
          />
          <Stack.Screen
            name="GetReady"
            options={{ headerShown: false }}
            component={GetReady}
          />
          <Stack.Screen
            name="ChooseInterest"
            options={{ headerShown: false }}
            component={ChooseInterest}
          />

          <Stack.Screen
            name="Setting"
            options={{ headerShown: false }}
            component={Setting}
          />
          <Stack.Screen
            name="StoryLikes"
            options={{ headerShown: false }}
            component={StoryLikes}
          />
          <Stack.Screen
            name="StoryDisLike"
            options={{ headerShown: false }}
            component={StoryDisLike}
          />
          <Stack.Screen
            name="Viewer"
            options={{ headerShown: false }}
            component={Viewer}
          />
          <Stack.Screen
            name="InviteFriends"
            options={{ headerShown: false }}
            component={InviteFriends}
          />
          <Stack.Screen
            name="BlockedUsers"
            options={{ headerShown: false }}
            component={BlockedUsers}
          />

          <Stack.Screen
            name="MessageBubbleVideo"
            options={{ headerShown: false }}
            component={MessageBubbleVideo}
          />
          <Stack.Screen
            name="Messages"
            options={{ headerShown: false }}
            component={Messages}
          />
          <Stack.Screen
            name="Story"
            options={{ headerShown: false }}
            component={Story}
          />
          <Stack.Screen
            name="OtherStory"
            options={{ headerShown: false }}
            component={OtherStory}
          />
          <Stack.Screen
            name="AddPost"
            options={{ headerShown: false }}
            component={AddPost}
          />
          <Stack.Screen
            name="MediaPreview"
            options={{ headerShown: false }}
            component={MediaPreview}
          />
          <Stack.Screen
            name="EditProfile"
            options={{ headerShown: false }}
            component={EditProfile}
          />
          <Stack.Screen
            name="LiveStream"
            options={{ headerShown: false }}
            component={LiveStream}
          />
          <Stack.Screen
            name="Hub"
            options={{ headerShown: false }}
            component={Hub}
          />
          <Stack.Screen
            name="GoLive"
            options={{ headerShown: false }}
            component={GoLive}
          />
          <Stack.Screen
            name="StreamedVideo"
            options={{ headerShown: false }}
            component={StreamedVideo}
          />
          <Stack.Screen
            name="Comments"
            options={{ headerShown: false }}
            component={Comments}
          />
          <Stack.Screen
            name="LikedBy"
            options={{ headerShown: false }}
            component={LikedBy}
          />
          <Stack.Screen
            name="Search"
            options={{ headerShown: false }}
            component={Search}
          />
          <Stack.Screen
            name="MessagesList"
            options={{ headerShown: false }}
            component={MessagesList}
          />
          <Stack.Screen
            name="Notification"
            options={{ headerShown: false }}
            component={Notification}
          />
          <Stack.Screen
            name="DashboardTab"
            options={{ headerShown: false }}
            component={DashboardTab}
          />


          {/* Ecommerce start from hare */}
          <Stack.Screen
            name="Newhome"
            options={{ headerShown: false }}
            component={Newhome}
          />
          <Stack.Screen
            name="Homescreen"
            options={{ headerShown: false }}
            component={Homescreen}
          />
          <Stack.Screen
            name="Bottomnavigation"
            options={{ headerShown: false }}
            component={Bottomnavigation}
          />
          <Stack.Screen
            name="Notificationscreen"
            options={{ headerShown: false }}
            component={Notificationsscreen}
          />
          <Stack.Screen
            name="Cartscreen"
            options={{ headerShown: false }}
            component={Cartscreen}
          />
          <Stack.Screen
            name="CartList"
            options={{ headerShown: false }}
            component={CartList}
          />

          <Stack.Screen
            name="Myorder"
            options={{ headerShown: false }}
            component={Myorder}
          />
          <Stack.Screen
            name="Wishlist"
            options={{ headerShown: false }}
            component={Wishlist}
          />
          <Stack.Screen
            name="Filtersearch"
            options={{ headerShown: false }}
            component={Filtersearch}
          />
          <Stack.Screen
            name="Orderreturn"
            options={{ headerShown: false }}
            component={Orderreturn}
          />
          <Stack.Screen
            name="Paymentscreen"
            options={{ headerShown: false }}
            component={Paymentscreen}
          />
          <Stack.Screen
            name="Billingscreen"
            options={{ headerShown: false }}
            component={Billingscreen}
          />
          <Stack.Screen
            name="Address"
            options={{ headerShown: false }}
            component={Address}
          />
          <Stack.Screen
            name="Newcard"
            options={{ headerShown: false }}
            component={Newcard}
          />
          <Stack.Screen
            name="Filterscreen"
            options={{ headerShown: false }}
            component={Filterscreen}
          />
          <Stack.Screen
            name="Trackscreen"
            options={{ headerShown: false }}
            component={Trackscreen}
          />
          <Stack.Screen
            name="Success"
            options={{ headerShown: false }}
            component={Success}
          />
          <Stack.Screen
            name="Storescreen"
            options={{ headerShown: false }}
            component={Storescreen}
          />
          <Stack.Screen
            name="Storeprofile"
            options={{ headerShown: false }}
            component={Storeprofile}
          />
          <Stack.Screen
            name="Message"
            options={{ headerShown: false }}
            component={Message}
          />

          <Stack.Screen
            name="profilescreen"
            options={{ headerShown: false }}
            component={profilescreen}
          />

          <Stack.Screen
            name="Sellerprofile"
            options={{ headerShown: false }}
            component={Sellerprofile}
          />
          <Stack.Screen
            name="ImagesDispalyed"
            options={{ headerShown: false }}
            component={ImagesDispalyed}
          />
          <Stack.Screen
            name="cartdetail"
            options={{ headerShown: false }}
            component={cartdetail}
          />
          <Stack.Screen
            name="coupan"
            options={{ headerShown: false }}
            component={coupan}
          />
          <Stack.Screen
            name="PaymentCard"
            options={{ headerShown: false }}
            component={PaymentCard}
          />
          <Stack.Screen
            name="Contactus"
            options={{ headerShown: false }}
            component={Contactus}
          />
          <Stack.Screen
            name="ChatMessages"
            options={{ headerShown: false }}
            component={ChatMessages}
          />
        </Stack.Navigator>
        <FlashMessage position="center" />
      </NavigationContainer >
    );
  }
}

export default Navigation;
const styles = {
  plusContainer: {
    height: wp('12.5'),
    width: wp('12.5'),
    borderRadius: wp('12.5'),
    backgroundColor: '#ffce31',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp('3'),
    elevation: 2,
  },
  plusIcon: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  tabBarIcon: {
    height: wp('6.5'),
    width: wp('6.5'),
    resizeMode: 'contain',
    marginTop: wp('3'),
  },
};
