/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE ,LIKE_HEART} from './types'

const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false,
    heart:false,
}];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIKE_REQUEST:
            return {
                ...state,
                isBusy: true,
                response: null
            };
        case LIKE_SUCCESS:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
        case LIKE_FAILURE:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
            case LIKE_HEART:return{
                ...state,
            heart:!state.heart
    
            }

        default: return state;
    }
}

export default reducer;