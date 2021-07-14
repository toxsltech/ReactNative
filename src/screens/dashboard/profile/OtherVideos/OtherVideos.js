/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import VideoCard1 from '../../../../components/VideoCard1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../../utils/env'
import showNotification from '../../../../utils/services'

class OtherVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      loadingVideoback: true

    };
  }

  componentDidMount() {
    this.fetch();
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getviewersrefresh()
    });
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
        const OtherPosts = Info1.map((item) => item.postData)
        this.setState({ video: OtherPosts[0], data: Info1, loadingVideoback: false })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  //comments
  getviewersrefresh = async () => {
    try {
      const Viewersfollowing = await AsyncStorage.getItem('Viewersfollowing')
      if (Viewersfollowing == 'true') {
        await AsyncStorage.setItem('Viewersfollowing', 'false')
        this.fetch();
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const refreshvalue = await AsyncStorage.getItem('refreshvalue')
      if (refreshvalue == 'true') {
        await AsyncStorage.setItem('refreshvalue', 'false')
        this.fetch();
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const videopageuser = await AsyncStorage.getItem('videopageuser')
      if (videopageuser == 'true') {
        await AsyncStorage.setItem('videopageuser', 'false')
        this.fetch();
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const Likesfollowing = await AsyncStorage.getItem('Likesfollowing')
      if (Likesfollowing == 'true') {
        await AsyncStorage.setItem('Likesfollowing', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  open = () => {
    this.fetch();
  }

  render() {
    const { data } = this.state;
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
          nestedScrollEnabled={true}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingTop: wp('5'),
            paddingHorizontal: wp('4'),
          }}
          bounces={false}

          showsVerticalScrollIndicator={false}
          data={this.state.video}
          renderItem={({ item, index }) => {
            return (
              <View>
                {item.type == 1 ?
                  <VideoCard1
                    postid={item._id}
                    index={index}
                    viewCount={item.viewCount}
                    thumbnail={item.thumbnail ? item.thumbnail : 'https://i.vimeocdn.com/video/585576351_1280x720.jpg'}
                    duration={item.postTime}
                    title={item.description}
                    time={item.time}
                    views={'20'}
                    likes={item.countLike}
                    comments={item.countComment}
                    tag={this.open.bind(this)}
                    viewedBy={item.viewedBy}
                    isLikedByUser={item.isLikedByUser}
                    item={item}
                    navigation={this.props.navigation}
                    data={data}
                  />
                  : null}
              </View>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}

export default OtherVideos;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
};
