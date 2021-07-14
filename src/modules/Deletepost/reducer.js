/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { DELETE_POST_FAILURE,DELETE_POST_REQUEST,DELETE_POST_SUCCESS } from './types';


const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false
}];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
            return {
                ...state,
                isBusy: true,
                response: null
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
        case DELETE_POST_FAILURE:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };

        default: return state;
    }
}

export default reducer;