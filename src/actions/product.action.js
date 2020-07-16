import { PRODUCT_FETCHING, PRODUCT_SUCCESS, PRODUCT_FAILED, server } from './../constants';
import { httpClient } from '../util/HttpClient';

export const setStateProductToFetching = () => ({
    type: PRODUCT_FETCHING,
    
})
export const setStateProductToFailed = () => ({
    type: PRODUCT_FAILED,
    
})
export const setStateProductToSuccess = payload => ({
    type: PRODUCT_SUCCESS,
    payload: payload
  });

export const getProduct = ()=> {
    return dispatch => {
        dispatch(setStateProductToFetching());
        doGetProduct(dispatch)
    }
}

const doGetProduct = async dispatch => {
    try {
        let result = await httpClient.get(server.PRODUCT_URL);
        dispatch(setStateProductToSuccess(result.data))
    } catch (err) {
        dispatch(setStateProductToFailed())
    }
}