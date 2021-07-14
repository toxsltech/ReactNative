/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import http from '../../utils/http';
import {
  SELLER_SUCCESS, SELLER_REQUEST, SELLER_FAILURE
} from './types';

export const sellerProfile = async (fullNameOfSeller, business, description, lat, long, address, storeName, storeImage) => async dispatch => {
  dispatch({ type: SELLER_REQUEST });
  try {
    const details = {
      'fullNameOfSeller': fullNameOfSeller,
      'business': business,
      'description': description,
      'lat': lat,
      'long': long,
      'address': address,
      'storeName': storeName,
      'storeImage': storeImage

    }
    const formData = new FormData();
    Object.keys(details).forEach((data, key) => {
      formData.append(data, details[data]);
    });

    const response = await http.post(`/seller/createAccount`, formData);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: SELLER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: SELLER_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: SELLER_FAILURE,
      payload: e,
    });
    throw e;
  }
};

