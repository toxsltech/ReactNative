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
  TouchableOpacity,
  Platform,
} from 'react-native';
import Container from '../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../../components/ResponsiveText';
import Button from '../../../components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Fonts from '../../../themes/Fonts';
import * as Animatable from 'react-native-animatable';
import { androidHeight, iosH2 } from '../../../utils/constants';


class ConfirmationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      sentOtp: '',
      emailId: '',
      code: '',
      type: '',
    };
  }

  componentWillMount() {
    const all = this.props.route.params;
    this.setState({ sentOtp: all.OTP, emailId: all.Mail, type: all.Type });
  }

  onCodeEnter = () => {
    const { sentOtp, emailId, code } = this.state;
    if (code) {
      if (code == sentOtp) {
        this.props.onVerifyingOTP(emailId, code).then(() => this.afterVerify());
      } else {
        alert('OTP is Incorrect');
        this.setState({ code: '' });
      }
    } else {
      alert('Please enter OTP');
    }
  };

  afterVerify = () => {
    const verified = this.props.otpResponse.success;
    if (this.state.type == 'Login') {
      this.props.navigation.navigate('GetReady');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  afterGetProfile = () => {
    const Profile = this.props.GetProfileReducer.data;
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[
            styles.backContainer,
            { top: Platform.OS === 'ios' ? iosH2 : androidHeight },
          ]}>
          <Image
            source={require('../../../assets/icons/chevron_left.png')}
            style={styles.left}
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
            <ResponsiveText style={styles.ConfirmationText}>
              Enter Confirmation Code
            </ResponsiveText>
            <ResponsiveText style={styles.descriptionText}>
              Enter the Code was send to your mobile number
            </ResponsiveText>

            <OTPInputView
              style={{ width: wp('85'), height: wp(20), marginBottom: wp('7'),resizeMode:'contian' }}
              code={this.state.code}
              autoFocusOnLoad={true}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeChanged={code => this.setState({ code })}
           
            />
            <TouchableOpacity>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#181818',
                  marginBottom: wp('30'),
                  fontFamily: Fonts.RobotoRegular,
                }}>
                Instead of Code Call me?
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            text={'Continue'}
            containerStyle={styles.continuebutton}
            textStyle={styles.continuebuttonText}
            onPress={() => this.onCodeEnter()}
          />
          <View style={styles.pagination}>
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <Animatable.View
              animation="fadeInLeft"
              duration={400}
              style={styles.activeDot}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default ConfirmationCode;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: wp('20'),
    width: wp('20'),
    resizeMode: 'contain',
    marginBottom: wp('20'),
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: wp('15'),
  },
  ConfirmationText: {
    fontSize: 6.5,
    fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('3'),
    color: '#181818',
    fontWeight: 'bold',
  },
  nameInput: {
    width: wp('80'),
    paddingHorizontal: wp('4'),
    marginBottom: wp('10'),
    borderWidth: 0,
    borderBottomWidth: wp('0.6'),
    borderBottomColor: 'black',
    borderRadius: 0,
  },
  continuebutton: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  continuebuttonText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  backContainer: {
    alignSelf: 'flex-start',
    padding: wp('3'),
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 10,
  },
  left: {
    height: wp('6'),
    width: wp('10'),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
  },
  inactiveDot: {
    height: wp('3.5'),
    width: wp('3.5'),
    borderRadius: wp('3'),
    backgroundColor: '#b3b3b3',
    marginLeft: wp('2'),
  },
  activeDot: {
    height: wp('3.5'),
    width: wp('7'),
    borderRadius: wp('3'),
    backgroundColor: '#025960',
    marginLeft: wp('2'),
  },
  underlineStyleBase: {
    width: wp('10'),
    height: wp('20'),
    borderWidth: 0,
    borderBottomWidth: wp('0.6'),
    borderBottomColor: 'black',
    fontSize: wp('6'),
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
    fontSize: wp('6'),
  },
  descriptionText: {
    width: wp('90'),
    textAlign: 'center',
    color: '#A2A2A2',
    marginBottom: wp('2'),
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.5,
  },
};
