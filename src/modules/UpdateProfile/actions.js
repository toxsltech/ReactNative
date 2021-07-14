/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

import http from '../../utils/http';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
} from './types';

export const onupdateProfile = async (
  id,
  Image,
  userName,
  email,
  phoneNo,
  gender,
  birthday,
  countryCode,
  country,
  description
) => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    let details = {
      id: id,
      profileImg: Image,
      userName: userName,
      email: email,
      phoneNo: phoneNo,
      gender: gender,
      birthday: birthday,
      countryCode: countryCode,
      country: country,
      description: description
    };
  
    const formData = new FormData();
    Object.keys(details).forEach((data, key) => {
      formData.append(data, details[data]);
    });
    const response = await http.put('/auth/updateProfile', formData);

    const status = response.data.success;
    if (status) {
      return dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload: response,
      });
    }
  } catch (e) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: e,
    });
    throw e;
  }
};
