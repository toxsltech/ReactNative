/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import http from "../../utils/http";
import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE } from './types'

export const OnForgotPassword = async (email) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        let details = {
            'email': email
        };
        const formData = new FormData();
        Object.keys(details).forEach((data, key) => {
            formData.append(data, details[data]);
        })
        const response = await http.post('/auth/forgotPassword', formData);
        const status = response.data.success
        if (status) {
            return dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: FORGOT_PASSWORD_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: e
        });
        throw e;
    }
}



