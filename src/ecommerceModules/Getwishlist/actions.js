/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import http from "../../utils/http";
import { GET_WISHLIST_FAILURE,GET_WISHLIST_SUCCESS,GET_WISHLIST_REQUEST } from './types'

export const onGetWishlist = async () => async (dispatch) => {

    dispatch({ type: GET_WISHLIST_REQUEST });
    try {
        const response = await http.get('favorite/view');
        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_WISHLIST_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_WISHLIST_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_WISHLIST_FAILURE,
            payload: e
        });
        throw e;
    }
}



