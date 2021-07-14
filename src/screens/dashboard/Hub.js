/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import Container from '../../components/Container';
import AppHeader from '../../components/AppHeader';
import ResponsiveText from '../../components/ResponsiveText';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen/index';
import Fonts from '../../themes/Fonts';
const HubData = [
  {
    icon: require('../../assets/icons/users.png'),
    title: 'Users Nearby',
  },
  {
    icon: require('../../assets/icons/music.png'),
    title: 'Music',
  },
  {
    icon: require('../../assets/icons/gaming.png'),
    title: 'Gaming',
  },
  {
    icon: require('../../assets/icons/building.png'),
    title: 'Arena',
  },
  {
    icon: require('../../assets/icons/shoppingBag.png'),
    title: 'Shopping',
  },
  {
    icon: require('../../assets/icons/Group.png'),
    title: 'Events',
  },
  {
    icon: require('../../assets/icons/shop.png'),
    title: 'Marketplace',
  },
  {
    icon: require('../../assets/icons/video2.png'),
    title: 'Videos',
  },
  {
    icon: require('../../assets/icons/image.png'),
    title: 'Pictures',
  },
];
class Hub extends React.Component {
  render() {
    return (
      <Container>
        <AppHeader
          containerStyle={styles.header}
          body={<ResponsiveText style={styles.headertitle}>Hub</ResponsiveText>}
          right={
            <Image
              source={require('../../assets/icons/ic_searchblck.png')}
              style={styles.searchIcon}
            />
          }
        />
        <View style={styles.clearFix} />
        <FlatList
          numColumns={3}
          horizontal={false}
          contentContainerStyle={{
            paddingTop: wp('2'),
          }}
          showsVerticalScrollIndicator={false}
          data={HubData}
          ListFooterComponent={() => {
            return (
              <View style={styles.currentDateConatainer}>
                <ResponsiveText style={styles.TodayText}>Today </ResponsiveText>
                <ResponsiveText style={styles.date}>22 August</ResponsiveText>
              </View>
            );
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.singleHubContainer}>
                <Image source={item.icon} style={styles.singleIcon} />
                <ResponsiveText style={styles.singleItemText}>
                  {item.title}
                </ResponsiveText>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </Container>
    );
  }
}

export default Hub;

const styles = {
  header: {paddingHorizontal: wp('7')},
  leftIconContainer: {
    padding: 7,
  },
  HeaderleftIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    // backgroundColor: 'red'
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
  clearFix: {
    height: wp('0.4'),
    backgroundColor: '#E1E1E1',
    // marginBottom:wp('4')
  },
  searchIcon: {
    height: wp('6'),
    width: wp('6'),
    resizeMode: 'contain',
  },
  singleHubContainer: {
    height: wp('28'),
    width: wp('33'),
    marginRight: wp('0.3'),
    marginBottom: wp('0.3'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleIcon: {
    height: wp('11'),
    width: wp('11'),
    resizeMode: 'contain',
    marginBottom: wp('1.5'),
  },
  singleItemText: {
    fontFamily: Fonts.OpenSansSemiBold,
    color: '#3A3A3A',
  },
  currentDateConatainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    marginRight: wp('10'),
    marginTop: wp('6'),
  },
  TodayText: {
    color: '#181818',
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 5,
  },
  date: {
    color: '#8A8A8A',
    fontFamily: Fonts.OpenSansSemiBold,
    fontSize: 5,
  },
};
