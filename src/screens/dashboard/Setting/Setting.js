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
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground,
  Text,
  StatusBar, Share, Linking, Platform
} from 'react-native';
import Container from '../../../components/Container';
import ResponsiveText from '../../../components/ResponsiveText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioButton from 'react-native-radio-button'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { androidH3, ios } from '../../../utils/constants';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DarkMode: false,
      showLanguageModal: false,
      language: '',
      check1: true,
      check2: false,
      title: '',
      share_url: '',
      seller: false,
      Userid: ''
    };
  }

  componentDidMount = () => {
    this.props.onGetProfile().then(() => this.afterGetProfile())
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      const statusofpage = this.props.route.params.statusofpage ? this.props.route.params.statusofpage : ''
      if (statusofpage == 'profile') {
        this.setState({ check1: true, check2: false })
      } else if (statusofpage == 'ecommerce') {
        this.setState({ check1: false, check2: true })
      } return unsubscribe
    });

  }



  afterGetProfile = async () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    const seller = Info.isSeller
    this.setState({ seller: seller, Userid: Info._id })
  };

  onLogOut = async () => {
    try {
      const USERID = await AsyncStorage.getItem('USERID')
      AsyncStorage.removeItem('token');
      await AsyncStorage.clear();
      await AsyncStorage.setItem('logoutuser', 'true')
      this.props.navigation.navigate('GetStarted');
    } catch (e) {
      alert('Please try again');
    }
  };

  sendInvitation = async (title, share_url) => {
    Share.share({
      message: `I'm on Fambase as @${title}.Install the app to follow my photos and videos ${'https://fambase.page.link/userprofile'}`
    });
  }

  render() {
    const { check1, check2 } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: "white", paddingVertical: Platform.OS === 'ios' ? ios : androidH3 }}>
        <StatusBar
          translucent backgroundColor="transparent"
          barStyle='light-content'
        />
        <View style={styles.clearFix} />
        <View style={{ height: wp('38'), overflow: 'hidden' }}>
          <ImageBackground
            style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'flex-start', paddingTop: wp('5') }}
            source={require('../../Ecommerce/images/settingback.png')}
          >
            <TouchableOpacity style={{ paddingTop: wp('5'), paddingLeft: wp('5') }} onPress={() => this.props.navigation.navigate('userProfile')}  >
              <IonIcon style={{}} name="chevron-back-outline" size={25} color='black' />
            </TouchableOpacity>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', flex: 1, }}>
              <View style={{ marginRight: wp('6'), }}>
                <View style={styles.radioview}>
                  <RadioButton
                    size={10}
                    innerColor={check1 ? '#45b39d' : 'black'}
                    outerColor={check1 ? '#45b39d' : 'black'}
                    animation={'bounceIn'}
                    isSelected={this.state.check1}
                    onPress={() => this.setState({ check1: true, check2: false })}
                  />
                  <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => this.setState({ check1: true, check2: false })}>
                    <Text style={{ ...styles.radiotext, color: check1 ? '#45b39d' : 'black' }}>Fambase</Text>
                  </TouchableOpacity>
                  <RadioButton
                    size={10}
                    innerColor={check2 ? '#45b39d' : 'black'}
                    outerColor={check2 ? '#45b39d' : 'black'}
                    animation={'bounceIn'}
                    isSelected={this.state.check2}
                    onPress={() => this.setState({ check1: false, check2: true })}
                  />
                  <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ check1: false, check2: true })} >
                    <Text style={{ ...styles.radiotext, color: check2 ? '#45b39d' : 'black' }}>Ecommerce</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          bounces={false}
        >
          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => { this.state.check2 ? this.props.navigation.navigate('Newhome') : null }}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                Home
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => { this.state.check2 ? this.props.navigation.navigate('Wishlist') : null }}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                My Wishlist
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => { this.state.check2 ? this.props.navigation.navigate('Message') : null }}

              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                Messages
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
        

          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => { this.state.check2 ? this.props.navigation.navigate('Myorder') : null }}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                My Orders
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => { this.state.check2 ? this.props.navigation.navigate('Notificationscreen') : null }}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                Notifications
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => { this.state.check2 ? this.props.navigation.navigate('CartList') : null }}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                Cart
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
          {this.state.check2 ?
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Contactus')}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>
                Contact Us
              </ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity> : null
          }
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditProfile')}
            style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>
              Edit Profile
            </ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_right.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity

            onPress={() =>
              this.sendInvitation(this.state.title, this.state.share_url)
            }
            style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>
              Invite Friends
            </ResponsiveText>
            <Image
              source={require('../../../assets/icons/share.png')}
              style={[styles.itemIcon, { marginRight: 3 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('BlockedUsers')}
            style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>
              Blocked users
            </ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_right.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>
              Request for verification
            </ResponsiveText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>Report Bug</ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_right.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>
              Privacy Policy
            </ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_right.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>Rules</ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_right.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer}>
            <ResponsiveText style={styles.itemTitle}>
              Security Settings
            </ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_right.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>

          {this.state.seller != true ?
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Sellerprofile')}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>Become a seller</ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Storescreen', { sellerId: this.state.Userid })}
              style={styles.itemContainer}>
              <ResponsiveText style={styles.itemTitle}>Seller Store</ResponsiveText>
              <Image
                source={require('../../../assets/icons/chevron_right.png')}
                style={styles.itemIcon}
              />
            </TouchableOpacity>
          }
          <TouchableOpacity
            onPress={() => this.setState({ showLanguageModal: true })}
            style={styles.dropdownTitleContainer}>
            <ResponsiveText style={styles.itemTitle}>
              {this.state.language ? this.state.language : 'Select Language'}
            </ResponsiveText>
            <Image
              source={require('../../../assets/icons/chevron_down.png')}
              style={styles.itemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onLogOut()}>
            <ResponsiveText style={styles.logoutText}>Log Out</ResponsiveText>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.showLanguageModal}
          onRequestClose={() => {
            this.setState({ showLanguageModal: false });
          }}>
          <View style={styles.genderModalContainer}>
            <View style={styles.genderModalInnerContainer}>
              <View style={styles.genderModalHeader}>
                <ResponsiveText style={styles.genderModalHeaderText}>
                  Select Language
                </ResponsiveText>
                <TouchableOpacity
                  onPress={() => this.setState({ showLanguageModal: false })}>
                  <Image
                    source={require('../../../assets/icons/cross.png')}
                    style={[styles.crossIcon, { height: wp('4'), width: wp(4) }]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                {['English'].map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          language: item,
                          showLanguageModal: 'false',
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
      </View>
    );
  }
}

export default Setting;

const styles = {
  header: {},
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 4,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    marginTop: hp('7'),
    marginLeft: wp('4')
    // 
  },

  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,

  },
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',

    // marginBottom:wp('4')
  },
  contentContainerStyle: {
    paddingHorizontal: wp('4'),
    paddingTop: wp('3'),
  },
  itemContainer: {
    height: wp('13'),
    // backgroundColor: 'red',
    borderBottomWidth: wp('0.3'),
    borderBottomColor: '#E1E1E1',
    marginBottom: wp('2'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.5,
  },
  itemIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  dropdownTitleContainer: {
    flexDirection: 'row',
    height: wp('13'),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: wp('2'),
    paddingHorizontal: wp('4'),
    elevation: 3,
    marginBottom: wp('6'),
    borderRadius: wp('1.5'),
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },
  logoutText: {
    color: '#FF4444',
    fontFamily: Fonts.OpenSansSemiBold,
    marginBottom: 5,
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
  radioview: {
    flexDirection: "row",
    backgroundColor: '#ecf0f1'
    ,
    height: 50,
    width: wp('80'),
    borderRadius: 50,
    justifyContent: 'center',
    elevation: 40, alignItems: 'center',
    marginTop: wp('15'),
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,




  },
  radiotext: {
    fontSize: 18,
    marginTop: 6,
    margin: 5,


  },
  topback: {
    height: wp('44'),
    borderWidth: 2,
    overflow: 'hidden'
  },
  topimageback: {
    height: 210,
    width: wp('100'),
    overflow: 'hidden'
  }
};
