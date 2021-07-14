/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import OtherSinglePostCard from '../../../../components/OtherSinglePostCard';
import ResponsiveText from '../../../../components/ResponsiveText';
import Fonts from '../../../../themes/Fonts';
import { androidHeight, iosHeight, androidH3 } from '../../../../utils/constants'
class OtherSinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentOffsetY: 0,
      userName: '',
      profile: '',
      name: '',
      item: [],
      email: ''

    };
  }
  componentDidMount = () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    this.setState({ userName: Info.userName })
    const data = this.props.route.params.postBodyData;
    const profile = data.map((item) => item.profileImg);
    const name = data.map((item) => item.userName);
    const email = data.map((item) => item.email);
    this.setState({ profile: profile, name: name, email: email[0] })
  }

  render() {
    const { profile, name, email } = this.state;
    let item = this.props.route.params.data;
    const { index } = this.props.route.params
    return (
      <View style={styles.container}>
        <View style={[styles.header, { marginTop: Platform.OS === 'ios' ? iosHeight : androidH3 }]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backIconContainer}>
            <Image
              source={require('../../../../assets/icons/chevron_left.png')}
              style={styles.leftIcon}
            />
          </TouchableOpacity>
          <ResponsiveText style={styles.headerText}>{name}</ResponsiveText>
        </View>
        <OtherSinglePostCard
          index={index}
          email={email}
          postid={item._id}
          profile_image={profile}
          user_name={name}
          post_url={item.postImg}
          isVerified={item.isVerified}
          time={item.createdAt}
          likes={item.countLike}
          comments={item.countComment}
          description={item.description}
          post_type={item.type}
          views={item.viewCount}
          duration={item.postTime}
          isLive={item.isLive}
          thumbnail={item.thumbnail ? item.thumbnail : 'https://i.vimeocdn.com/video/585576351_1280x720.jpg'}
          navigation={this.props.navigation}
          commentsArray={item.comments}
          isLikedByUser={item.isLikedByUser}
          viewedBy={item.viewedBy}
        />
      </View>
    );
  }
}

export default OtherSinglePost;

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: Platform.OS === 'ios' ? iosHeight : androidHeight


  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    height: wp('15'),
    flexDirection: 'row',
    alignItems: 'center',

  },
  backIconContainer: {
    height: '100%',
    width: '16%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  leftIcon: {
    height: wp('5'),
    width: wp('5'),
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: Fonts.OpenSansRegular,
    color: '#181818',
    fontSize: 4.5
  }
};
