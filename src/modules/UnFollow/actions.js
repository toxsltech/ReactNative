/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE } from './types';

export const onUnFollow = async (followBy) => async dispatch => {
  dispatch({ type: UNFOLLOW_REQUEST });
  try {
    const response = await http.put('/user/unfollow/' + followBy);
    
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: UNFOLLOW_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: UNFOLLOW_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: UNFOLLOW_FAILURE,
      payload: e,
    });
    throw e;
  }
};
