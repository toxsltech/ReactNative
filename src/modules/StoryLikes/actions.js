/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import {
  LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE, LIKE_HEART
} from './types';

export const isStoryLiked = async (storyID, isLiked) => async dispatch => {
  dispatch({ type: LIKE_REQUEST });
  try {
    const details = {
      "storyId": storyID,
      "isLiked": isLiked,

    }

    const response = await http.post(`like/addstoryLikes/`, details);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: LIKE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: LIKE_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: LIKE_FAILURE,
      payload: e,
    });
    throw e;
  }
};
export const likeheart = () => {
  return {
    type: LIKE_HEART,
    payload: 'my first redux pen'
  }
}
