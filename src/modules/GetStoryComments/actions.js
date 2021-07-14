/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { GET_COMMENTS_REQUEST, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE } from './types';

export const getStoryComments = async (id) => async dispatch => {
  dispatch({ type: GET_COMMENTS_REQUEST });
  try {

    const response = await http.get(`/comment/getStoryDetails/` + id);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_COMMENTS_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: GET_COMMENTS_FAILURE,
      payload: e,
    });
    throw e;
  }
};
