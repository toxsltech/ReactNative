/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { GET_FEED_REQUEST, GET_FEED_SUCCESS, GET_FEED_FAILURE } from './types'

const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false
}];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_FEED_REQUEST:
            return {
                ...state,
                isBusy: true,
                response: null
            };
        case GET_FEED_SUCCESS:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
        case GET_FEED_FAILURE:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };

        default: return state;
    }
}

export default reducer;