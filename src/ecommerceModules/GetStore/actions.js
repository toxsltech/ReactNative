import http from "../../utils/http";
import { GET_STORE_FAILURE, GET_STORE_REQUEST, GET_STORE_SUCCESS } from './types'

export const onGetStore = async (id) => async (dispatch) => {

    dispatch({ type: GET_STORE_REQUEST });
    try {
        const response = await http.get('/product/getSellerProduct' + '?sellerId=' + id);
 
        const status = response.data.success
        if (status) {
            return dispatch({
                type: GET_STORE_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: GET_STORE_FAILURE,
                payload: response
            })
        }
    } catch (e) {
        dispatch({
            type: GET_STORE_FAILURE,
            payload: e
        });
        throw e;
    }
}