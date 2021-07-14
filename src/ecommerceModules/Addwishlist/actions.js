/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { WISHLIST_FAILURE,WISHLIST_REQUEST,WISHLIST_SUCCESS} from './types';

export const onWishlist = async (body) => async dispatch => {
  dispatch({ type: WISHLIST_REQUEST });
  try {
   
    const response = await http.post('favorite/add' ,body);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: WISHLIST_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: WISHLIST_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: WISHLIST_FAILURE,
      payload: e,
    });
    throw e;
  }
};
