/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, Image, Modal, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../components/ResponsiveText'
import Fonts from '../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../utils/env';
import showNotification from '../utils/services'


class MessageBubble extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }


  render() {
    const { sent_by, profile_image, type, text, file, seen, index, length, image_url, thumbnail, USERID } = this.props


    return (
      <View style={styles.container}>
        {type == 'text' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== USERID ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== USERID && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={{ uri: BASE_URL + profile_image }}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                borderTopRightRadius: sent_by !== USERID ? wp('4') : 0,
                borderTopLeftRadius: sent_by !== USERID ? 0 : wp('4'),
                borderBottomLeftRadius: wp('4'),
                borderBottomRightRadius: wp('4'),
                overflow: 'hidden',
              }}>
              <ResponsiveText
                style={{
                  backgroundColor: sent_by !== USERID ? '#F2F2F2' : '#fff7dd',
                  maxWidth: wp('63'),
                  padding: wp('3'),
                  fontSize: 3,
                  fontFamily: Fonts.OpenSansRegular,

                }}>
                {text}
              </ResponsiveText>
            </View>
            {sent_by == USERID ?
              <View style={{
                height: wp('1.5'),
                width: wp('1.5'),
                backgroundColor: seen ? '#0089FF' : '#a6acaf',
                borderRadius: wp('1.5'),
                position: 'absolute',
                right: 4,
                top: 14,
                elevation: 1,
              }} />
              : null}
          </View>
        )}
        {type == 'files' && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== USERID ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== USERID && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={{ uri: BASE_URL + profile_image }}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                backgroundColor: sent_by !== USERID ? '#eeeeee' : '#B7DEFF',
                maxWidth: wp('63'),
                padding: wp('4'),
                borderTopRightRadius: sent_by !== USERID ? wp('6') : 0,
                borderTopLeftRadius: sent_by !== USERID ? 0 : wp('6'),
                borderBottomLeftRadius: wp('6'),
                borderBottomRightRadius: wp('6'),
                fontSize: 3,
                fontFamily: Fonts.OpenSansRegular,
                marginTop: wp('1'),
                justifyContent: 'space-between',
                alignItems: sent_by !== 1 ? 'flex-start' : 'flex-end',
              }}>
              <TouchableOpacity onPress={() => this.setState({ isOpen: true })}>
                <Image source={{ uri: BASE_URL + image_url }} style={styles.postImage} />
              </TouchableOpacity>
              {text.length > 0 && (
                <ResponsiveText style={styles.imageText}>{text}</ResponsiveText>
              )}
            </View>
            {sent_by == USERID ?
              <View style={{
                height: wp('1.5'),
                width: wp('1.5'),
                backgroundColor: seen ? '#0089FF' : '#a6acaf',
                borderRadius: wp('1.5'),
                position: 'absolute',
                right: 4,
                top: 14,
                elevation: 1,
              }} />
              : null}
          </View>
        )}
        {type == 3 && (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: sent_by !== USERID ? 'flex-start' : 'flex-end',
              paddingHorizontal: wp('4'),
            }}>
            {sent_by !== USERID && (
              <View style={styles.headerprofileImageContainer}>
                <Image
                  source={{ uri: BASE_URL + profile_image }}
                  style={styles.headerProfileImage}
                />
              </View>
            )}
            <View
              style={{
                backgroundColor: sent_by !== USERID ? '#eeeeee' : '#B7DEFF',
                maxWidth: wp('63'),
                padding: wp('4'),
                borderTopRightRadius: sent_by !== USERID ? wp('6') : 0,
                borderTopLeftRadius: sent_by !== USERID ? 0 : wp('6'),
                borderBottomLeftRadius: wp('6'),
                borderBottomRightRadius: wp('6'),
                fontSize: 3,
                fontFamily: Fonts.OpenSansRegular,
                marginTop: wp('1'),
                justifyContent: 'space-between',
                alignItems: sent_by !== USERID ? 'flex-start' : 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MessageBubbleVideo', {
                  image_url: image_url
                })}>
                <ImageBackground
                  source={{ uri: SOCKET_IO_SERVER + thumbnail }}
                  style={styles.postImage12}
                >
                  <Image
                    source={require('../assets/icons/smallplay.png')}
                    style={styles.postImage11}
                  />
                </ImageBackground>
              </TouchableOpacity>
              {text.length > 0 && (
                <ResponsiveText style={styles.imageText}>{text}</ResponsiveText>
              )}
            </View>
            {sent_by == USERID ?
              <View style={{
                height: wp('1.5'),
                width: wp('1.5'),
                backgroundColor: seen ? '#0089FF' : '#a6acaf',
                borderRadius: wp('1.5'),
                position: 'absolute',
                right: 4,
                top: 14,
                elevation: 1,
              }} />
              : null}
          </View>
        )}
        <Modal
          visible={this.state.isOpen}
          transparent={true}
        >
          <View style={{ backgroundColor: "black", flex: 1, justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.setState({ isOpen: false })}
              style={styles.crossContainer}>
              <Image
                source={require('../assets/icons/cross.png')}
                style={styles.cross}
              />
            </TouchableOpacity>
            {this.state.loadingVideoback && (
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.3)',

                  position: 'absolute',
                  zIndex: 1000,
                }}>
                <ActivityIndicator
                  color={'white'}
                  size={'large'}
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    top: 0,
                    bottom: 0,
                  }}
                />
              </View>
            )}
            {type == 1 && (
              <ImageBackground source={{ uri: SOCKET_IO_SERVER + image_url }}
                style=
                {{
                  height: '100%',
                  width: '100%',
                  resizeMode: 'contain',
                }}
              >
              </ImageBackground>
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

export default MessageBubble;

const styles = {
  container: {
    marginVertical: wp('2'),
  },
  textStyle: {},
  headerProfileImage: {
    height: wp('9.5'),
    width: wp('9.5'),
    borderRadius: wp('9.5'),
    backgroundColor: '#F3F3F3',
  },
  headerprofileImageContainer: {
    height: wp('12'),
    width: wp('12'),
    borderRadius: wp('12'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3'),
  },
  postImage: {
    height: wp('38'),
    width: wp('35'),
  },
  postImage12: {
    height: wp('38'),
    width: wp('35'),
    justifyContent: 'center',
    alignItems: "center"
  },
  postImage11: {
    resizeMode: 'center',
  },
  imageText: {
    marginTop: wp('3'),
    fontSize: 3,
    fontFamily: Fonts.OpenSansRegular,
  },
  cross: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
  },
  crossContainer: {
    position: 'absolute',
    top: wp('5'),
    right: wp('5'),
    zIndex: 20,
  },

};
