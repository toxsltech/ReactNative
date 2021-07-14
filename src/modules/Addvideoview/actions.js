/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import http from '../../utils/http';
import {
  VIDEOVIEW_SUCCESS,VIDEOVIEW_REQUEST,VIDEOVIEW_FAILURE
} from './types';

export const videoview= async postID => async dispatch => {
  dispatch({ type: VIDEOVIEW_REQUEST });
  try {
    const details = {
      'postID':postID,
      
      
    }
   
    const response = await http.put(`/post/updateVideoCount/`+ postID);
 
  
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: VIDEOVIEW_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: VIDEOVIEW_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: VIDEOVIEW_FAILURE,
      payload: e,
    });
    throw e;
  }
};

