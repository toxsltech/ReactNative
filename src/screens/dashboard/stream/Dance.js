/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { livePosts } from '../../../components/DummyData';
import PostCard from '../../../components/PostCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

class Dance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postMenu: false,
    };
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: "center" }}>No Result Found</Text>
      </View>

    );
  }

}

export default Dance;
const styles = {};
