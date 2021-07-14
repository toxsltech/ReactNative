import { GET_STORE_FAILURE,GET_STORE_REQUEST,GET_STORE_SUCCESS } from './types'


const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false
}];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_STORE_REQUEST:
            return {
                ...state,
                isBusy: true,
                response: null
            };
        case GET_STORE_SUCCESS :
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
        case GET_STORE_FAILURE:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };

        default: return state;
    }
}

export default reducer;