
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import ResponsiveText from '../../../components/ResponsiveText';
import ChatCard from '../../../components/ChatCard';
import SocketManager from '../../../socketManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../utils/env';
import showNotification from '../../../utils/services'
import { androidHeight, iosH4 } from '../../../utils/constants';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      USERID: '',
      DataReceiver: [],
      DataSender: [],
      SenderId: '',
      chatId: {},
      time: {},
      typing: '',
      unseenCount: '',
      type: 0,
      notifiCount: 0
    }
  }
  componentDidMount = async () => {

    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getuserid()
      this.notification()

      SocketManager.instance.listenChatLists((data) => {
        const Data = data.map((item) => item.lastmsgId)
        const isTyping = data.map((item) => item.isTyping)
        const unseenCount = data.map((item) => item.unseenCount)
        const time1 = data.map((item) => item.updatedAt)
        const chatId1 = data.map((item) => item._id)
        const type = data.map((item) => item.type)
        const DataReceiver = Data.map((item) => item.receiverId)
        let chatId = Object.assign({}, chatId1);
        this.setState({ DataReceiver: DataReceiver, chatId: chatId, time: time1, typing: isTyping, unseenCount: unseenCount, type: type })
      });
    });

  }

  getuserid = async () => {
   
    try {
      const USERID = await AsyncStorage.getItem('USERID')
      this.setState({ USERID: USERID })
      SocketManager.instance.emitChatLists({
        senderId: USERID,
      })
    } catch (e) {
      showNotification("danger", e);

    }
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
      .catch(error => {
        showNotification("danger", error.message);
      })
  }
  render() {
    const { DataReceiver, chatId, time, type } = this.state

    return (
      <Container style={{ flex: 1, paddingVertical: Platform.OS === 'ios' ? iosH4 : androidHeight }}>
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>Messages</ResponsiveText>
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
        <View style={styles.clearFix} />
        {DataReceiver ?
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: wp('5.5'),
              paddingTop: wp('4'),
            }}
            bounces={false}
            data={DataReceiver}
            renderItem={({ item, index }) => {
              return (
                <ChatCard
                  key={index}
                  profile_image={item.profileImg}
                  user_name={item.userName}
                  time={time[index]}
                  unseen_messsages={this.state.unseenCount[index]}
                  last_message={item.message}
                  chatId={chatId[index]}
                  type={type[index]}
                  postID={item._id}
                  navigation={this.props.navigation}
                  typing={this.state.typing[index]}
                />
              );
            }}
            keyExtractor={(item, index) => `${index}`}
          />
          : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 160 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>No Message Found !!</Text>
          </View>}

      </Container>
    );
  }
}

export default Inbox;

const styles = {
  header: {},
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 5,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',

  },
  headerNotificationIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
    tintColor: '#025960',
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.3,
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',

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
}
