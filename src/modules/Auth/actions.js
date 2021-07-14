/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export const onLogin = async (email, password, phoneNo, fcmToken) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let details = {
      email: email,
      password: password,
      phoneNo: phoneNo,
      fcmToken: fcmToken
    };

    const response = await http.post('/auth/login', details);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: e,
    });
    throw e;
  }
};
