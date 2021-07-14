import http from "../../utils/http";
import { GET_ADDRESS_FAILURE, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS } from './types'

export const onGetAddress = async (id) => async (dispatch) => {

    dispatch({ type: GET_ADDRESS_REQUEST });
    try {
        const response = await http.get('auth/getAddress/' + id);
 
        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_ADDRESS_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_ADDRESS_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_ADDRESS_FAILURE,
            payload: e
        });
        throw e;
    }
}