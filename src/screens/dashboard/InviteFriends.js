/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image, FlatList } from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import Fonts from '../../themes/Fonts';
import { FriendsData } from '../../components/DummyData';
import InputField from '../../components/InputField';
import FriendsCards from '../../components/FriendsCards';

class InviteFriends extends React.Component {
  render() {
    return (
      <Container style={{ flex: 1 }}>
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
              Add Friends
            </ResponsiveText>
          }
        />
        <InputField
          leftIcon={
            <Image
              source={require('../../assets/icons/search.png')}
              style={styles.searchIcon}
            />
          }
          inputField={styles.searchText}
          containerStyle={styles.headerSearchbar}
          placeholder={'Find Friends'}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp('5.5'),

          }}
          data={FriendsData}
          renderItem={({ item, index }) => {
            return (
              <FriendsCards
                key={index}
                profile_image={item.profile_image}
                user_name={item.user_name}
                status={item.status}
              />
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default InviteFriends;

const styles = {
  header: {
    marginBottom: -5,
    height: wp('20%'),
  },
  leftIconContainer: {
    paddingVertical: 7,
    paddingRight: 7,
  },
  HeaderleftIcon: {
    height: wp('3.5'),
    width: wp('3.5'),
    resizeMode: 'contain',
  },

  headertitle: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: 5.5,
  },
  headerSearchbar: {
    height: wp('11.5%'),
    borderRadius: wp('10'),
    marginHorizontal: wp('5.5'),
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    paddingLeft: wp('2 '),
    marginBottom: wp('3'),
  },
  searchIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginLeft: wp('2'),

  },
  searchText: {
    fontFamily: Fonts.OpenSansRegular,
    fontSize: wp('3.5'),
    color: '#A4A4A4'
  },
};
