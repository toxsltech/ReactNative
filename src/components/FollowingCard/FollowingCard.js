/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import ResponsiveText from '../ResponsiveText';
import Fonts from '../../themes/Fonts';
import Button from '../Button';
import { BASE_URL } from '../../utils/env';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../utils/services'

class FollowingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following,
    };
  }
  componentDidMount() {
    this.followindrefresh()
  }

  followindrefresh = async () => {
    try {
      await AsyncStorage.setItem('followindrefresh', 'true')
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const USERID = await AsyncStorage.getItem('USERID')
      this.setState({ userId: USERID })
    } catch (e) {
      showNotification("danger", e);

    }
  }

  onUnFollowRequest = () => {
    const { id } = this.props
    this.props.onUnFollow(id).then(() => this.afterUnFollow())
  }

  afterUnFollow = () => {
    const following = this.props.unfollowResponse
    this.setState((prev) => ({ following: !prev.following }))
  }

  onFollow = () => {
    const { id } = this.props
    this.props.onFollow(id).then(() => this.afterFollow())
  }

  afterFollow = () => {
    const following = this.props.followResponse.message
    this.setState((prev) => ({ following: !prev.following }))
  }

  render() {
    const { profile_image, user_name, status, id } = this.props;
    const { following } = this.state;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('OtherProfile', { postID: id })
        }
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../../assets/images/placeholder.png')}
                style={styles.placeholderImage}>
                {profile_image == '' ?
                  <Image
                    source={require('../../assets/images/model.jpg')}
                    style={styles.profileImage}
                  /> :
                  <FastImage
                    style={styles.profileImage}
                    source={{
                      uri: BASE_URL + profile_image,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                  />
                }
              </ImageBackground>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{user_name}</ResponsiveText>
            <ResponsiveText style={styles.Status}>{status}</ResponsiveText>
          </View>
          <View style={styles.buttonContainer}>
            {this.state.userId != id ?
              <Button
                onPress={() => {
                  !following ? this.onFollow() : this.onUnFollowRequest()
                }}
                text={!following ? 'Follow' : 'Unfollow'}
                containerStyle={[
                  styles.followButton,
                  {
                    backgroundColor: !following ? '#ffce31' : 'white',
                    borderColor: !following ? '#ffce31' : '#000000'
                  },
                ]}
                textStyle={{
                  fontSize: 3.5,
                  color: !following ? '#000000' : '000000',
                  fontFamily: Fonts.SourceSansProSemiBold,
                }}
              />
              : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FollowingCard;
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
    height: wp('16'),
    maxHeight: wp('16'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
    maxHeight: wp('5.6'),
    marginBottom: wp('1'),
  },
  Status: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.6,
    maxHeight: wp('8'),
    color: '#797979',

    maxWidth: wp('40'),
  },
  buttonContainer: {},
  followButton: {
    height: wp('8.5'),
    width: wp('25'),
    borderRadius: wp('10'),
    borderWidth: wp('0.4'),
    borderColor: '#000000',
    elevation: 0,
    marginTop: wp('1'),
  },
};
