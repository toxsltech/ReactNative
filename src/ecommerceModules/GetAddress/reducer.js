import { GET_ADDRESS_FAILURE,GET_ADDRESS_REQUEST,GET_ADDRESS_SUCCESS } from './types'


const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false
}];

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ADDRESS_REQUEST:
            return {
                ...state,
                isBusy: true,
                response: null
            };
        case GET_ADDRESS_SUCCESS :
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };
        case GET_ADDRESS_FAILURE:
            return {
                ...state,
                isBusy: false,
                response: action.payload
            };

        default: return state;
    }
}

export default reducer;