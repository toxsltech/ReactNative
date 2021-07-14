/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { version } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../themes/Fonts';
import NotificationCard from '../../components/NotificationCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/env';
import showNotification from '../../utils/services'
import { androidHeight, iosHeight } from '../../utils/constants'
class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Notifications: [],
      notifiCount: 0,
    }
  }
  componentDidMount = () => {
    this.notification()

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
        const data = json ? json.data : ''
        const notifiCount = json ? json.count : ''
        this.setState({ Notifications: data, notifiCount: notifiCount })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }
  render() {
    const { Notifications } = this.state
    return (
      <Container style={{
        flexGrow: 1, paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight
      }}>
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>
              Notification
            </ResponsiveText>
          }
        />
        <View style={styles.clearFix} />
        {Notifications ?
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: wp('5.5'),
              paddingTop: wp('4'),
            }}
            bounces={false}
            data={Notifications}
            renderItem={({ item, index }) => {
              return <NotificationCard notificationData={item}
                navigation={this.props.navigation}
                tag={this.notification.bind(this)}
              />;
            }}
            keyExtractor={(item, index) => `${index}`}
          /> : <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 160 }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>No Notification Found !!</Text>
          </View>}
      </Container>
    );
  }
}

export default Notification;

const styles = {
  header: {
    elevation: 40,
  },
  leftIconContainer: {
    padding: 7,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain'
  },
  headerNotificationIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,
  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    elevation: 5,
    marginBottom: wp('4'),
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    shadowColor: '#E1E1E1'
  },
};
