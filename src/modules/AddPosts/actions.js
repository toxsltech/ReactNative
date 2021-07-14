/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { ADD_POSTS_REQUEST, ADD_POSTS_SUCCESS, ADD_POSTS_FAILURE } from './types';
export const onAddPosts = async (title, description, postImg, postVideo, totalTime, thumbnail) => async dispatch => {
  dispatch({ type: ADD_POSTS_REQUEST });
  try {

    let details = {
      title: title,
      description: description,
      postImg: postImg,
      postVideo: postVideo,
      postTime: totalTime,
      thumbnail: thumbnail
    };
 
    const formData = new FormData();
    Object.keys(details).forEach((data, key) => {
      formData.append(data, details[data]);
    });
    const response = await http.post('/post/post', formData);
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: ADD_POSTS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ADD_POSTS_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: ADD_POSTS_FAILURE,
      payload: e,
    });
    throw e;
  }
};
