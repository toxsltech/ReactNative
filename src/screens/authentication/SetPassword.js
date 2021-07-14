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
import Container from '../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../components/ResponsiveText';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Fonts from '../../themes/Fonts';
import * as Animatable from 'react-native-animatable';
import { isEmpty } from '../../utils/globals';
import { androidHeight, iosH2 } from '../../utils/constants';

class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      email: '',
      name: '',
      password: '',
    };
  }

  componentWillMount() {
    const all = this.props.route.params;
    this.setState({ name: all.name, email: all.email });
  }

  verifyCredentials = () => {
    const { password } = this.state;
    if (isEmpty(password.trim())) {
      alert('Please enter password');
      return false;
    } else if (password.length < 8) {
      alert('Password should be 8 or greater than 8 characters');
      return false;
    }
    return true;
  };

  goToMobile = () => {
    const { name, email, password } = this.state;
    if (this.verifyCredentials()) {
      this.props.navigation.navigate('MobileNumber', { name, email, password });
    }
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[
            styles.backContainer,
            { top: Platform.OS === 'ios' ? iosH2 : androidHeight }
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
              Set Password
            </ResponsiveText>

            <InputField
              autoFocus
              containerStyle={styles.nameInput}
              secureTextEntry={this.state.isPasswordVisible ? false : true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              right={
                this.state.isPasswordVisible ? (
                  <Image
                    source={require('../../assets/icons/eye.png')}
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
                    source={require('../../assets/icons/hidepass.png')}
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
            <ResponsiveText style={styles.descriptionText}>
              Please set at least 8 characters in password
            </ResponsiveText>
          </View>
          <Button
            text={'Continue'}
            containerStyle={styles.continuebutton}
            textStyle={styles.continuebuttonText}
            onPress={() => this.goToMobile()}
          />
          <View style={styles.pagination}>
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <Animatable.View
              animation="fadeInLeft"
              duration={400}
              style={styles.activeDot}
            />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default SetPassword;

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
    fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('6'),
    color: '#181818',
    fontWeight: 'bold',
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
  continuebutton: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  continuebuttonText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.5,
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
  eye: {
    height: wp('5.5'),
    width: wp('5.5'),
    padding: wp('3'),
  },
  descriptionText: {
    width: wp('75'),
    textAlign: 'center',
    color: '#A2A2A2',
    marginBottom: wp('30'),
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.5,
  },
};
