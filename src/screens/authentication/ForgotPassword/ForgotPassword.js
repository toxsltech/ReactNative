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
import { isEmpty, isValidEmail } from '../../../utils/globals';

const height = Dimensions.get('window').height;
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      email: '',
    };
  }

  verifyCredentials = () => {
    const { email } = this.state;
    if (isEmpty(email.trim())) {
      alert('Please enter email address');
      return false;
    } else if (!isValidEmail(email.trim())) {
      alert('Please enter valid email address');
      return false;
    }
    return true;
  };

  onForgotPress = () => {
    const { email } = this.state;
    if (this.verifyCredentials()) {
      this.props.OnForgotPassword(email).then(() => this.afterForgotRes());
    }
  };

  afterForgotRes = () => {
    this.props.navigation.navigate('passwordResetSuccess');
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backContainer}>
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
            <ResponsiveText style={styles.forgotText}>
              Forgot password?
            </ResponsiveText>
            <ResponsiveText style={styles.descriptionText}>
              We just need your registered email address to send you password
              reset
            </ResponsiveText>
            <InputField
              autoFocus
              placeholder={'E-mail'}
              containerStyle={styles.emailInput}
              onChangeText={email => this.setState({ email })}
              keyboardType={'email-address'}
            />
            <Button
              text={'Submit'}
              containerStyle={styles.Loginbutton}
              textStyle={styles.LoginbuttonText}
              // onPress={() => this.onForgotPress()}
              onPress={() => this.props.navigation.navigate('passwordResetSuccess')}
            />
          </View>
         
        </ScrollView>
      </Container>
    );
  }
}

export default ForgotPassword;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: wp('25'),
    width: wp('25'),
    resizeMode: 'contain',
    marginBottom: wp('7'),
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: wp('10'),
  },
  forgotText: {
    fontSize: 6.5,
    fontWeight: 'bold',
    marginBottom: wp('2'),
    fontFamily: Fonts.SourceSansProSemiBold,
  },
  emailInput: {
    width: wp('80'),
    borderColor: '#80C4FF',
    paddingHorizontal: wp('4'),
    marginBottom: wp('10'),
  },
  Loginbutton: {
    width: wp('80'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  LoginbuttonText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 5,
    color: '#000000',
    fontWeight: 'bold',
  },
  backContainer: {
    alignSelf: 'flex-start',
    padding: wp('3'),
    alignSelf: 'flex-start',
    padding: wp('3'),
    position: 'absolute',
    top: 17,
    left: 0,
    zIndex: 10,
  },
  left: {
    height: wp('6'),
    width: wp('10'),
    resizeMode: 'contain',
    tintColor: '#3A3A3A',
  },
  descriptionText: {
    width: wp('85'),
    textAlign: 'center',
    color: '#C2C2C2',
    marginBottom: wp('15'),
    fontFamily: Fonts.OpenSansRegular,
  },
};
