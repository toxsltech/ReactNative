/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { ADDTOPRODUCT_FAILURE, ADDTOPRODUCT_REQUEST, ADDTOPRODUCT_SUCCESS } from './types';

export const AddToProduct = async (body) => async dispatch => {
  dispatch({ type: ADDTOPRODUCT_REQUEST });
  try {
   
    const response = await http.post('order/add', body);
    const status = response.data.success;

    if (status) {
      return dispatch({
        type: ADDTOPRODUCT_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ADDTOPRODUCT_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: ADDTOPRODUCT_FAILURE,
      payload: e,
    });
    throw e;
  }
};
