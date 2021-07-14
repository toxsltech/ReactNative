/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import ResponsiveText from '../ResponsiveText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import countriesData from './countries';
import Modal from 'react-native-modal';
import { androidH2, iosH2 } from '../../utils/constants'
export default class CodePickerModal extends React.Component {
  state = {
    countryQuery: '',
  };

  render() {
    return (
      <Modal
        style={{ flex: 1 }}
        testID={'modal'}
        isVisible={this.props.visible}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
      >
        <View style={styles.content}>
          <ResponsiveText style={styles.modalTitle}>Select Country</ResponsiveText>
          <TextInput
            value={this.state.countryQuery}
            onChangeText={(countryQuery) => this.setState({ countryQuery })}
            placeholder={'Filter Country'}
            style={{
              backgroundColor: '#F6F8FA',
              borderRadius: 5,
              height: Platform.OS === 'ios' ? iosH2 : androidH2
            }}
          />
          <View style={styles.listContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={countriesData.filter(
                (item) =>
                  item.name
                    .toLowerCase()
                    .indexOf(this.state.countryQuery.toLowerCase()) > -1,
              )}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this.props.onCodeSelect(item)}
                  style={styles.itemView}>
                  <ResponsiveText style={styles.listTitle}>
                    {item.name}
                  </ResponsiveText>
                  <ResponsiveText style={styles.listPrice}>
                    +{item.dialCode}
                  </ResponsiveText>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    paddingBottom: 0,
  },
  modalTitle: {
    fontSize: 5,
    color: '#025960',
  },
  listContainer: {
    paddingVertical: 10,
    height: hp('50%'),
  },
  itemView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#CECECE',
  },
  listTitle: {
    flex: 1,
    color: '#808080',
  },
  listPrice: {
    fontSize: '4.5%',
    color: '#808080',
    paddingVertical: wp('2%'),
    minWidth: wp('15%'),
  },
};
