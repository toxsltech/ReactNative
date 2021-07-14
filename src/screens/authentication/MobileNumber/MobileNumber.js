/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform, SafeAreaView, Text
} from 'react-native';
import Container from '../../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ResponsiveText from '../../../components/ResponsiveText';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import Fonts from '../../../themes/Fonts';
import * as Animatable from 'react-native-animatable';
import CodePickerModal from '../../../components/countrySelector/CodePickerModal';
import { isEmpty, PhoneRegex } from '../../../utils/globals';
import showNotification from '../../../utils/services'
import { androidHeight, iosH2 } from '../../../utils/constants';
class MobileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false,
      codeModal: false,
      code: '+372',
      phoneNo: '',
      email: '',
      name: '',
      password: '',
      countryName: 'Estonia (Eesti)',
    };
  }


  componentWillMount() {
    const all = this.props.route.params;
    this.setState({ name: all.name, email: all.email, password: all.password });
  }

  onCodeSelect = item => {
    this.setState({
      code: `+${item.dialCode}`,
      countryName: item.name,
      codeModal: false,
    });
  };

  openCodeModal = () => {
    this.setState({ codeModal: true });
  };

  verifyCredentials = () => {
    const { phoneNo } = this.state;
    if (isEmpty(phoneNo.trim())) {
      alert('Please enter phone number');
      return false;
    } else if (!phoneNo.match(PhoneRegex)) {
      alert('Please enter valid phone number');
      return false;
    }
    return true;
  };

  goToCodeConfirmation = () => {
    const { name, email, password, code, phoneNo, countryName } = this.state;
    if (this.verifyCredentials()) {
      this.props
        .onRegister(name, email, password, code, phoneNo, countryName)
        .then(() => this.afterRegister());
    }
  };
  CustomComponent = ({ title, description }) => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );

  afterRegister = () => {
    showNotification("sucess", this.props.registerResponse.message);
    const Reg = this.props.registerResponse.data.saveUser;
    const OTP = Reg.otp;
    const Mail = Reg.email;
    this.props.navigation.navigate('ConfirmationCode', { OTP, Mail });
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={[
            styles.backContainer,
            { top: Platform.OS === 'ios' ? iosH2 : androidHeight },
          ]}>
          <Image
            source={require('../../../assets/icons/chevron_left.png')}
            style={styles.left}
          />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.topContainer}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
            <ResponsiveText style={styles.UserNameText}>
              What's your mobile number?
            </ResponsiveText>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.openCodeModal}>
                <InputField
                  placeholderTextColor={'#0089FF'}
                  inputField={{ fontWeight: 'bold', color: '#000000' }}
                  containerStyle={styles.codeInput}
                  value={this.state.code}
                  editable={false}
                  leftIcon={
                    <Image
                      source={require('../../../assets/icons/down.png')}
                      style={{
                        height: wp('5'),
                        width: wp('5'),
                        tintColor: '#000000',
                      }}
                    />
                  }
                />
              </TouchableOpacity>

              <InputField
                value={this.state.phoneNo}
                onChangeText={phoneNo => this.setState({ phoneNo })}
                autoFocus
                inputField={{ color: 'black', fontSize: wp('5') }}
                keyboardType={'number-pad'}
                containerStyle={styles.numberInput}
                returnKeyType={'done'}
              />
            </View>
            <ResponsiveText style={styles.descriptionText}>
              We will send you a code in your mobile number
            </ResponsiveText>
          </View>
          <Button
            text={'Continue'}
            containerStyle={styles.Continuebutton}
            textStyle={styles.ContinuebuttonText}
            onPress={() => this.goToCodeConfirmation()}
          />
          <View style={styles.pagination}>
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <Animatable.View
              animation="fadeInLeft"
              duration={400}
              style={styles.activeDot}
            />
            <View style={styles.inactiveDot} />
          </View>
        </ScrollView>
        <CodePickerModal
          visible={this.state.codeModal}
          onCodeSelect={this.onCodeSelect}
        />
      </Container>
    );
  }
}

export default MobileNumber;

const styles = {
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: wp('20'),
    width: wp('20'),
    resizeMode: 'contain',
    marginBottom: wp('20'),
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: wp('15'),
  },
  UserNameText: {
    fontSize: 6.5,
    fontFamily: Fonts.SourceSansProSemiBold,
    marginBottom: wp('6'),
    fontWeight: 'bold',
    color: '#181818',
  },
  numberInput: {
    width: wp('50'),
    paddingHorizontal: wp('4'),
    marginBottom: wp('6'),
    borderWidth: 0,
    borderBottomWidth: wp('0.6'),
    borderBottomColor: 'black',
    borderRadius: 0,
  },
  codeInput: {
    width: wp('30'),
    marginBottom: wp('6'),
    borderWidth: 0,
    borderBottomWidth: wp('0.6'),
    borderBottomColor: 'black',
    borderRadius: 0,
    marginRight: wp('2'),
  },
  Continuebutton: {
    width: wp('85'),
    height: wp('15'),
    backgroundColor: '#ffce31',
    marginBottom: wp('3.5'),
    elevation: 0,
  },
  ContinuebuttonText: {
    fontSize: 5,
    fontFamily: Fonts.SourceSansProSemiBold,
    fontWeight: 'bold',
    color: '#000',
  },
  backContainer: {
    alignSelf: 'flex-start',
    padding: wp('3'),
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 10,
  },
  left: {
    height: wp('6'),
    width: wp('10'),
    resizeMode: 'contain',
    tintColor: 'black',
  },
  pagination: {
    flexDirection: 'row',
    // paddingBottom: wp('10'),
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: '20%',
    alignSelf: 'center',
  },
  inactiveDot: {
    height: wp('3.5'),
    width: wp('3.5'),
    borderRadius: wp('3'),
    backgroundColor: '#b3b3b3',
    marginLeft: wp('2'),
  },
  activeDot: {
    height: wp('3.5'),
    width: wp('7'),
    borderRadius: wp('3'),
    backgroundColor: '#025960',
    marginLeft: wp('2'),
  },
  eye: {
    height: wp('5.5'),
    width: wp('5.5'),
    padding: wp('2'),
  },
  descriptionText: {
    width: wp('80'),
    textAlign: 'center',
    color: '#A2A2A2',
    marginBottom: wp('30'),
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 3.4,
  },
  safeArea: {
    backgroundColor: 'green',
  },
  container: {
    marginTop: 50,

  },
  title: { color: 'white', fontWeight: 'bold', paddingBottom: 20 },

};
