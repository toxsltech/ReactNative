/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Container from '../../../../../components/Container';
import FollowingCard from '../../../../../components/FollowingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../../../utils/env'
import showNotification from '../../../../../utils/services'

class Following extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      followersData: [],
      followOtherData: [],
      userId: '',
      otherUserId: [],
      refreshvalueotherprofile: null,
      loadingVideoback: true
    }
  }

  componentDidMount() {
    this.getData()
  }

  afterFollowing = () => {
    const data = this.props.getfollowingResponse ? this.props.getfollowingResponse.data : '';
    this.setState({ followersData: data, loadingVideoback: false })
  };

  fetch = async () => {
    const postID = await AsyncStorage.getItem('postID')
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'auth/getAllUserProfile/' + postID, {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const Info = json ? json.data : '';
        const OtherData = Info.map((item) => item.followData)
        const followOtherData = OtherData[0].map((item) => item.followTo)
        this.setState({ followOtherData: followOtherData[0], loadingVideoback: false })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  getData = async () => {
    try {
      const refreshvalueotherprofile = await AsyncStorage.getItem('refreshvalueotherprofile')
      if (refreshvalueotherprofile == 'true') {
        this.setState({ refreshvalueotherprofile: true })
        this.fetch()
      } else {
        this.setState({ refreshvalueotherprofile: false })
        this.props.Following().then(() => this.afterFollowing())
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  render() {
    const { followersData, followOtherData, refreshvalueotherprofile } = this.state;

    return (
      <Container style={{ flex: 1 }}>
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

        <View style={{ height: wp('0.3'), backgroundColor: '#EAEAEA' }} />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),
            paddingTop: wp('4'),
          }}
        bounces={false}

          data={refreshvalueotherprofile ? followOtherData : followersData}
          renderItem={({ item, index }) => {
            return (
              <FollowingCard
                key={index}
                profile_image={item.profileImg}
                user_name={item.userName}
                status={item.status}
                following={refreshvalueotherprofile ? item.isfollowingUser : true}
                navigation={this.props.navigation}
                id={item._id}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default Following;

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
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 4,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',

  },
};
