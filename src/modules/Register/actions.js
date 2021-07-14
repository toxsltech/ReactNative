/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from './types';

export const onRegister = async (
  userName,
  email,
  password,
  countryCode,
  phoneNo,
  country,
) => async dispatch => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    let details = {
      userName: userName,
      email: email,
      password: password,
      countryCode: countryCode,
      phoneNo: phoneNo,
      country: country,
    };

    const formData = new FormData();
    Object.keys(details).forEach((data, key) => {
      formData.append(data, details[data]);
    });
    const response = await http.post('/auth/signup', formData);
   
    const status = response.data.success;
    if (status) {
      return dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: e,
    });
    throw e;
  }
};









