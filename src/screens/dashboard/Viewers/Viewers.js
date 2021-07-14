/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Container from '../../../components/Container';
import AppHeader from '../../../components/AppHeader';
import ResponsiveText from '../../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../../themes/Fonts';
import ViewersCard from '../../../components/ViewersCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../utils/services'

class Viewers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userID: ''
    }
  }
  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    try {
      const USERID = await AsyncStorage.getItem('USERID')
      this.setState({ userID: USERID })
    } catch (e) {
      showNotification("danger", e);

    }
  }

  render() {
    const { viewedBy } = this.props.route.params
    return (
      <Container style={{ flex: 1, paddingVertical: 25 }}>
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
            <ResponsiveText style={styles.headertitle}>Viewers</ResponsiveText>
          }

        />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),

          }}
          data={viewedBy}
          renderItem={({ item, index }) => {
            return (
              <ViewersCard
                key={index}
                profile_image={item.profileImg}
                user_name={item.userName}
                time={item.time}
                following={item.isUserFollowing}
                postID={item._id}
                userID={this.state.userID}
                navigation={this.props.navigation}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default Viewers;

const styles = {
  header: { marginBottom: 5 },
  leftIconContainer: {
    paddingVertical: 7,
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
};
