/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { cos } from "react-native-reanimated";
import http from "../../utils/http";
import { GET_OTHER_PROFILE_REQUEST, GET_OTHER_PROFILE_SUCCESS, GET_OTHER_PROFILE_FAILURE } from './types'

export const onGetAllProfile = async (postID) => async (dispatch) => {
    dispatch({ type: GET_OTHER_PROFILE_REQUEST });
    try {
   
        const response = await http.get('/auth/getAllUserProfile/' + postID);

        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_OTHER_PROFILE_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_OTHER_PROFILE_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_OTHER_PROFILE_FAILURE,
            payload: e
        });
        throw e;
    }
}



