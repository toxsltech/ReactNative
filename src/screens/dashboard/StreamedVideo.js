/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image, ScrollView, FlatList } from 'react-native';
import Container from '../../components/Container';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../themes/Fonts';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import VideoPlayer from 'react-native-video-player';
import InputField from '../../components/InputField';
import { Comments } from '../../components/DummyData';
import StreamedVideoCommentCard from '../../components/StreamedVideoCommentCard';

class StreamedVideo extends React.Component {
  render() {
    return (
      <Container>
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
              Ellen Lambert
            </ResponsiveText>
          }
        />
        <ScrollView style={styles.CommentSection}>
          <View style={styles.videoContainer}>
            <VideoPlayer
              video={{
                uri:
                  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
              }}
              autoplay={false}
              videoWidth={wp('100')}
              videoHeight={wp('85')}
              thumbnail={{
                uri: 'https://source.unsplash.com/1024x768/?mountain',
              }}
              resizeMode={'cover'}
              controlsTimeout={2000}
              customStyles={{
                controls: { opacity: 1, backgroundColor: 'transparent' },
              }}
            />
          </View>
          <View style={styles.statisticsBarContainer}>
            <View style={styles.InnerleftContainer}>
              <Image
                source={require('../../assets/icons/eye.png')}
                style={styles.statisticsBarContainerViewIcon}
              />
              <ResponsiveText style={styles.statisticsBarContainerText}>
                221
              </ResponsiveText>
              <Image
                source={require('../../assets/icons/heart_outline.png')}
                style={styles.statisticsBarContainerHeartIcon}
              />
              <ResponsiveText style={styles.statisticsBarContainerText}>
                221
              </ResponsiveText>
              <Image
                source={require('../../assets/icons/share_dark.png')}
                style={styles.statisticsBarContainerShareIcon}
              />
            </View>
            <View style={styles.InnerRightContainer}>
              <Image
                source={require('../../assets/icons/comment.png')}
                style={styles.statisticsBarContainerShareIcon}
              />
              <ResponsiveText style={styles.statisticsBarContainerText}>
                30
              </ResponsiveText>
            </View>
          </View>
          <View style={{ paddingHorizontal: wp('5.5'), paddingTop: wp('4') }}>
            <ResponsiveText style={styles.CommentHeading}>
              Comments
            </ResponsiveText>
            <InputField
              placeholder={'Add a Comment'}
              inputField={styles.commentInput}
              containerStyle={styles.commentInputContainer}
              leftIcon={
                <View style={styles.commentInputImageConatiner}>
                  <Image
                    source={require('../../assets/images/model.jpg')}
                    style={styles.commentInputImage}
                  />
                </View>
              }
            />
            <FlatList
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: wp('2'),
              }}
              data={Comments}
              renderItem={({ item, index }) => {
                return (
                  <StreamedVideoCommentCard
                    key={index}
                    avatar={item.avatar}
                    name={item.name}
                    Comment={item.Comment}
                    time={item.time}
                    navigation={this.props.navigation}
                  />
                );
              }}
              keyExtractor={(item, index) => `${index}`}
            />

          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default StreamedVideo;

const styles = {
  header: {},
  leftIconContainer: {
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
  videoContainer: {
    height: wp('85'),
    backgroundColor: 'black',
  },
  statisticsBarContainer: {
    height: wp('13'),
    borderBottomWidth: wp(0.3),
    borderBottomColor: '#D8CBCB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5.5'),
    justifyContent: 'space-between',
  },
  InnerleftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statisticsBarContainerViewIcon: {
    tintColor: '#CECECE',
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
    marginRight: wp('2'),
  },
  statisticsBarContainerHeartIcon: {
    tintColor: '#CECECE',
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginRight: wp('2'),
  },
  statisticsBarContainerShareIcon: {
    tintColor: '#9D9D9D',
    height: wp('4'),
    width: wp('4'),
    resizeMode: 'contain',
    marginRight: wp('2'),
  },
  statisticsBarContainerCommentIcon: {
    tintColor: '#CECECE',
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
    marginRight: wp('2'),
  },
  statisticsBarContainerText: {
    color: '#181818',
    fontFamily: Fonts.RobotoBold,
    fontSize: 3.5,
    marginRight: wp('4'),
  },
  InnerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CommentSection: {},
  CommentHeading: {
    color: '#181818',
    fontFamily: Fonts.OpenSansRegular,
  },
  commentInputContainer: {
    borderWidth: 0,
    borderBottomWidth: wp(0.3),
    borderBottomColor: '#D8CBCB',
    paddingLeft: 0,
  },
  commentInputImageConatiner: {
    height: wp('7'),
    width: wp('7'),
    borderRadius: wp('7'),
    backgroundColor: '#CECECE',
    overflow: 'hidden',
  },
  commentInputImage: {
    height: wp('7'),
    width: wp('7'),
    borderRadius: wp('7'),
  },
  commentInput: {
    fontSize: wp('3'),
    color: '#9D9D9D',
  },
};
