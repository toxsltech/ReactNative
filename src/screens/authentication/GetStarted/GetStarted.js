/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import ResponsiveText from '../../../components/ResponsiveText';
import Fonts from '../../../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import showNotification from '../../../utils/services'

class GetStarted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false
    }
  }
   componentDidMount = () => {
    const unsubscribe = dynamicLinks().onLink(this.handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
       
      if (link.url === 'https://play.google.com/store?gl=PL&utm_source=emea_Med&utm_medium=hasem&utm_content=Dec2020&utm_campaign=Evergreen&pcampaignid=MKT-EDR-emea-pl-1001280-Med-hasem-py-Evergreen-Dec2020-Text_Search_BKWS-test_ctrl_ca_aml%7CONSEM_kwid_43700059337086367&gclid=CjwKCAjwzruGBhBAEiwAUqMR8EV0oINwQQep2O0jEEVIIqD4yzsPPzUwW37YvODPmRR23MCVLxxLoxoCKj8QAvD_BwE&gclsrc=aw.ds') {
          this.props.navigation.navigate('userProfile')
        }

      });
 }
  handleDynamicLink = link => {
    if (link.url === 'https://play.google.com/store?gl=PL&utm_source=emea_Med&utm_medium=hasem&utm_content=Dec2020&utm_campaign=Evergreen&pcampaignid=MKT-EDR-emea-pl-1001280-Med-hasem-py-Evergreen-Dec2020-Text_Search_BKWS-test_ctrl_ca_aml%7CONSEM_kwid_43700059337086367&gclid=CjwKCAjwzruGBhBAEiwAUqMR8EV0oINwQQep2O0jEEVIIqD4yzsPPzUwW37YvODPmRR23MCVLxxLoxoCKj8QAvD_BwE&gclsrc=aw.ds') {
      this.props.navigation.navigate('userProfile')

    }
  };
  UNSAFE_componentWillMount = async () => {
  const tok = await AsyncStorage.getItem('token');
    if (tok !== null) {
      this.props.navigation.navigate('DashboardTab');

    } else {
      this.setState({ hide: true })
      this.props.navigation.navigate('GetStarted');
    }
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getRefresh()
    });
    return unsubscribe
  };
  getRefresh = async () => {
    try {
      const logoutuser = await AsyncStorage.getItem('logoutuser')
      if (logoutuser == 'true') {
        this.setState({ hide: true })
        await AsyncStorage.setItem('logoutuser', 'false')
      }
    } catch (e) {
      showNotification("danger", e);
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        {this.state.hide ?
          <View style={styles.bottomContainer}>
            <Image
              source={require('../../../assets/images/full_Logo.png')}
              style={styles.logo}
            />
            <Button
              text={'Get Started'}
              containerStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => this.props.navigation.navigate('Walkthrough')}
            />
            <View style={styles.textContainer}>
              <ResponsiveText style={styles.text}>
                By tapping sign up & accept, your acknowledge that you have read
                the privacy policy and agree to the terms.
              </ResponsiveText>
            </View>
          </View>
          : null}
      </Container>
    );
  }
}

export default GetStarted;

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
    marginBottom: '15%',
  },
  button: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: '#f8cc14',
    elevation: 0,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 5,
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#000',
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
