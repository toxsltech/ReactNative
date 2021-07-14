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
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../utils/services'

class ViewersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: this.props.following,
      difference: '',
      postID: this.props.postID,
      profilestate: false
    };
  }

  componentDidMount = () => {
    this.timedifference()
  }

  timedifference = () => {
    const { time } = this.props;
    let abc = new Date(time)
    let mili = abc.valueOf()
    let today = Date.now()
    let xyz = today - mili
    let cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(xyz / cd),
      h = Math.floor((xyz - d * cd) / ch),
      m = Math.round((xyz - d * cd - h * ch) / 60000)
    let min = m + ' ' + 'min ago';
    let hours = h + ' ' + 'hours ago ';
    let day = d + ' ' + 'days ago'
    if (d > 0) {
      this.setState({ difference: day })
    } else if (h > 0) {
      this.setState({ difference: hours })
    } else if (m > 0) {
      this.setState({ difference: min })
    } else {
      this.setState({ difference: 'few seconds ago' })
    }
  }
  onFollow = () => {
    const { postID } = this.state
    this.props.onFollow(postID).then(() => this.afterFollow())
  }

  afterFollow = () => {
    this.setState((prev) => ({ following: !prev.following }))
  }

  onUnFollowRequest = () => {
    const { postID } = this.state
    this.props.onUnFollow(postID).then(() => this.afterUnFollow())
  }

  afterUnFollow = () => {
    this.setState((prev) => ({ following: !prev.following }))
  }

  followindviewer = async () => {
    try {
      await AsyncStorage.setItem('Viewersfollowing', 'true')
    } catch (e) {
      showNotification("danger", e);
    }
  }

  render() {
    const { profile_image, user_name, userID, userId } = this.props;
    const { postID } = this.state;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              onPress={() => { userId != postID ? this.props.navigation.navigate('OtherProfile', { postID: postID }) : null }}
            >
              <View style={styles.imageContainer}>
                <ImageBackground
                  source={require('../../assets/images/placeholder.png')}
                  style={styles.placeholderImage}>
                  {profile_image ? (
                    <Image
                      source={
                        profile_image
                          ? { uri: BASE_URL + profile_image }
                          : require('../../assets/images/model.jpg')
                      }
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/model.jpg')}
                      style={styles.profileImage}
                    />
                  )}
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{user_name}</ResponsiveText>
          </View>
          <View style={styles.buttonContainer}>
            {userID != postID ?
              <Button
                onPress={() => {
                  this.followindviewer()
                  !this.state.following ? this.onFollow() : this.onUnFollowRequest()
                }}
                text={this.state.following ? 'Following' : 'Follow'}
                containerStyle={[
                  styles.followButton,
                  {
                    backgroundColor: this.state.following ? 'white' : '#f8cc14',
                    borderColor: this.state.following ? '#000000' : '#f8cc14'
                  },
                ]}
                textStyle={{
                  fontSize: 3.5,
                  color: this.state.following ? '#000000' : '#000000',
                  fontFamily: Fonts.SourceSansProSemiBold,
                }}
              /> : null}
          </View>
        </View>
      </View>
    );
  }
}


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
    backgroundColor: '#000000',
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
    justifyContent: "center",
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
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
};
export default ViewersCard;