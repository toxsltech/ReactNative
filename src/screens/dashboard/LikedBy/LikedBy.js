/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React, { Component } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import ResponsiveText from '../../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import LikedByCard from '../../../components/LikedByCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'

class LikedBy extends Component {
  constructor() {
    super()
    this.state = {
      followersData: [],
      userid: '',
      loadingVideoback: true
    }
  }

  componentDidMount = () => {
    this.getData()
    const { postId } = this.props.route.params
    this.props.getLikes(postId).then(() => this.after())
  }

  getData = async () => {
    try {
      const USERID = await AsyncStorage.getItem('USERID')
      this.setState({ userid: USERID })
    } catch (e) {
      showNotification("danger", e);

    }
  }

  after = () => {
    const data = this.props.getlikesResponse ? this.props.getlikesResponse.data : ''
    this.setState({ followersData: data, loadingVideoback: false })
  }

  render() {
    const { followersData } = this.state

    return (
      <Container style={{ flex: 1 ,paddingVertical:25}}>
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
        <AppHeader
          titleLeftAlign
          containerStyle={styles.header}
          left={
            <View style={styles.leftIconContainer}>
              <Image
                source={require('../../../assets/icons/left_chevron2.png')}
                style={styles.HeaderleftIcon}
              />
            </View>
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <ResponsiveText style={styles.headertitle}>Liked By</ResponsiveText>
          }
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),
          }}
          data={followersData}
          renderItem={({ item, index }) => {
            return (
              <LikedByCard
                key={index}
                profile_image={item.likedBy.profileImg}
                user_name={item.likedBy.userName}
                time={item.likedBy.createdAt}
                following={item.likedBy.isUserFollowing}
                navigation={this.props.navigation}
                id={item.likedBy._id}
                userId={this.state.userid}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default LikedBy;

const styles = {
  header: { marginBottom: 5 },
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 7,

  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain'

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
};
