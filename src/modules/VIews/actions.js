/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import {
  VIEW_REQUEST, VIEW_SUCCESS, VIEW_FAILURE, VIEW_HEART
} from './types';

export const isViewed = async (storyId) => async dispatch => {
  dispatch({ type: VIEW_REQUEST });
  try {
    const details = {
      'storyId': storyId
    }

    const response = await http.put(`/like/addStoryView/`, details);
   
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: VIEW_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: VIEW_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: VIEW_FAILURE,
      payload: e,
    });
    throw e;
  }
};
export const likeheart = () => {
  return {
    type: VIEW_HEART,
    payload: 'my first redux pen'
  }
}
