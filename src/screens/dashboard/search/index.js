/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Container from '../../../components/Container';
import InputField from '../../../components/InputField';
import AppHeader from '../../../components/AppHeader';
import Fonts from '../../../themes/Fonts';
import User from './User';
import HashTag from './HashTag';
import { androidHeight, iosH4 } from '../../../utils/constants';

const Tab = createMaterialTopTabNavigator();
function FollowerTab(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#AEAEAE',
        labelStyle: { fontFamily: Fonts.RobotoBold, textTransform: 'capitalize' },
        style: {
          marginHorizontal: wp('5'),
          borderColor: 'white',
          elevation: 0,
        },
        indicatorStyle: {
          height: wp('0.8'),
          borderRadius: wp('5'),
          backgroundColor: '#000000',
          alignSelf: 'center',
        },
      }}>
      <Tab.Screen
        listeners={{ focus: () => props.resetBar() }}
        name="User"
        component={() => (
          <User searchText={props.searchText} navigation={props.navigation} />
        )}
      />
      <Tab.Screen
        listeners={{ focus: () => props.resetBar() }}
        name="HashTag"
        component={() => <HashTag navigation={props.navigation} searchText={props.searchText} />}
      />
    </Tab.Navigator>
  );
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      Posts: this.props.route.params
    };
  }

  resetBar = () => {
    this.setState({ searchText: '', });
  };

  render() {

    return (
      <Container style={{
        flex: 1, paddingVertical: Platform.OS === 'ios' ? iosH4 : androidHeight
      }}>
        <AppHeader
          leftStyle={{ paddingVertical: 5, paddingHorizontal: 3 }}
          left={
            <Image
              source={require('../../../assets/icons/left_chevron2.png')}
              style={styles.headerLeftIcon}
            />
          }
          leftPress={() => this.props.navigation.goBack()}
          body={
            <InputField
              value={this.state.searchText}
              onChangeText={(e) => this.setState({ searchText: e })}
              leftIcon={
                <Image
                  source={require('../../../assets/icons/search.png')}
                  style={styles.searchIcon}
                />
              }
              inputField={styles.searchText}
              containerStyle={styles.headerSearchbar}
              placeholder={'Search'}
            />
          }
          right={
            <View>
              <Image
                source={require('../../../assets/icons/Notification.png')}
                style={styles.headerNotificationIcon}
              />
              <View style={styles.notificationBadge} />
            </View>
          }
          rightPress={() => this.props.navigation.navigate('Notification')}
        />

        <FollowerTab
          searchText={this.state.searchText}
          resetBar={this.resetBar}
          navigation={this.props.navigation}
        />
      </Container>
    );
  }
}

export default Search;

const styles = {
  headerLeftIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    tintColor: '#3A3A3A',
  },
  headerSearchbar: {
    width: wp('73'),
    height: wp('11'),
    borderRadius: wp('10'),
    marginLeft: -wp('2'),
    backgroundColor: '#F2F2F2',
    borderWidth: 0,
    paddingLeft: wp('3'),
  },
  searchIcon: {
    height: wp('4.5'),
    width: wp('4.5'),
    resizeMode: 'contain',
    marginLeft: wp('1'),
  },
  searchText: {
    fontFamily: Fonts.RobotoBold,
    fontSize: wp('3.5'),
    marginLeft: -wp('1.5'),
  },
  notificationBadge: {
    height: wp('2.8'),
    width: wp('2.8'),
    backgroundColor: '#59EF0E',
    borderRadius: wp('2.8'),
    position: 'absolute',
    right: -4,
    top: -1.5,
    elevation: 1,
  },
  headerNotificationIcon: {
    height: wp('7'),
    width: wp('7'),
    resizeMode: 'contain',
    tintColor: '#025960',
  },
};
