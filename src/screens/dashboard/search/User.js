/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Container from '../../../components/Container';
import FollowingCard from '../../../components/FollowingCard';
import ResponsiveText from '../../../components/ResponsiveText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../utils/env';
import showNotification from '../../../utils/services'

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.users()
  }

  users = async () => {
    var token = await AsyncStorage.getItem('token');
    const { searchText } = this.props
    fetch(BASE_URL + 'auth/users', {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const data = json ? json.data : ''
        this.setState({
          users: searchText == 0 ? null :
            data.filter((item) =>
              item.userName.toLowerCase().startsWith(searchText.toLowerCase()),
            )
        })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  render() {
    const { users } = this.state;
    return (
      <Container style={{ flex: 1 }}>
        <View style={{ height: wp('0.3'), backgroundColor: '#EAEAEA' }} />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),
            paddingTop: wp('4'),
          }}
          bounces={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: wp('55'),
                }}>
                <ResponsiveText style={{ color: 'grey' }}>
                  No Result found !
              </ResponsiveText>
              </View>
            );
          }}
          data={users}
          renderItem={({ item, index }) => {
            return (
              <FollowingCard
                key={index}
                profile_image={item.profileImg}
                user_name={item.userName}
                id={item._id}
                following={item.isUserFollowing}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
};


