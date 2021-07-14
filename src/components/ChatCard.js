/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image } from 'react-native-animatable';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import { BASE_URL } from '../utils/env';
import moment from "moment";


class ChatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difference: '',

    };
  }

  componentDidMount = () => {
    this.timedifference()
  }

  timedifference = () => {
    const { time } = this.props
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

  render() {
    const { difference } = this.state
    const {
      profile_image,
      user_name,
      unseen_messsages,
      last_message,
      chatId,
      postID,
      typing,
      time, type

    } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Messages', {
            profile_image,
            user_name,
            difference,
            unseen_messsages,
            last_message,
            chatId,
            postID,
            typing
          })
        }
        activeOpacity={0.8}
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={require('../assets/images/placeholder.png')}
                style={styles.placeholderImage}
              >
                <Image
                  source={{ uri: BASE_URL + profile_image }}
                  style={styles.profileImage}
                />
              </ImageBackground>
            </View>
            {unseen_messsages != '0' && (
              <View style={styles.unseenBadge}>
                <ResponsiveText
                  style={{
                    fontSize: 3,
                    color: '#000',
                    fontFamily: Fonts.OpenSansRegular,
                  }}>
                  {unseen_messsages}
                </ResponsiveText>
              </View>
            )}
          </View>
          <View style={styles.nameContainer}>
            <ResponsiveText style={styles.name}>{user_name}</ResponsiveText>
            {!typing ?
              <ResponsiveText style={styles.lastMessage}>
                {type == 1 ? 'sent an image' : type == 3 ? 'sent a video' : last_message}
              </ResponsiveText> :
              <ResponsiveText style={styles.lastMessage}>
                {'Typing....'}
              </ResponsiveText>}
          </View>
          <View style={styles.timeContainer}>
            <ResponsiveText style={styles.time}>{moment(time).calendar()}</ResponsiveText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ChatCard;
const styles = {
  cardContainer: {
    height: wp('21'),
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
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
    overflow: 'hidden',
  },
  placeholderImage: {
    height: wp('14'),
    width: wp('14'),
  },
  profileImage: {
    height: wp('14'),
    width: wp('14'),
    borderRadius: wp('14'),
  },
  unseenBadge: {
    borderRadius: wp('10'),
    backgroundColor: '#ffce31',
    position: 'absolute',
    right: 0,
    paddingVertical: wp('0.5'),
    paddingHorizontal: wp('1.5'),
    elevation: 1,
  },
  nameContainer: {
    marginLeft: wp('3'),
    width: wp('55'),
    height: wp('14'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    marginTop: wp('1'),
  },
  name: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.4,
    marginBottom: wp('0.5'),
    color: 'black',
  },
  lastMessage: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.2,
    maxHeight: wp('6'),
    color: '#3A3A3A',
    opacity: 0.6,
  },
  timeContainer: {
    flexGrow: 1,
    marginLeft: -15

  },
  time: {
    fontSize: 2.5,
    marginTop: wp('1'),
    color: '#3A3A3A',
    opacity: 0.5,
  },
};
