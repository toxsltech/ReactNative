/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import http from '../../utils/http';
import {
  CONTACT_FAILURE,CONTACT_REQUEST,CONTACT_SUCCESS
} from './types';

export const isContact = async (fullName,email,message) => async dispatch => {
  dispatch({ type: CONTACT_REQUEST });
  try {
    const details = {
      'fullName':fullName,
      'email':email,
      'message':message
      
    }
 
    const response = await http.post(`contactUser/addContactUser`, details);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: CONTACT_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: CONTACT_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: CONTACT_FAILURE,
      payload: e,
    });
    throw e;
  }
};

