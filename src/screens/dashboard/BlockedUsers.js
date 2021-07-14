/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../themes/Fonts';
// import { BlockedUsersList } from '../../components/DummyData';
import InputField from '../../components/InputField';
import FriendsCards from '../../components/FriendsCards';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils/env'
import showNotification from '../../utils/services'

class BlockedUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BlockedUsersList: []
    }
  }

  componentDidMount = () => {
    this.open()
  }

  open = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'block/list', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json ? json.data : '';
        const BlockedUsers = data.map((item) => item.blockedTo)
 
      }
      )
      .catch(error => {
        showNotification("danger", error.message);

      })
  }

  render() {
    const { BlockedUsersList } = this.state
    return (
      <Container style={{ flex: 1 }}>
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>
              Blocked Users
            </ResponsiveText>
          }
        />
        <InputField
          leftIcon={
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.searchIcon}
            />
          }
          inputField={styles.searchText}
          containerStyle={styles.headerSearchbar}
          placeholder={'Search'}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),

          }}
          data={BlockedUsersList}
          renderItem={({ item, index }) => {
            return (
              <FriendsCards
                key={index}
                profile_image={item.profileImg}
                user_name={item.userName}
                status={'Blocked'}
                blockId={item._id}
                tag={this.open.bind(this)}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default BlockedUsers;

const styles = {
  header: {
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
  },
  headerNotificationIcon: {
    height: wp('8'),
    width: wp('8'),
    resizeMode: 'contain',
  },
  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,
  },
  headerSearchbar: {
    height: wp('11.5%'),
    borderRadius: wp('10'),
    marginHorizontal: wp('5.5'),
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    paddingLeft: wp('3'),
    marginBottom: wp('3'),
  },
  searchIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),

  },
  searchText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: wp('3.5'),
    color: '#A4A4A4',
  },
};
