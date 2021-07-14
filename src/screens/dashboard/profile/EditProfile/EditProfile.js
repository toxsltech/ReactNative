/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
  Text,
  Platform, ActivityIndicator, StatusBar
} from 'react-native';
import Container from '../../../../components/Container';
import AppHeader from '../../../../components/AppHeader';
import ResponsiveText from '../../../../components/ResponsiveText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen/index';
import Fonts from '../../../../themes/Fonts';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';
import { CodesList } from '../../../../components/countryWithFlag/CountryCodes';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
import { BASE_URL } from '../../../../utils/env';
import { isEmpty, isValidEmail, PhoneRegex } from '../../../../utils/globals';
import CodePickerModal from '../../../../components/countrySelector/CodePickerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../../utils/services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const options = {
  title: 'Select Picture',
  quality: 0.75,
  storageOptions: {
    skipBackup: true,
  },
};

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      countryFlag: '',
      countryCode: '',
      countryModal: false,
      date: 1134197088731,
      showDatePicker: false,
      showGenderModal: false,
      gender: '',
      Image: '',
      username: '',
      email: '',
      phoneNo: '',
      description: '',
      userId: '',
      profile: '',
      codeModal: false,
      refreshvalueprofile: 'true',
      loadingVideoback: false
    };
  }

  countryFlagHandler = (flag, name) => {
    this.setState({
      country: name,
      countryFlag: flag,
      countryModal: false,
    });
  };
  onCodeSelect = item => {
    this.setState({
      code: `+${item.dialCode}`,
      country: item.name,
      codeModal: false,
    });
  };

  getImage = async () => {
    try {
      await AsyncStorage.setItem('refreshvalueprofile', this.state.refreshvalueprofile)
    } catch (e) {
      showNotification("danger", e);

    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        let ImgSource = {
          name:
            response.fileName !== null ? response.fileName : response.fileName,
          type: 'image/*',
          uri: response
            ? Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', '')
            : null,
        };
        if (!ImgSource.name) {
          ImgSource.name = 'img';
        }
        const source = { uri: response.uri };
        this.setState({ Image: ImgSource });
      }
    });
  };

  componentDidMount() {
    const Info = this.props.getprofileResponse
      ? this.props.getprofileResponse.data
      : '';

    this.setState({
      profile: Info.profileImg,
      username: Info.userName,
      email: Info.email,
      phoneNo: Info.phoneNo ? String(Info.phoneNo) : '',
      gender: Info.gender ? Info.gender : '',
      countryCode: Info.countryCode ? Info.countryCode : '',
      description: Info.description,
      date: Info.birthday ? parseInt(Info.birthday) : 1134197088731,
      country: Info.country ? Info.country : '',
      userId: Info._id,
    });
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData()
    });
  }
  getData = async () => {

  }
  verifyCredentials = () => {
    const { username, email, phoneNo, gender, description } = this.state;
    if (isEmpty(username.trim())) {
      alert('Please enter user name');
      return false;
    } else if (isEmpty(phoneNo.trim())) {
      alert('Please enter phone number');
      return false;
    } else if (!phoneNo.match(PhoneRegex)) {
      alert('Please enter valid phone number');
      return false;
    } else if (isEmpty(email.trim())) {
      alert('Please enter email address');
      return false;
    } else if (!isValidEmail(email.trim())) {
      alert('Please enter valid email address');
      return false;
    } else if (isEmpty(gender.trim())) {
      alert('Please choose gender');
      return false;
    }
    else if (description == undefined) {
      alert('Please enter description');
      return false;
    }
    else if (isEmpty(description.trim())) {
      alert('Please enter description');
      return false;
    }
    return true;
  };

  openCodeModal = () => {
    this.setState({ codeModal: true });
  };

  onSaveProfile = () => {
    const {
      userId,
      Image,
      username,
      email,
      phoneNo,
      gender,
      date,
      countryCode,
      country,
      description, profile
    } = this.state;
    if (this.verifyCredentials()) {
      this.setState({ loadingVideoback: true })
      this.props
        .onupdateProfile(
          userId,
          Image == '' ? profile : Image,
          username,
          email,
          phoneNo,
          gender,
          date,
          countryCode,
          country,
          description
        )
        .then(() => this.afterUpdate());
    }
  }

  afterUpdate = () => {
    this.props.onGetProfile().then(() => this.afterGetProfile());
  };

  afterGetProfile = () => {
    this.setState({ loadingVideoback: true })
    alert(this.props.updateprofileResponse.message);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View>
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

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
        >
          <Container
          >
            <StatusBar
              translucent backgroundColor="transparent"
              barStyle='light-content'
            />
            <AppHeader
              titleLeftAlign
              containerStyle={styles.header}
              left={
                <View style={styles.leftIconContainer}>
                  <Image
                    source={require('../../../../assets/icons/left_chevron2.png')}
                    style={styles.HeaderleftIcon}
                  />
                </View>
              }
              leftPress={() => this.props.navigation.goBack()}
              body={
                <ResponsiveText style={styles.headertitle}>
                  Edit Profile
                </ResponsiveText>
              }
            />

            <View style={styles.imageContainerBox}>
              <View style={styles.imageBoxTopContainer} />
              <View style={styles.imageBoxBottomContainer} />
              <TouchableOpacity
                onPress={this.getImage}
                style={styles.imageContainer}>
                {this.state.Image ? (
                  <Image
                    source={
                      this.state.Image
                        ? { uri: this.state.Image.uri }
                        : require('../../../../assets/images/model.jpg')
                    }
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={
                      this.state.profile
                        ? { uri: BASE_URL + this.state.profile }
                        : require('../../../../assets/images/model.jpg')
                    }
                    style={styles.image}
                  />
                )}
                <Image
                  source={require('../../../../assets/icons/camera.png')}
                  style={styles.cameraIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.formContent}>
              <ResponsiveText style={styles.fieldHeading}>
                User Name
              </ResponsiveText>
              <InputField
                inputField={styles.inputInternalStyle}
                containerStyle={styles.nameInput}
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
              {this.state.showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(this.state.date)}
                  mode={'date'}
                  display="spinner"
                  onChange={(event, date) => {
                    if (date) {
                      this.setState({
                        date: event.nativeEvent.timestamp,
                        showDatePicker: false,
                      });
                    }
                    this.setState({
                      date: event.nativeEvent.timestamp,
                      showDatePicker: false,
                    });
                  }}
                />
              )}
              <ResponsiveText style={styles.fieldHeading}>Email</ResponsiveText>
              <InputField
                inputField={styles.inputInternalStyle}
                containerStyle={styles.nameInput}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                keyboardType={'email-address'}
                editable={false}
              />
              <ResponsiveText style={styles.fieldHeading}>
                Phone Number
              </ResponsiveText>
              <InputField
                inputField={styles.inputInternalStyle}
                containerStyle={styles.nameInput}
                value={this.state.phoneNo}
                onChangeText={phoneNo => this.setState({ phoneNo })}
                keyboardType={'phone-pad'}
              />
              <ResponsiveText style={styles.fieldHeading}>
                Gender
              </ResponsiveText>
              <TouchableOpacity
                onPress={() => this.setState({ showGenderModal: true })}>
                <InputField
                  inputField={styles.inputInternalStyle}
                  containerStyle={styles.nameInput}
                  value={
                    this.state.gender ? this.state.gender : 'Choose gender'
                  }
                  editable={false}
                  right={
                    <Image
                      style={styles.downIcon}
                      source={require('../../../../assets/icons/chev_down2.png')}
                    />
                  }
                />
              </TouchableOpacity>

              <ResponsiveText style={styles.fieldHeading}>
                Date of Birth
              </ResponsiveText>
              <TouchableOpacity
                onPress={() => this.setState({ showDatePicker: true })}>
                <InputField
                  inputField={styles.inputInternalStyle}
                  containerStyle={styles.nameInput}
                  value={`${new Date(this.state.date).getDate().toString()}-${(
                    new Date(this.state.date).getMonth() + 1
                  ).toString()}-${new Date(this.state.date)
                    .getFullYear()
                    .toString()}`}
                  editable={false}
                  right={
                    <Image
                      style={styles.downIcon}
                      source={require('../../../../assets/icons/chev_down2.png')}
                    />
                  }
                />
              </TouchableOpacity>
              <ResponsiveText style={styles.fieldHeading}>
                Country
              </ResponsiveText>
              <View style={styles.nameInput}>
                <TouchableOpacity
                  onPress={this.openCodeModal}>
                  <InputField
                    inputField={[styles.inputInternalStyle]}
                    containerStyle={[styles.nameInput, { marginBottom: 0 }]}
                    value={`${this.state.country}   ${this.state.countryFlag}`}
                    editable={false}
                    right={
                      <Image
                        style={styles.downIcon}
                        source={require('../../../../assets/icons/chev_down2.png')}
                      />
                    }
                  />
                </TouchableOpacity>
              </View>
              <ResponsiveText style={styles.fieldHeading}>
                Description
              </ResponsiveText>
              <InputField
                inputField={[
                  styles.inputInternalStyle,
                  { height: hp('14'), fontFamily: Fonts.SourceSansProRegular },
                ]}
                placeholder='Description'
                containerStyle={[styles.nameInput, { height: hp('14') }]}
                multiline={true}
                value={this.state.description ? this.state.description : ''}
                onChangeText={description => this.setState({ description })}
              />
              <Button
                text={'Save'}
                containerStyle={styles.Continuebutton}
                textStyle={styles.ContinuebuttonText}
                onPress={() => this.onSaveProfile()}
              />
            </View>
          </Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.countryModal}
            onRequestClose={() => {
              this.setState({ countryModal: false });
            }}>
            <SafeAreaView style={styles.modalContainerStyle}>
              <View style={styles.viewStyle1}>
                <View style={styles.countryModalHeader}>
                  <ResponsiveText style={styles.countryModalHeaderText}>
                    Select Country
                  </ResponsiveText>
                  <TouchableOpacity
                    onPress={() => this.setState({ countryModal: false })}>
                    <Image
                      source={require('../../../../assets/icons/cross.png')}
                      style={styles.crossIcon}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20 }} />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingHorizontal: 20,
                  }}>
                  <FlatList
                    data={CodesList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            this.countryFlagHandler(item.flag, item.name)
                          }
                          style={{
                            flexDirection: 'row',
                            paddingVertical: 3,
                            flex: 1,
                          }}>
                          <View style={{ justifyContent: 'center' }}>
                            <Text style={{ fontSize: 24 }}>{item.flag}</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              marginLeft: 20,
                            }}>
                            <Text style={{ fontSize: 16 }}>{item.name}</Text>
                          </View>
                          <View
                            style={{ justifyContent: 'center', marginLeft: 16 }}>
                            <Text style={{ fontSize: 16 }}>{item.dial_code}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                    keyExtractor={item => item.name}
                  />
                </View>
              </View>
            </SafeAreaView>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.showGenderModal}
            onRequestClose={() => {
              this.setState({ showGenderModal: false });
            }}>
            <View style={styles.genderModalContainer}>
              <View style={styles.genderModalInnerContainer}>
                <View style={styles.genderModalHeader}>
                  <ResponsiveText style={styles.genderModalHeaderText}>
                    Select Gender
                  </ResponsiveText>
                  <TouchableOpacity
                    onPress={() => this.setState({ showGenderModal: false })}>
                    <Image
                      source={require('../../../../assets/icons/cross.png')}
                      style={[
                        styles.crossIcon,
                        { height: wp('4'), width: wp(4) },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                  {['Male', 'Female'].map(item => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          this.setState({
                            gender: item,
                            showGenderModal: 'false',
                          })
                        }
                        key={item}
                        style={styles.modalSingleItem}>
                        <ResponsiveText>{item}</ResponsiveText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </Modal>

        </KeyboardAwareScrollView>

        <CodePickerModal
          visible={this.state.codeModal}
          onCodeSelect={this.onCodeSelect}
        />
      </View>
    );
  }
}

export default EditProfile;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#ffce31',
    marginTop: 0,
    paddingTop: wp('7'),
    marginBottom: -5,
    height: wp('20%'),
  },
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 7,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    tintColor: '#000000',

  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.5,
    color: '#000000',
  },
  imageContainerBox: {
    height: hp('18'),
    backgroundColor: '#ffce31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBoxTopContainer: {
    height: hp('9'),
    width: '100%',
    backgroundColor: '#ffce31',
  },
  imageBoxBottomContainer: {
    height: hp('9'),
    width: '100%',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: wp('23'),
    width: wp('23'),
    borderRadius: wp('23'),
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: wp('23'),
    width: wp('23'),
    borderRadius: wp('23'),
    flex: 1,

  },
  cameraIcon: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
    position: 'absolute',
  },
  formContent: {
    paddingHorizontal: wp('5.5'),
  },
  fieldHeading: {
    fontSize: 3.5,
    color: '#A6A6A6',
    fontFamily: Fonts.OpenSansRegular,
  },
  nameInput: {
    marginBottom: hp('2.5'),
    borderWidth: 0,
    borderBottomWidth: wp('0.3'),
    borderBottomColor: '#E1E1E1',
    borderRadius: 0,
    height: hp('4.5'),
    paddingHorizontal: 0,
    paddingLeft: 0,

  },
  inputInternalStyle: {
    color: 'black',
    paddingHorizontal: 0,
    fontSize: wp(3.3),
    fontFamily: Fonts.OpenSansRegular,

  },
  Continuebutton: {
    width: wp('80'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    elevation: 0,
    alignSelf: 'center',
    marginTop: wp('2'),
    marginBottom: wp('6'),
  },
  ContinuebuttonText: {
    fontSize: 5,
    fontFamily: Fonts.SourceSansProSemiBold,
    color: '#000000',
  },
  downIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  modalContainerStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  viewStyle1: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,

  },
  inputStyle1: {
    color: '#000',
    fontSize: 20,
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  leftIconStyle: {
    marginRight: 8,
    alignSelf: 'center',
    width: 30,
  },
  rightIconStyle: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
  errorStyle: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 6,

  },
  searchStyle: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  countryModalHeaderText: {
    alignSelf: 'center',
    fontSize: 5,
    paddingVertical: wp('5'),
    fontFamily: Fonts.RobotoBold,
  },
  countryModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
  },
  crossIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  genderModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderModalInnerContainer: {
    height: wp('65'),
    width: wp('65'),
    backgroundColor: 'white',
    borderRadius: wp('1'),
    paddingHorizontal: wp('5'),
    paddingVertical: wp('5'),
  },
  genderModalHeaderText: {
    fontFamily: Fonts.RobotoBold,
  },
  genderModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSingleItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('2'),
    borderBottomWidth: wp('0.1'),
    borderBottomColor: '#E1E4E8',
    borderTopWidth: wp('0.1'),
    borderTopColor: '#E1E4E8',
  },
};
