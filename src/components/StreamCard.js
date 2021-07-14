/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from './ResponsiveText';
import Fonts from '../themes/Fonts';
import get from 'lodash/get';

class StreamCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listLiveStream: [],
    };
  }

  componentDidMount() {
  }

  onPressCardItem = (data) => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    this.props.navigation.navigate('Viewer', { userName, data });
  };

  render() {
    const { data } = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.onPressCardItem()}
        style={styles.container}>
        <Image source={{ uri: 'https://picsum.photos/id/215/200' }} style={styles.image} />
        <ResponsiveText style={styles.title}>{data ? data.userName : 'Live streams'}</ResponsiveText>
        <View style={styles.timeDetails}>
          <ResponsiveText style={styles.detailsText}>10 am</ResponsiveText>
          <ResponsiveText style={styles.detailsText}>
            Freedom Trial
          </ResponsiveText>
        </View>
      </TouchableOpacity>
    );
  }
}

export default StreamCard;

const styles = {
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
};
