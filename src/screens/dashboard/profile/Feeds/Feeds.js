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
import showNotification from '../../../../utils/services'

class Feeds extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Posts: [],
      postID: [],
      OtherPosts: [],
      ID: '',
      otherUserId: [],
      Otherprofile: [],
      name: [],
      desc: [],
      isFetching: false,
      loadingVideoback: true
    };
  }

  handleRefresh = () => {
    this.setState({ isFetching: true }, async () => {
      await this.props.onGetFeeds().then(() => this.afterGetFeed());
    });
  }

  componentDidMount() {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    const ID = Info._id;
    this.setState({ profile: Info.profileImg, ID: ID });
    this.props.onGetFeeds().then(() => this.afterGetFeed());
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getdata()
    });
    return unsubscribe;
  }

  getdata = async () => {
    try {
      const refreshvalue11 = await AsyncStorage.getItem('refreshvalue11')
      if (refreshvalue11 == 'true') {
        await AsyncStorage.setItem('refreshvalue11', 'false')
        this.props.onGetFeeds().then(() => this.afterGetFeed());
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
  }

  afterGetFeed = () => {
    const postData = this.props.getfeedResponse ? this.props.getfeedResponse.data : '';
    const postId = postData.map((item) => item.postedBy._id);
    this.setState({ Posts: postData, postID: postId, isFetching: false, loadingVideoback: false });
  }

  open = () => {
    this.props.onGetFeeds().then(() => this.afterGetFeed());
  }

  render() {
    const { Posts } = this.state

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
          contentContainerStyle={{ backgroundColor: 'white', paddingTop: wp('5') }}
          showsVerticalScrollIndicator={false}
          data={Posts}
          refreshing={this.state.isFetching}
          onRefresh={() => this.handleRefresh()}
       
          renderItem={({ item, index }) => {
            return (

              <PostCard
                key={index}
                profile_image={item.postedBy.profileImg}
                user_name={item.postedBy.userName}
                post_url={item.postImg}
                isVerified={item.isVerified}
                time={item.createdAt}
                viewedBy={item.viewedBy}
                comments={item.countComment}
                likes={item.countLike}
                tag={this.open.bind(this)}
                isLikedByUser={item.isLikedByUser}
                description={item.description}
                post_type={item.type}
                views={item.viewCount}
                duration={item.postTime}
                isLive={item.isLive}
                thumbnail={item.thumbnail ? item.thumbnail : 'https://i.vimeocdn.com/video/585576351_1280x720.jpg'}
                navigation={this.props.navigation}
                postID={item._id}
                userId={item.postedBy._id}
                ID={this.state.ID}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}

export default Feeds;

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
