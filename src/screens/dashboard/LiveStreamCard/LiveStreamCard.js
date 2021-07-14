/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import get from 'lodash/get';
import { LIVE_STATUS } from '../../../utils/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Fonts from '../../../themes/Fonts';
import ResponsiveText from '../../../components/ResponsiveText';

const LiveStreamCard = ({ data, onPress }) => {
  const liveStatus = get(data, 'liveStatus', LIVE_STATUS.PREPARE);
  let statusIcon = null;
  switch (liveStatus) {
    case LIVE_STATUS.PREPARE:
      statusIcon = (
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Waiting</Text>
      );
      break;
    case LIVE_STATUS.ON_LIVE:
      statusIcon = (
        <Text style={{ color: 'red', fontWeight: 'bold' }}>Is Live</Text>
      );
      break;
    case LIVE_STATUS.FINISH:
      statusIcon = (
        <Text style={{ color: 'green', fontWeight: 'bold' }}>Streamed</Text>
      );
      break;
    default:
      statusIcon = (
        <Image source={require(`../../../assets/ico_wait.png`)} resizeMode={'contain'} style={styles.statusIcon} />
      );
      break;
  }
  return (

    <TouchableOpacity onPress={() => onPress(data)} style={styles.container}>
      <Image source={{ uri: 'https://picsum.photos/id/215/200' }} style={styles.image} />
      <ResponsiveText style={styles.title}>{data ? data.roomName : 'Live streams'}</ResponsiveText>

      <ResponsiveText style={styles.detailsText}>{statusIcon}</ResponsiveText>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    width: wp('32'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
    overflow: 'hidden',
  },
  image: {
    height: wp('39'),
    width: wp('32'),
    borderRadius: wp('3.5'),
    backgroundColor: '#F3F3F3',
  },
  infoContainer: {
    position: 'absolute',
    bottom: wp('4'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2'),
  },
  profileImage: {
    height: wp('8'),
    width: wp('8'),
    borderWidth: wp('0.4'),
    borderColor: '#0089FF',
    borderRadius: wp('8'),
    marginRight: wp('1'),
  },
  name: {
    fontSize: 3,
    color: 'white',
    fontFamily: Fonts.RobotoRegular,
  },
  timeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '91%',
  },
  title: {
    fontSize: 3.8,
    fontFamily: Fonts.OpenSansRegular,
    marginTop: wp('2.5'),
  },
  detailsText: {
    fontSize: 3,
    color: '#B5B5B5',
    fontFamily: Fonts.RobotoBold,
  },
})



LiveStreamCard.propTypes = {
  data: PropTypes.shape({}),
  onPress: PropTypes.func,
};

LiveStreamCard.defaultProps = {
  data: null,
  onPress: () => null,
};
export default LiveStreamCard;
