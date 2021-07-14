
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Container from '../../components/Container';
import Button from '../../components/Button';
import ResponsiveText from '../../components/ResponsiveText';
import Fonts from '../../themes/Fonts';

class Walkthrough extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.bottomContainer}>
          <Image
            source={require('../../assets/images/full_Logo.png')}
            style={styles.logo}
          />
          <Button
            text={'Login'}
            containerStyle={styles.Loginbutton}
            textStyle={styles.LoginbuttonText}
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <Button
            text={'Sign up'}
            containerStyle={styles.Signupbutton}
            textStyle={styles.SignupbuttonText}
            onPress={() => this.props.navigation.navigate('UserName')}
          />
          <View style={styles.textContainer}>
            <ResponsiveText style={styles.text}>
              By tapping sign up & accept, your acknowledge that you have read
              the privacy policy and agree to the terms.
            </ResponsiveText>
          </View>
        </View>
      </Container>
    );
  }
}

export default Walkthrough;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  logo: {
    height: wp('90'),
    width: wp('50'),
    resizeMode: 'contain',
    marginBottom: '10%',
  },
  Loginbutton: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: '#f8cc14',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  Signupbutton: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: 'transparent',
    borderWidth: wp(0.6),
    borderColor: '#025960',
    elevation: 0,
  },
  LoginbuttonText: {
    fontWeight: 'bold',
    fontSize: 5,
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#000',
  },
  SignupbuttonText: {
    fontWeight: 'bold',
    fontSize: 5,
    color: '#025960',
    fontFamily: Fonts.SourceSansProSemiBold,
  },
  textContainer: {
    width: wp('80'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: wp('3'),
    paddingBottom: wp('8'),
  },
  text: {
    textAlign: 'center',
    fontSize: 3,
    color: '#686868',
    fontFamily: Fonts.OpenSansRegular,
  },
};
