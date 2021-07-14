/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default class AppHeader extends Component {
  render() {
    return (
      <View style={[styles.customStyle, this.props.containerStyle]}>
        {this.props.titleLeftAlign ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[this.props.leftStyle]}>
              {this.props.left && (
                <TouchableOpacity
                  style={{ padding: 0, flexDirection: 'row' }}
                  onPress={this.props.leftPress}>
                  {this.props.left}
                  <View style={[{ marginLeft: 7 }, this.props.bodyStyle]}>
                    {this.props.body}
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : (
          <>
            <View style={[styles.left, this.props.leftStyle]}>
              {this.props.left && (
                <TouchableOpacity
                  onPress={this.props.leftPress}>
                  {this.props.left}
                </TouchableOpacity>
              )}
            </View>
            <View style={[styles.body, this.props.bodyStyle]}>
              {this.props.body}
            </View>
          </>
        )}
        <View style={[styles.right, this.props.rightStyle]}>
          {this.props.right && (
            <TouchableOpacity onPress={this.props.rightPress}>
              {this.props.right}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const styles = {
  customStyle: {
    height: wp('12%'),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp('5.5'),
    marginTop: wp('4'),
    marginBottom: wp('4'),
  
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  body: {
    flex: 2,
    alignItems: 'center',
  },
  right: {
    flex: 1,
    alignItems: 'flex-end',
  },
};
