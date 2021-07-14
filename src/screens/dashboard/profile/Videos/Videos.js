/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import VideoCard from '../../../../components/VideoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../../utils/services'

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      postType: [],
      loadingVideoback: true
    };
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getviewersrefresh()
    });
    setTimeout(() => {
      this.props.onGetFeeds().then(() => this.afterGetFeed());
    }, 1000);
  }

  afterGetFeed = () => {
    const postData = this.props.getfeedResponse ? this.props.getfeedResponse.data : '';
    const data = postData.map((item) => item.type);
    this.setState({ video: postData, postType: data, loadingVideoback: false });
  }

  open = () => {
    this.props.onGetFeeds().then(() => this.afterGetFeed());
  }

  getviewersrefresh = async () => {
    try {
      const Viewersfollowing = await AsyncStorage.getItem('Viewersfollowing')
      if (Viewersfollowing == 'true') {
        await AsyncStorage.setItem('Viewersfollowing', 'false')
        this.props.onGetFeeds().then(() => this.afterGetFeed());
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

    try {
      const deletepost = await AsyncStorage.getItem('deletepost')
      if (deletepost == 'true') {
        await AsyncStorage.setItem('deletepost', 'false')
        this.fetch()
      }
    } catch (e) {
      showNotification("danger", e);


    }

    //comments
    try {
      const refreshvalue = await AsyncStorage.getItem('refreshvalue')
      if (refreshvalue == 'true') {
        await AsyncStorage.setItem('refreshvalue', 'false')
        this.props.onGetFeeds().then(() => this.afterGetFeed());
      }
    } catch (e) {
      showNotification("danger", e);

    }

    try {
      const videopageuser = await AsyncStorage.getItem('videopageuser')
      if (videopageuser == 'true') {
        await AsyncStorage.setItem('videopageuser', 'false')
        this.props.onGetFeeds().then(() => this.afterGetFeed());
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  render() {

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
                  <VideoCard
                    postid={item._id}
                    viewCount={item.viewCount}
                    index={index}
                    thumbnail={item.thumbnail ? item.thumbnail : 'https://i.vimeocdn.com/video/585576351_1280x720.jpg'}
                    duration={item.postTime}
                    title={item.description}
                    time={item.time}
                    likes={item.countLike}
                    comments={item.countComment}
                    item={item}
                    tag={this.open.bind(this)}
                    isLikedByUser={item.isLikedByUser}
                    viewedBy={item.viewedBy}
                    navigation={this.props.navigation}
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

export default Videos;

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
