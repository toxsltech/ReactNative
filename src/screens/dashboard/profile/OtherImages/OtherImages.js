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

class OtherImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Image: [],
      data: [],
      loadingVideoback: true
    };
  }

  componentDidMount() {
    this.fetch();

  }

  fetch = async () => {
    const postID = await AsyncStorage.getItem('postID')
    var token = await AsyncStorage.getItem('token');
    fetch(BASE_URL + 'auth/getAllUserProfile/' + postID, {
      method: 'GET',
      headers: {
        'x-token': `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const Info1 = json ? json.data : '';
        const OtherPosts = Info1.map((item) => item.postData)
        this.setState({ Image: OtherPosts[0], data: Info1, loadingVideoback: false })
      }
      )
      .catch(err => {
        showNotification("danger", err.message);
      })
  }

  render() {

    const { data } = this.state;
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
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingTop: wp('0.45'),
          }}
          bounces={false}

          showsVerticalScrollIndicator={false}
          data={this.state.Image}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('OtherSinglePost ', {
                    postBodyData: data,
                    data: item,
                    mediaType: 'Image',
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

export default OtherImages;

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
