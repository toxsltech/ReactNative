/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { DELETE_POST_FAILURE,DELETE_POST_SUCCESS,DELETE_POST_REQUEST } from './types';

export const DeletePost = async (id) => async dispatch => {
  dispatch({ type: DELETE_POST_REQUEST  });
  try {
  
    const response = await http.delete(`/post/post/` + id);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type:DELETE_POST_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: DDELETE_POST_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: DELETE_POST_FAILURE,
      payload: e,
    });
    throw e;
  }
};
