/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */


import { VIEW_REQUEST, VIEW_SUCCESS, VIEW_FAILURE ,VIEW_HEART} from './types'

const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false,
    heart:false,
}];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VIEW_REQUEST:
            return {
                ...state,
                isBusy: true,
                response: null
            };
        case VIEW_SUCCESS:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
        case VIEW_FAILURE:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
            case VIEW_HEART:return{
                ...state,
            heart:!state.heart
    
            }

        default: return state;
    }
}

export default reducer;