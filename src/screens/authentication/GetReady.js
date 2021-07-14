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
  Platform,
} from 'react-native';
import Container from '../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../components/ResponsiveText';
import { CommonActions } from '@react-navigation/native';
import Fonts from '../../themes/Fonts';
import { androidHeight, iosH2 } from '../../utils/constants';

class GetReady extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      code: '',
    };
  }
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
            <ResponsiveText style={styles.ReadyText}>
              Get Ready !
            </ResponsiveText>
            <ResponsiveText style={styles.descriptionText}>
              Enable App permission to fun  enjoy to use this app 
            </ResponsiveText>
            <Image
              source={require('../../assets/images/artwork.png')}
              style={styles.image}
            />

            <ResponsiveText style={styles.descriptionText}>
              Enable Permission to gain full access
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'ChooseInterest',
                    },
                  ],
                }),
              );
            }}
            style={styles.button}>
            <Image
              source={require('../../assets/icons/chevron_right_round.png')}
              style={styles.right}
            />
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  }
}

export default GetReady;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: wp('25'),
    paddingBottom: wp('5'),
    justifyContent: 'space-between',
  },
  ReadyText: {
    fontSize: 6.5,
    fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('4'),
    color: '#1e1e1e',
    fontWeight: 'bold',
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
  image: {
    height: '60%',
    width: wp('70'),
  },
  button: {
    height: wp('18'),
    width: wp('18'),
    borderRadius: wp('18'),
    backgroundColor: '#ffce31',
    marginBottom: wp('10'),
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    height: wp('8'),
    width: wp('8'),
    tintColor: '#000000',
    resizeMode: 'contain',
  },
  descriptionText: {
    fontSize: 5.1,
    width: wp('80'),
    textAlign: 'center',
    color: '#9E9E9E',
    // marginBottom: wp('5'),
    fontFamily: Fonts.OpenSansRegular,
  },
};
