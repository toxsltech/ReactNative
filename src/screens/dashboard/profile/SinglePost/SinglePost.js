/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SinglePostCard from '../../../../components/SinglePostCard';
import ResponsiveText from '../../../../components/ResponsiveText';
import Fonts from '../../../../themes/Fonts';
import { androidHeight, iosHeight, androidH3 } from '../../../../utils/constants'
class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentOffsetY: 0,
      userName: ''
    };
  }

  componentDidMount = () => {
    const Info = this.props.getprofileResponse ? this.props.getprofileResponse.data : '';
    this.setState({ userName: Info.userName })
  }

  render() {
    const { item, index } = this.props.route.params
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
          <ResponsiveText style={styles.headerText}>{this.state.userName}</ResponsiveText>
        </View>
        <SinglePostCard
          index={index}
          postid={item._id}
          profile_image={item.postedBy.profileImg}
          user_name={item.postedBy.userName}
          email={item.postedBy.email}
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

export default SinglePost;

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
