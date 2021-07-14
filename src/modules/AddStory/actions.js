/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { ADD_STORY_REQUEST, ADD_STORY_SUCCESS, ADD_STORY_FAILURE } from './types';

export const onAddStory = async (title, description, storyImg, storyVideo, totalTime, ycoord, xcoord, colorcode, scale, storyDay) => async dispatch => {
  dispatch({ type: ADD_STORY_REQUEST });
  try {

    let details = {
      title: title,
      description: description,
      storyImg: storyImg,
      storyVideo: storyVideo,
      totalTime: totalTime,
      ycoordinate: xcoord,
      xcoordinate: ycoord,
      colorcode: colorcode,
      scale: scale,
      storyDay: storyDay
    }
    
    const formData = new FormData();
    Object.keys(details).forEach((data, key) => {
      formData.append(data, details[data]);
    });
    const response = await http.post('/story/add', formData);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: ADD_STORY_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: ADD_STORY_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: ADD_STORY_FAILURE,
      payload: e,
    });
    throw e;
  }
};
