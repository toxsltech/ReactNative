/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { UNDO_LIKE_REQUEST, UNDO_LIKE_SUCCESS, UNDO_LIKE_FAILURE } from './types';

export const undoLiked = async (postId) => async dispatch => {
  dispatch({ type: UNDO_LIKE_REQUEST });
  try {
    const details = {
      'postId': postId
    }
    const response = await http.delete(`/like/delete`, details);
    
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: UNDO_LIKE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: UNDO_LIKE_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: UNDO_LIKE_FAILURE,
      payload: e,
    });
    throw e;
  }
};
