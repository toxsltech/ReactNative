/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { FOLLOWING_REQUEST, FOLLOWING_SUCCESS, FOLLOWING_FAILURE, } from './types';

export const Following = async () => async dispatch => {
  dispatch({ type: FOLLOWING_REQUEST });
  try {


    const response = await http.get(`/user/following`);
   
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: FOLLOWING_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: FOLLOWING_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: FOLLOWING_FAILURE,
      payload: e,
    });
    throw e;
  }
};
