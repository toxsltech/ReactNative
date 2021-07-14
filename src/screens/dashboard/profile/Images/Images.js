/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import React from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen/index';
import { BASE_URL } from '../../../../utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showNotification from '../../../../utils/services'

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Image: [],
      loadingVideoback: true
    };
  }

  componentDidMount() {
    this.props.onGetFeeds().then(() => this.afterGetFeed());
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getviewersrefresh()
    });
  }

  getviewersrefresh = async () => {
    try {
      const deletepost = await AsyncStorage.getItem('deletepost')
      if (deletepost == 'true') {
        await AsyncStorage.setItem('deletepost', 'false')
        this.props.onGetFeeds().then(() => this.afterGetFeed());
      }
    } catch (e) {
      showNotification("danger", e);

    }
  }

  afterGetFeed = () => {
    const postData = this.props.getfeedResponse ? this.props.getfeedResponse.data : '';
    this.setState({ Image: postData, loadingVideoback: false });
  }

  render() {

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
          nestedScrollEnabled={false}
          numColumns={4}
          horizontal={false}
          bounces={false}

          contentContainerStyle={{
            backgroundColor: 'white',
            paddingTop: wp('0.45'),
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.Image}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SinglePost', {
                    item: item,
                    index: index
                  })
                }>
                {item.type == 0 ?
                  <Image
                    source={
                      item
                        ? { uri: BASE_URL + item.postImg }
                        : require('../../../../assets/images/placeholderthumbnail.jpg')
                    }
                    style={styles.image}
                  />
                  : null}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}

export default Images;

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
  image: {
    height: wp('45'),
    width: wp('33'),
    marginRight: wp('0.3'),
    marginBottom: wp('0.3'),
    backgroundColor: '#E1E1E1',
  },
};
