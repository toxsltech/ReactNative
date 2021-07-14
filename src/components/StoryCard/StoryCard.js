/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  View, Image, TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../ResponsiveText';
import Fonts from '../../themes/Fonts';
import { BASE_URL } from '../../utils/env';
import FastImage from 'react-native-fast-image';

class StoryCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOptionOpen: false,
      Stories: [],
      name: '',
      profile: '',
      Story: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.postMenu !== prevProps.postMenu) { this.toggleMenu(); }
  }

  toggleMenu = () => { this.setState({ isOptionOpen: false }); };

  render() {
    const { profile_image, user_name, post_url, postID, following } = this.props;

    return (
      <View>
        {following ?
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('OtherStory', {
                myStory: false, postID: postID,
              })
            }
            style={styles.container}>

            <FastImage
              style={styles.image}
              source={{
                uri: BASE_URL + post_url[0],
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.infoContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OtherProfile', { postID: postID })}
              >
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
              </TouchableOpacity>
              <ResponsiveText style={styles.name}>
                {user_name.length < 12
                  ? user_name
                  : `${user_name.substring(0, 10)}...`}
              </ResponsiveText>
            </View>
          </TouchableOpacity>
          : null
        }
      </View>
    )
  }
}

export default StoryCard;

const styles = {
  container: {
    height: wp('39'),
    borderRadius: wp('3.5'),
    width: wp('32'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
    overflow: 'hidden',
    backgroundColor: '#3C3F41',
  },
  image: {
    height: wp('39'),
    width: wp('32'),
    opacity: 0.7,
  },
  infoContainer: {
    width: '100%',
    position: 'absolute',
    bottom: wp('2.5'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2.5'),
  },
  profileImage: {
    height: wp('8'),
    width: wp('8'),
    borderWidth: wp('0.4'),
    borderColor: '#0089FF',
    borderRadius: wp('8'),
    marginRight: wp('1.5'),
    backgroundColor: '#F2F9FF',
  },
  name: {
    fontSize: 3,
    color: 'white',
    fontFamily: Fonts.RobotoRegular,

  },
};
