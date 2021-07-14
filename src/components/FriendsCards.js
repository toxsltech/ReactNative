/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import { View, ImageBackground, Share } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import Button from './Button';
import { BASE_URL } from '../utils/env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../utils/services'

class FriendsCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
    };
  }

  onUnblockRequest = async (blockId) => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + '/' + blockId, {
      method: 'DELETE',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.props.tag()
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      });
  }

  sendInvitation = async (title, share_url) => {
    Share.share({
      message: `I'm on Fambase as @${title}.Install the app to follow my photos and videos.${'https://beta.toxsl.in/social-gathering/user/redirect/18'}`
    });
  }

  render() {
    const { profile_image, user_name, blockId } = this.props;
    const { status } = this.state;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../assets/images/placeholder.png')}
                style={styles.placeholderImage}>
                <Image
                  source={{ uri: BASE_URL + profile_image }}
                  style={styles.profileImage}
                />
              </ImageBackground>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{user_name}</ResponsiveText>
          </View>
          <View style={styles.buttonContainer}>
            {status === 'Invite' && (
              <Button
                text={'Invite'}
                onPress={() =>
                  this.sendInvitation(user_name, 'share_url')
                }
                containerStyle={[
                  styles.followButton,
                  { backgroundColor: 'white' },
                ]}
                textStyle={{
                  fontSize: 3.5,
                  color: '#000000',
                  fontFamily: Fonts.SourceSansProSemiBold,
                }}
              />
            )}
            {status === 'Follow' && (
              <Button
                text={'Follow'}
                onPress={() => this.setState({ status: 'Following' })}
                containerStyle={[
                  styles.followButton,
                  {
                    backgroundColor: '#ffce31',
                    borderColor: '#ffce31'
                  },
                ]}
                textStyle={{
                  fontSize: 3.5,
                  color: '#000000',
                  fontFamily: Fonts.SourceSansProSemiBold,
                }}
              />
            )}
            {status === 'Following' && (
              <Button
                text={'Following'}
                onPress={() => this.setState({ status: 'Follow' })}
                containerStyle={[
                  styles.followButton1,
                  { backgroundColor: '#42d278' },
                ]}
                textStyle={{
                  fontSize: 3.5,
                  color: '#ffffff',
                  fontFamily: Fonts.SourceSansProSemiBold,
                }}
              />
            )}
            {status === 'Blocked' && (
              <Button
                text={'Unblock'}
                onPress={() => this.onUnblockRequest(blockId)}
                containerStyle={[
                  styles.followButton,
                  { backgroundColor: 'white' },
                ]}
                textStyle={{
                  fontSize: 3.5,
                  color: '#000000',
                  fontFamily: Fonts.SourceSansProSemiBold,
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default FriendsCards;
const styles = {
  cardContainer: {
    height: wp('22'),
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
  },
  imageContainer: {
    height: wp('15'),
    width: wp('15'),
    borderRadius: wp('15'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('15'),
    width: wp('15'),
  },
  profileImage: {
    height: wp('15'),
    width: wp('15'),
    borderRadius: wp('15'),
  },
  unseenBadge: {
    borderRadius: wp('10'),
    backgroundColor: '#0089FF',
    position: 'absolute',
    right: 0,
    fontSize: 3,
    paddingVertical: wp('0.7'),
    paddingHorizontal: wp('1.5'),
    color: 'white',
    fontFamily: Fonts.OpenSansRegular,
    elevation: 1,
  },
  nameContainer: {
    marginLeft: wp('3'),
    width: wp('45'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
    justifyContent: 'center',
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
    // maxHeight: wp('4.5'),
    marginBottom: wp('1'),
  },
  time: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.6,
    maxHeight: wp('8'),
    color: '#797979',
    opacity: 0.5,
    maxWidth: wp('40'),
  },
  buttonContainer: {
    // flexGrow: 1,
    justifyContent: 'center',
  },
  followButton: {
    height: wp('8.5'),
    width: wp('25'),
    borderRadius: wp('10'),
    borderWidth: wp('0.4'),
    borderColor: '#000000',
    elevation: 0,
    marginTop: wp('1'),
  },
  followButton1: {
    height: wp('8.5'),
    width: wp('25'),
    borderRadius: wp('10'),
    borderWidth: wp('0.4'),
    borderColor: '#42d278',
    elevation: 0,
    marginTop: wp('1'),
  },
};
