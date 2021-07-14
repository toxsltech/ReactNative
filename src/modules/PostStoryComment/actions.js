/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import http from '../../utils/http';
import { COMMENT_FAILURE,COMMENT_REQUEST,COMMENT_SUCCESS
 } from './types';

export const postStoryComment = async (storyID,replyText,parentId) => async dispatch => {
 
  dispatch({ type: COMMENT_REQUEST });
  try {
    const details = {
      'story': storyID,
      'title':replyText,
   
    }
    const response = await http.post(`/comment/addComment`, details);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: COMMENT_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: COMMENT_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: COMMENT_FAILURE,
      payload: e,
    });
    throw e;
  }
};

