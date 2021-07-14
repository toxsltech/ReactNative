/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE } from './types';

export const onFollow = async (followTo) => async dispatch => {
  dispatch({ type: FOLLOW_REQUEST });
  try {
   
    const response = await http.post('/user/follow/' + followTo);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: FOLLOW_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: FOLLOW_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: FOLLOW_FAILURE,
      payload: e,
    });
    throw e;
  }
};
