/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';

class HashtagCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { Hashtag } = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')}
        style={styles.cardContainer}>
        <View style={styles.innerContainer}>
          <View>
            <View style={styles.HashContainer}>
              <Image
                source={require('../assets/icons/hashtag.png')}
                style={styles.hashtag}
              />
            </View>
          </View>
          <View style={styles.HashNameContainer}>
            <ResponsiveText style={styles.HashTagText}>
              {Hashtag}
            </ResponsiveText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default HashtagCard;
const styles = {
  cardContainer: {
    height: wp('23'),
    borderBottomWidth: wp('0.3'),
    borderColor: '#E1E1E1',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    height: wp('15'),
    flexDirection: 'row',
  },
  HashContainer: {
    height: wp('15'),
    width: wp('15'),
    borderRadius: wp('15'),
    overflow: 'hidden',
    backgroundColor: '#E6F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  HashNameContainer: {
    marginLeft: wp('4.5'),
    width: wp('45'),
    height: wp('15'),
    maxHeight: wp('14'),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  HashTagText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.3,
  },
  hashtag: {
    height: '45%',
    width: '45%',
    resizeMode: 'contain',
    tintColor: '#02585f',
  },
};
