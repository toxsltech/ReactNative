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
  FlatList,
  Keyboard,

} from 'react-native';
import Container from '../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../../components/ResponsiveText';
import Fonts from '../../../themes/Fonts';
import Button from '../../../components/Button';
import { RNCamera } from 'react-native-camera';
import { Categories } from '../../../components/DummyData';
import InputField from '../../../components/InputField';
import { LIVE_STATUS } from '../../../utils/constants';


class GoLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryOpen: false,
      selectedCategory: '',
      showLiveButton: true,
      caption: 'Tricsy saturday night hits',
      currentLiveStatus: LIVE_STATUS.PREPARE,
      userName: ''
    };
  }

  componentDidMount() {
    const Info = this.props.getprofileResponse
      ? this.props.getprofileResponse.data
      : '';

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ showLiveButton: false });
      },
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({ showLiveButton: true });
      },
    );
  }


  onPressLiveStreamNow = () => {
    const userName = this.props.getprofileResponse.data.userName;
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Streamer', { userName, roomName: userName });


  };
  render() {
    const {
      isCategoryOpen,
      selectedCategory,
      showLiveButton,
      caption,
    } = this.state;

    return (
      <Container>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={[
            styles.topContainer,
            { height: isCategoryOpen ? '30%' : '60%' },
          ]}
          type={'front'}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <Image
            source={require('../../../assets/icons/camera2.png')}
            style={styles.cameraIcon}
          />
        </RNCamera>
        <View
          style={[
            styles.bottomContainer,
            { height: isCategoryOpen ? '75%' : '40%' },
          ]}>
          {!isCategoryOpen && (
            <>
              <InputField
                inputField={styles.headerText}
                value={caption}
                containerStyle={styles.Input}
                onChangeText={(e) => this.setState({ caption: e })}
              />
              <View style={styles.clearFix} />
            </>
          )}
          <TouchableOpacity
            onPress={() => {
              this.setState((prev) => ({
                isCategoryOpen: !prev.isCategoryOpen,
                showLiveButton: prev.isCategoryOpen ? true : false,
              }));
            }}
            activeOpacity={0.2}
            style={styles.chooseCatagoryContainer}>
            <ResponsiveText style={styles.selectCategoryText}>
              {selectedCategory ? selectedCategory : 'Select a category'}
            </ResponsiveText>
            <Image
              source={
                isCategoryOpen
                  ? require('../../../assets/icons/chevron_up.png')
                  : require('../../../assets/icons/chevron_down.png')
              }
              style={styles.downIcon}
            />
          </TouchableOpacity>
          {isCategoryOpen && (
            <FlatList
              data={Categories}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `${index}`}
              contentContainerStyle={{
                paddingTop: wp('3'),
                paddingHorizontal: wp('2.5'),
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          showLiveButton: true,
                        },
                        () => { this.onPressLiveStreamNow() }
                      );
                    }}
                    style={styles.categoryItemContainer}>
                    <ResponsiveText style={styles.categoryItemText}>
                      {item}
                    </ResponsiveText>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        {showLiveButton && !isCategoryOpen && (
          <Button
            text={'Go Live'}
            containerStyle={styles.GoLiveButton}
            textStyle={styles.buttonText}
            onPress={this.onPressLiveStreamNow}
          />
        )}
      </Container>
    );
  }
}

export default GoLive;

const styles = {
  topContainer: {
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: wp('6'),
    paddingTop: wp('6'),
  },
  cameraIcon: {
    height: wp('16'),
    width: wp('16'),
    resizeMode: 'contain',
  },
  headerText: {
    color: '#181818',
    fontFamily: Fonts.OpenSansRegular,
    paddingLeft: wp('3.5'),
  },
  selectCategoryText: {
    color: '#181818',
    fontFamily: Fonts.OpenSansRegular,
  },

  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    marginTop: wp('4'),
    marginBottom: wp('3'),
  },
  chooseCatagoryContainer: {
    height: wp('15'),
    borderWidth: wp(0.5),
    borderColor: '#F9F9F9',
    elevation: 2.5,
    backgroundColor: 'white',
    borderRadius: wp('2'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5'),
    alignItems: 'center',
  },
  downIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
  },
  GoLiveButton: {
    position: 'absolute',
    bottom: wp('8'),
    height: wp('15'),
    width: wp('85'),
    alignSelf: 'center',
    backgroundColor: '#ffce31',
  },
  buttonText: {
    fontFamily: Fonts.SourceSansProSemiBold,
    fontSize: 4.5,
    color: '#000000',
    fontWeight: 'bold'
  },
  categoryItemContainer: {
    paddingHorizontal: wp('3'),
    paddingVertical: wp('3'),
  },
  categoryItemText: {
    color: '#181818',
    fontFamily: Fonts.OpenSansRegular,
  },
  Input: {
    width: wp('80'),
    height: wp('6'),
    borderWidth: 0,
    borderRadius: 0,
    paddingLeft: 0,
  },
};
