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
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Container from '../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../components/ResponsiveText';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Fonts from '../../themes/Fonts';
import { isEmpty } from '../../utils/globals';
import { androidHeight, iosH2 } from '../../utils/constants';


class UserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      username: '',
    };
  }

  verifyCredentials = () => {
    const { username } = this.state;
    if (isEmpty(username.trim())) {
      alert('Please enter user name');
      return false;
    }
    return true;
  };

  goToEmail = () => {
    const { username } = this.state;
    if (this.verifyCredentials()) {
      this.props.navigation.navigate('EnterEmail', { name: username });
    }
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
            <ResponsiveText style={styles.UserNameText}>
              Enter Username ?
            </ResponsiveText>

            <InputField
              containerStyle={styles.nameInput}
              autoFocus
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
            />
            <ResponsiveText style={styles.descriptionText}>
              By tapping sign up, you acknowledge that you have read
              the privacy policy and agree to the terms
            </ResponsiveText>
          </View>
          <Button
            text={'Sign up'}
            containerStyle={styles.signupbutton}
            textStyle={styles.signupbuttonText}
            onPress={() => this.goToEmail()}
          />
          <View style={styles.pagination}>
            <Animatable.View
              animation="fadeInLeft"
              duration={400}
              style={styles.activeDot}
            />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default UserName;

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
  UserNameText: {
    fontSize: 6.5,
    fontWeight: 'bold',
    marginBottom: wp('6'),
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#181818',
  },
  nameInput: {
    width: wp('80'),
    paddingHorizontal: wp('1'),
    marginBottom: wp('6'),
    borderWidth: 0,
    borderBottomWidth: wp('0.6'),
    borderBottomColor: 'black',
    borderRadius: 0,
  },
  signupbutton: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  signupbuttonText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  backContainer: {
    alignSelf: 'flex-start',
    padding: wp('3'),
    position: 'absolute',
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
  descriptionText: {
    width: wp('75'),
    textAlign: 'center',
    color: '#A2A2A2',
    marginBottom: wp('25'),
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.5,
  },
};
