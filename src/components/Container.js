/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {SafeAreaView, Image, Dimensions, StatusBar, View} from 'react-native';

export default class Container extends React.Component {
  render() {
    const {statusBarColor, backgroundImageStyle} = this.props;
    let color = statusBarColor ? statusBarColor : 'white';
    let barStyle = this.props.barStyle ? this.props.barStyle : 'dark-content';
    return (
      <View style={[styles.container, this.props.style]}>
        <StatusBar backgroundColor={color} barStyle={barStyle} />
        {this.props.backgroundImage && (
          <Image
            source={this.props.backgroundImage}
            style={[styles.backgroundImage, backgroundImageStyle]}
          />
        )}
        {this.props.overlay && <View style={styles.overlayStyle} />}
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};
