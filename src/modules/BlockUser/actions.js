/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { BLOCK_USER_REQUEST, BLOCK_USER_SUCCESS, BLOCK_USER_FAILURE } from './types';

export const onBlock = async (blockedTo) => async dispatch => {
  dispatch({ type: BLOCK_USER_REQUEST });
  try {
    const details = { 'blockedTo': blockedTo }
    const response = await http.post(`/block/user`, details);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: BLOCK_USER_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: BLOCK_USER_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: BLOCK_USER_FAILURE,
      payload: e,
    });
    throw e;
  }
};
