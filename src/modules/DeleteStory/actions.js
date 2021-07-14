/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } from './types';

export const DeleteStory = async (id) => async dispatch => {
  dispatch({ type: DELETE_REQUEST });
  try {
  
    const response = await http.delete(`/story/story/` + id);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: DELETE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: DELETE_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: DELETE_FAILURE,
      payload: e,
    });
    throw e;
  }
};
