/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import PostCard from '../../../../components/PostCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../../utils/env'
import showNotification from '../../../../utils/services'

class OtherFeeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Posts: [],
      postID: [],
      OtherPosts: [],
      userId: '',
      otherUserId: [],
      Otherprofile: [],
      name: [],
      isFetching: false,
      follwing: [],
      loadingVideoback: true
    };
  }
  handleRefresh = () => {
    this.setState({ isFetching: true }, async () => {
      this.fetch()
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetch()
    }, 1000);
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getdata()
    });
    return unsubscribe;
  }

  getdata = async () => {
    try {
      const refreshvalue = await AsyncStorage.getItem('refreshvalue')
      if (refreshvalue == 'true') {
        await AsyncStorage.setItem('refreshvalue', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const videopageuser = await AsyncStorage.getItem('videopageuser')
      if (videopageuser == 'true') {
        await AsyncStorage.setItem('videopageuser', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const followingLikepage = await AsyncStorage.getItem('followingLikepage')
      if (followingLikepage == 'true') {
        await AsyncStorage.setItem('followingLikepage', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

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
        const Info1 = json ? json.data : '';
        const otherUserId = Info1.map((item) => item._id)
        const OtherPosts = Info1.map((item) => item.postData)
        const profile = Info1.map((item) => item.profileImg);
        const name = Info1.map((item) => item.userName);
        const followData = Info1.map((item) => item.followData)
        const followBy = followData[0].map((item) => item.followBy)
        this.setState({ OtherPosts: OtherPosts[0], otherUserId: otherUserId, Otherprofile: profile, name: name, isFetching: false, loadingVideoback: false })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  open = () => {
    this.fetch()
  }

  render() {
    const { OtherPosts } = this.state


    return (
      <View style={{ flex: 1 }}>
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
        <FlatList
          nestedScrollEnabled={false}
          contentContainerStyle={{ backgroundColor: 'white', paddingTop: wp('5') }}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.isFetching}
          onRefresh={() => this.handleRefresh()}
          data={OtherPosts}
       

          renderItem={({ item, index }) => {

            return (

              <PostCard
                key={index}
                profile_image={this.state.Otherprofile}
                user_name={this.state.name}
                post_url={item.postImg}
                isVerified={item.isVerified}
                time={item.createdAt}
                viewedBy={item.viewedBy}
                following={item.isUserFollowing}
                comments={item.countComment}
                likes={item.countLike}
                tag={this.open.bind(this)}
                isLikedByUser={item.isLikedByUser}
                description={item.description}
                post_type={item.type}
                views={item.viewCount}
                duration={item.postTime}
                isLive={item.isLive}
                thumbnail={item.thumbnail}
                navigation={this.props.navigation}
                postID={item._id}
                userId={item._id}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />

      </View>
    );
  }
}

export default OtherFeeds;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
};
