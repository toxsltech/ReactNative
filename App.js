/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import Navigation from './src/navigation'
import { Provider } from "react-redux";
import Store from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { NotifierWrapper } from 'react-native-notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import './src/utils/firebase'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from '@react-native-firebase/messaging';

const { store, persistor } = Store();

class App extends React.Component {

  componentDidMount = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          AsyncStorage.setItem('userInfo', JSON.stringify(remoteMessage));
        }
      });

    PushNotification.configure({
      onNotification: function (notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
        PushNotification.removeAllDeliveredNotifications();
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })

  }
  render() {
    console.disableYellowBox = true;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotifierWrapper>
            <Navigation
            />
          </NotifierWrapper>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
