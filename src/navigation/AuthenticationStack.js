/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import GetStarted from '../screens/authentication/GetStarted';
import Walkthrough from '../screens/authentication/Walkthrough';
import Login from '../screens/authentication/Login';
import ForgotPassword from '../screens/authentication/ForgotPassword';
import passwordResetSuccess from '../screens/authentication/PasswordResetSuccess';
import UserName from '../screens/authentication/UserName';
import SetPassword from '../screens/authentication/SetPassword';
import MobileNumber from '../screens/authentication/MobileNumber';
import ConfirmationCode from '../screens/authentication/ConfirmationCode';
import chooseInterest from '../screens/authentication/ChooseInterest';
import GetReady from '../screens/authentication/GetReady';
import ChooseInterest from '../screens/authentication/ChooseInterest';
const Stack = createStackNavigator();
class AuthenticationStack extends React.Component {
  render() {
    return (
      <>
        <Stack.Screen
          name="GetStarted"
          options={{headerShown: false}}
          component={GetStarted}
        />
        <Stack.Screen
          name="Walkthrough"
          options={{headerShown: false}}
          component={Walkthrough}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: false}}
          component={ForgotPassword}
        />
        <Stack.Screen
          name="passwordResetSuccess"
          options={{headerShown: false}}
          component={passwordResetSuccess}
        />
        <Stack.Screen
          name="UserName"
          options={{headerShown: false}}
          component={UserName}
        />
        <Stack.Screen
          name="SetPassword"
          options={{headerShown: false}}
          component={SetPassword}
        />
        <Stack.Screen
          name="MobileNumber"
          options={{headerShown: false}}
          component={MobileNumber}
        />
        <Stack.Screen
          name="ConfirmationCode"
          options={{headerShown: false}}
          component={ConfirmationCode}
        />
        <Stack.Screen
          name="GetReady"
          options={{headerShown: false}}
          component={GetReady}
        />
        <Stack.Screen
          name="ChooseInterest"
          options={{headerShown: false}}
          component={ChooseInterest}
        />
      </>
    );
  }
}

export default AuthenticationStack;

