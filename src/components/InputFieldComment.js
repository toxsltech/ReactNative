/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Fonts from '../themes/Fonts';

export default class InputFieldComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  onSubmitEditing() {
    this.setState({ active: true });
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing();
    }
  }

  onFocus() {
    this.setState({ active: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    this.setState({ active: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  getTInputFocus = () => {
    this.TextInputRef.focus()
  }

  render() {
    const { rightPress } = this.props;
    const Right = rightPress ? TouchableOpacity : View;
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {this.props.leftIcon && (
            <View style={[this.props.leftStyle, styles.leftStyle]}>
              {this.props.leftIcon}
            </View>
          )}
          <TextInput
            ref={ref => {
              this.TextInputRef = ref
            }}
            autoFocus={this.props.autoFocus || false}
            autoCapitalize={this.props.autoCapitalize}
            onChangeText={this.props.onChangeText}
            style={[styles.inputField, this.props.inputField]}
            placeholder={this.props.placeholder}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={this.props.placeholderTextColor}
            value={this.props.value}
            keyboardType={
              this.props.keyboardType ? this.props.keyboardType : 'default'
            }
            secureTextEntry={
              this.props.secureTextEntry ? this.props.secureTextEntry : false
            }
            textAlignVertical={
              this.props.textAlignVerticalTop ? 'top' : 'center'
            }
            multiline={this.props.multiline}
            numberOfLines={this.props.numberOfLines ? 5 : 1}
            onBlur={this.onBlur.bind(this)}
            onFocus={this.onFocus.bind(this)}
            editable={this.props.editable}
            returnKeyType={this.props.search}
            onSubmitEditing={this.onSubmitEditing.bind(this)}
          />
        </View>
        {this.props.right && (
          <>
            {this.props.CameraIcon && (
              <TouchableOpacity
                onPress={this.props.CameraPress}
                style={styles.cameraContainer}>
                <Image
                  source={require('../assets/icons/camera.png')}
                  style={{
                    height: wp('6'),
                    width: wp('6'),
                    tintColor: '#9A9A9A',
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
            <Right
              style={[this.props.rightStyle, styles.rightStyle]}
              onPress={rightPress}>
              {this.props.right}
            </Right>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: wp('12.5%'),
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: wp('5')
  },
  leftStyle: {
    paddingLeft: 2,
  },
  inputField: {
    flex: 1,
    width: '100%',
    fontSize: wp('3.8%'),
    fontFamily: Fonts.OpenSansRegular,
    color: 'grey',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: '#969696',
    fontSize: wp('20%'),
  },
  rightStyle: {
    padding: 10,
  },
  cameraContainer: {
    height: wp('6'),
    width: wp('6'),
    marginRight: wp('1'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
