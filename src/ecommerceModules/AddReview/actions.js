/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { REVIEW_FAILURE, REVIEW_REQUEST, REVIEW_SUCCESS } from './types';

export const onReview = async (productId, comment) => async dispatch => {
  dispatch({ type: REVIEW_REQUEST });
  try {
    let body = {
      productId: productId,
      comment: comment,
    
    };
    const response = await http.post('review/comment', body);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: REVIEW_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: REVIEW_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: REVIEW_FAILURE,
      payload: e,
    });
    throw e;
  }
};
