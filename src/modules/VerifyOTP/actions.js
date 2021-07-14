/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import http from "../../utils/http";
import { VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE } from './types'

export const onVerifyingOTP = async (email, otp) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    try {
        let details = {
            'email': email,
            'otp': otp,
        };
        const response = await http.post('/auth/verifyOtp', details);
        const status = response.data.success
        if (status) {
            return dispatch({
                type: VERIFY_OTP_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: VERIFY_OTP_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: e
        });
        throw e;
    }
}



