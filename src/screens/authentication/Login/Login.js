
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
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Container from '../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../../components/ResponsiveText';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import Fonts from '../../../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty } from '../../../utils/globals';
import PushNotification from "react-native-push-notification";

const height = Dimensions.get('window').height;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      username: '',
      email: '',
      password: '',
      phoneNo: '',
      fcmToken: '',
    };
  }
  componentDidMount = () => {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.gettoken()
    })

    PushNotification.configure({
      onRegister: function (token) {
        AsyncStorage.setItem('fcmtoken', token.token);
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
  gettoken = async () => {
    try {
      const invaild = await AsyncStorage.getItem('invaild')
      if (invaild == 'true') {
        alert('Invalid token')
      }
    } catch (e) {
      showNotification("danger", e);
    }
  }
  verifyCredentials = () => {
    const { phoneNo, email, password } = this.state;

    if (isEmpty(email.trim() || phoneNo.trim())) {
      alert('Please enter valid email or phone number');
      return false;
    } else if (isEmpty(password.trim())) {
      alert('Please enter password');
      return false;
    } else if (password.length < 4) {
      alert('Password should be greater than 4 characters');
      return false;
    }
    return true;
  };


  onLoginSubmit = async () => {
    const fcmToken = await AsyncStorage.getItem('fcmtoken')
    const { email, password, phoneNo } = this.state;
    if (this.verifyCredentials()) {
      this.props.onLogin(email, password, phoneNo, fcmToken).then(() => this.afterLogin());
    }
  };

  afterLogin = async () => {
    const status = this.props.loginResponse.data.success;


    if (status) {
      const AllData = this.props.loginResponse.data.token;
      if (AllData) {
        await AsyncStorage.setItem('token', AllData);
        await AsyncStorage.setItem('invaild', 'false')
        this.props.onGetProfile().then(() => this.afterGetProfile());
      }
      const customer = this.props.loginResponse.data.data.customerId;
      if (customer) {
        AsyncStorage.setItem('customerId', customer);
      }
    } else {
      const OTP = this.props.loginResponse.data.data.otp;
      const Mail = this.props.loginResponse.data.data.email;
      const Type = 'Login';
      this.props.navigation.navigate('ConfirmationCode', { OTP, Mail, Type });
    }
  };

  afterGetProfile = async () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    AsyncStorage.setItem('MAINID', Info._id);
    this.props.navigation.navigate('ChooseInterest');
    this.props.onGetStory().then(() => this.afterGetStory());
    this.props.onGetPosts().then(() => this.afterGetPost());
  };

  afterGetStory = () => {
    this.props.getstoryResponse
  };

  afterGetPost = () => {
    this.props.getpostResponse;
  }

  onChange = (value) => {
    if (Number(value)) {
      this.setState({ phoneNo: value, email: '' });
    } else {
      this.setState({ email: value, phoneNo: "" });
    }
  }


  render() {

    return (
      <Container style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
            <ResponsiveText style={styles.loginText}>Log In</ResponsiveText>
            <InputField
              value={this.state.email || this.state.phoneNo}
              placeholder={'E-mail or Phone Number'}
              containerStyle={styles.emailInput}
              onChangeText={value => this.onChange(value)}
              keyboardType={'default'}
              autoCapitalize={'none'}
            />
            <InputField
              value={this.state.password}
              placeholder={'Password'}
              containerStyle={styles.passwordInput}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={this.state.isPasswordVisible ? false : true}
              right={
                this.state.isPasswordVisible ? (
                  <Image
                    source={require('../../../assets/icons/eye.png')}
                    style={[
                      styles.eye,
                      {
                        tintColor: this.state.isPasswordVisible
                          ? 'black'
                          : 'grey',
                      },
                    ]}
                  />
                ) : (
                  <Image
                    source={require('../../../assets/icons/hidepass.png')}
                    style={[
                      styles.eye,
                      {
                        tintColor: this.state.isPasswordVisible
                          ? 'black'
                          : 'grey',
                      },
                    ]}
                  />
                )
              }
              rightPress={() =>
                this.setState(prev => ({
                  isPasswordVisible: !prev.isPasswordVisible,
                }))
              }
            />
            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <ResponsiveText style={styles.forgotText}>
                Forgot Password ?
              </ResponsiveText>
            </TouchableOpacity>
            <Button
              text={'Login'}
              containerStyle={styles.Loginbutton}
              textStyle={styles.LoginbuttonText}
              onPress={() => this.onLoginSubmit()}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('UserName')}
            style={{
              flexDirection: 'row',
              paddingBottom: wp('5'),
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontFamily: Fonts.RobotoRegular,
                color: '#7E7E7E',
              }}>
              Don't have an account?{' '}
            </Text>
            <Text
              style={{
                color: '#000',
                textDecorationLine: 'underline',
                fontFamily: Fonts.RobotoRegular,
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}

export default Login;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameInput: {
    width: wp('80'),
    borderColor: '#025960',
    paddingHorizontal: wp('4'),
    marginBottom: wp('6'),
  },
  logo: {
    height: wp('25'),
    width: wp('25'),
    resizeMode: 'contain',
    marginBottom: wp('7'),
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: wp('15'),
  },
  loginText: {
    fontSize: 6.5,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: wp('5'),
    fontFamily: Fonts.SourceSansProSemiBold,
  },
  emailInput: {
    width: wp('80'),
    borderColor: '#025960',
    paddingHorizontal: wp('4'),
    marginBottom: wp('6'),
  },
  passwordInput: {
    width: wp('80'),
    borderColor: '#025960',

    paddingHorizontal: wp('4'),
    marginBottom: wp('6'),
  },
  eye: {
    height: wp('5.5'),
    width: wp('5.5'),
    padding: wp('2'),
  },
  forgotContainer: { alignSelf: 'flex-end', marginBottom: wp('7') },
  forgotText: {
    textDecorationLine: 'underline',
    color: '#000',
    fontFamily: Fonts.RobotoRegular,
  },

  Loginbutton: {
    width: wp('80'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  LoginbuttonText: {
    fontSize: 5,
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#000',
    fontWeight: 'bold',
  },
};




