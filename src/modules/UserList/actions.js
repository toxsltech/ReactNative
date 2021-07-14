/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import http from "../../utils/http";
import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE } from './types'

export const onGetUsers = async () => async (dispatch) => {

    dispatch({ type: GET_USERS_REQUEST });
    try {
        const response = await http.get('/auth/users');

        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_USERS_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_USERS_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: e
        });
        throw e;
    }
}



