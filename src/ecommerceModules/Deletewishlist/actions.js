/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import {DELETEWISHLIST_SUCCESS,DELETEWISHLIST_REQUEST,DELETEWISHLIST_FAILURE} from './types';

export const onDeleteWishlist = async (id) => async dispatch => {
  dispatch({ type: DELETEWISHLIST_REQUEST });
  try {
   
    const response = await http.delete('favorite/delete/' + id);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: DELETEWISHLIST_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: DELETEWISHLIST_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: DELETEWISHLIST_FAILURE,
      payload: e,
    });
    throw e;
  }
};
