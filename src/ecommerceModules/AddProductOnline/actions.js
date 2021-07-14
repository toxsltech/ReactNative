/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { ADDTOPRODUCTONLINE_FAILURE, ADDTOPRODUCTONLINE_REQUEST, ADDTOPRODUCTONLINE_SUCCESS } from './types';

export const AddToProductOnline = async (body) => async dispatch => {
  dispatch({ type: ADDTOPRODUCTONLINE_REQUEST });
  try {
    const response = await http.post('order/payment', body);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: ADDTOPRODUCTONLINE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ADDTOPRODUCTONLINE_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: ADDTOPRODUCTONLINE_FAILURE,
      payload: e,
    });
    throw e;
  }
};
