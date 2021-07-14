/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { FOLLOWERS_REQUEST, FOLLOWERS_SUCCESS, FOLLOWERS_FAILURE, } from './types';

export const Followers = async () => async dispatch => {
  dispatch({ type: FOLLOWERS_REQUEST });
  try {


    const response = await http.get(`/user/followers`);
   
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: FOLLOWERS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: FOLLOWERS_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: FOLLOWERS_FAILURE,
      payload: e,
    });
    throw e;
  }
};
