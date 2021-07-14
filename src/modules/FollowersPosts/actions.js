/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import http from "../../utils/http";
import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from './types'

export const onGetFollowersPosts = async () => async (dispatch) => {
    dispatch({ type: GET_POSTS_REQUEST });
    try {
        const response = await http.get('/user/followingPostData');
       
        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_POSTS_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_POSTS_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_POSTS_FAILURE,
            payload: e
        });
        throw e;
    }
}



