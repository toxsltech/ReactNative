/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { RETURN_FAILURE, RETURN_REQUEST, RETURN_SUCCESS } from './types';
import showNotification from '../../utils/services'

export const AddReturn = async (productId, comment) => async dispatch => {
  dispatch({ type: RETURN_REQUEST });
  try {
    let body = {
      productId: productId,
      comment: comment,

    };
    const response = await http.post('review/comment', body);
    const status = response.data.success;
    if (status) {
      showNotification("success", response.data.message);
    } else {
      showNotification("danger", response.data.message);
    }
  } catch (e) {
    showNotification("danger", e.message);
  }
};
