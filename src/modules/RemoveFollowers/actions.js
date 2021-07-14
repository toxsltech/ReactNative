/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { REMOVE_REQUEST, REMOVE_SUCCESS, REMOVE_FAILURE } from './types';

export const onRemove = async (followBy) => async dispatch => {
  dispatch({ type: REMOVE_REQUEST });
  try {
    const response = await http.put('/user/removeFollowing/' + followBy);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: REMOVE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: REMOVE_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: REMOVE_FAILURE,
      payload: e,
    });
    throw e;
  }
};
