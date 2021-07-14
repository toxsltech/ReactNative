/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { EDITTOCART_FAILURE, EDITTOCART_REQUEST, EDITTOCART_SUCCESS } from './types';

export const EditToCart = async (product, quantity, inc
) => async dispatch => {
  dispatch({ type: EDITTOCART_REQUEST });
  try {
    let body = {
      product: product,
      quantity: quantity,
      inc: inc
    };
    const response = await http.put('cart/edit', body);

    const status = response.data.success;

    if (status) {
      return dispatch({
        type: EDITTOCART_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: EDITTOCART_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: EDITTOCART_FAILURE,
      payload: e,
    });
    throw e;
  }
};
