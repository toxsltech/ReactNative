/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { ADDTOCART_FAILURE, ADDTOCART_REQUEST, ADDTOCART_SUCCESS } from './types';

export const AddToCart = async (product, quantity, sleeve, size, color, measurement
) => async dispatch => {
  dispatch({ type: ADDTOCART_REQUEST });
  try {
    let body = {
      product: product,
      quantity: quantity,
      sleeve: sleeve,
      size: size,
      color: color,
      measurement: measurement
    };
    const response = await http.post('cart/add', body);

    const status = response.data.success;

    if (status) {
      return dispatch({
        type: ADDTOCART_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ADDTOCART_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: ADDTOCART_FAILURE,
      payload: e,
    });
    throw e;
  }
};
