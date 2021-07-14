/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import StoryCard from '../../../../components/StoryCard';
import ResponsiveText from '../../../../components/ResponsiveText';
import Fonts from '../../../../themes/Fonts';
import LiveStreamCard from '../../LiveStreamCard';
import SocketManager from '../../../../socketManager';
import get from 'lodash/get';

class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLiveStream: [],
      Stories: []
    };
  }
  componentDidMount() {
    this.props.onGetAllStory().then(() => this.afterGetAllStory());
    SocketManager.instance.emitListLiveStream();
    SocketManager.instance.listenListLiveStream((data) => {
      this.setState({ listLiveStream: data });
    });
  }

  afterGetAllStory = () => {
    const stories = this.props.getallstoryResponse ? this.props.getallstoryResponse.data : '';
    this.setState({ Stories: stories, isFetching: false });
  }

  onPressCardItem = (data) => {
    const { route } = this.props;
    const userName = get(route, 'params.userName', '');
    this.props.navigation.navigate('Viewer', { userName, data });
  };

  render() {
    const { listLiveStream, Stories } = this.state;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}

        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',

        }}>
        <View style={styles.storyCardContainer}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: wp('5.5') }}
            horizontal
            data={Stories}
            bounces={false}

            renderItem={({ item, index }) => {
              return (
                <StoryCard
                  postMenu={this.state.postMenu}
                  key={index}
                  profile_image={item.profileImg}
                  user_name={item.userName}
                  post_url={item.story.map((item) => item.storyImg)}
                  navigation={this.props.navigation}
                  postID={item._id}
                  following={item.isUserFollowing}
                />);
            }}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <View style={styles.separator} />
        <ResponsiveText style={styles.Heading}>
          Recommended Users
        </ResponsiveText>
        <View style={styles.RecommendedCardContainer}>

          <FlatList
            contentContainerStyle={{ paddingLeft: wp('5.5') }}
            showsHorizontalScrollIndicator={false}
            data={listLiveStream}
            horizontal
            renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        <View style={styles.separator} />
        <ResponsiveText style={styles.Heading}>Trending</ResponsiveText>
        <View style={styles.TrendingCardContainer}>
          <FlatList
            contentContainerStyle={{ paddingLeft: wp('5.5') }}
            showsHorizontalScrollIndicator={false}
            data={listLiveStream}
            horizontal
            renderItem={({ item }) => <LiveStreamCard data={item} onPress={this.onPressCardItem} />}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Global;
const styles = {
  storyCardContainer: {
    paddingVertical: wp('4'),

  },
  separator: {
    height: wp('0.3'),
    width: wp('90'),
    alignSelf: 'flex-start',
    backgroundColor: '#E1E1E1',
    marginBottom: wp('4'),
    marginLeft: wp('5.5'),
  },
  Heading: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 4.7,
    paddingLeft: wp('5.5'),
  },
  RecommendedCardContainer: {
    paddingVertical: wp('4'),

  },
  TrendingCardContainer: {
    paddingVertical: wp('4'),

  },
  flatList: {
    marginHorizontal: 15,
  },





  container: {
    width: wp('32'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4'),
    overflow: 'hidden',
  },
  image: {
    height: wp('39'),
    width: wp('32'),
    borderRadius: wp('3.5'),
    backgroundColor: '#F3F3F3',
  },
  infoContainer: {
    position: 'absolute',
    bottom: wp('4'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('2'),
  },
  profileImage: {
    height: wp('8'),
    width: wp('8'),
    borderWidth: wp('0.4'),
    borderColor: '#0089FF',
    borderRadius: wp('8'),
    marginRight: wp('1'),
  },
  name: {
    fontSize: 3,
    color: 'white',
    fontFamily: Fonts.RobotoRegular,
  },
  timeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '91%',
  },
  title: {
    fontSize: 3.8,
    fontFamily: Fonts.OpenSansRegular,
    marginTop: wp('2.5'),
  },
  detailsText: {
    fontSize: 3,
    color: '#B5B5B5',
    fontFamily: Fonts.RobotoBold,
  },

};
