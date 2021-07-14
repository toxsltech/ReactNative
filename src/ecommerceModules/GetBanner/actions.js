/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import http from "../../utils/http";
import { GET_BANNER_REQUEST, GET_BANNER_SUCCESS, GET_BANNER_FAILURE } from './types'

export const onGetBanner = async () => async (dispatch) => {

    dispatch({ type: GET_BANNER_REQUEST });
    try {
        const response = await http.get('banner/view');
        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_BANNER_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_BANNER_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_BANNER_FAILURE,
            payload: e
        });
        throw e;
    }
}



