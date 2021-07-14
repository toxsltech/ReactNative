/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import {
  View,
 ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Container from '../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../components/ResponsiveText';
import Button from '../../components/Button';
import Fonts from '../../themes/Fonts';

class PasswordResetSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
    };
  }
  
  render() {
    return (
      <Container style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.backContainer}>
          <Image
            source={require('../../assets/icons/chevron_left.png')}
            style={styles.left}
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <ResponsiveText style={styles.forgotText}>
              Password Reset Successful
            </ResponsiveText>

            <Image
              source={require('../../assets/images/password_reset.png')}
              style={{
                height: wp('65'),
                width: wp('70'),
                resizeMode: 'contain',
                marginTop: wp('7'),
              }}
            />
          </View>
          <Button
            text={'Continue'}
            containerStyle={styles.Continuebutton}
            textStyle={styles.ContinuebuttonText}
            onPress={() => this.props.navigation.navigate('Login')}
          />
        </ScrollView>
      </Container>
    );
  }
}

export default PasswordResetSuccess;

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
    marginBottom: wp('7'),
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: wp('6'),
  },
  forgotText: {
    fontSize: 6.5,
    marginBottom: wp('1'),
    fontFamily: Fonts.SourceSansProSemiBold
  },
  Continuebutton: {
    width: wp('80'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('6'),
    elevation: 0,
  },
  ContinuebuttonText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 5,
    color: '#000000',
    fontWeight: 'bold'
  },
  backContainer: {
    alignSelf: 'flex-start',
    padding: wp('3'),
  },
  left: {
    height: wp('6'),
    width: wp('10'),
    resizeMode: 'contain',
    tintColor: '#3A3A3A',
  },
};
