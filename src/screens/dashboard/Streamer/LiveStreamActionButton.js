/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { LIVE_STATUS } from '../../../utils/constants';
import styles from './styles';

const LiveStreamActionButton = ({ currentLiveStatus, onPress }) => {

  let backgroundColor = 'green';
  let text = 'Start';

  if (Number(currentLiveStatus) === Number(LIVE_STATUS.ON_LIVE)) {
    backgroundColor = 'red';
    text = 'End';
  }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnBeginLiveStream, { backgroundColor }]}>
      <Text style={styles.beginLiveStreamText}>{text}</Text>
    </TouchableOpacity>
  );
};

LiveStreamActionButton.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  currentLiveStatus: PropTypes.number,
  onPress: PropTypes.func,
};

LiveStreamActionButton.defaultProps = {
  navigation: {
    goBack: () => null,
  },
  currentLiveStatus: LIVE_STATUS.PREPARE,
  onPress: () => null,
};

export default LiveStreamActionButton;
