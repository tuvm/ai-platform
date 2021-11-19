import get from 'lodash/get';
import api from "../../../utils/service/api";
import * as actions from '../../../utils/constants/actions';

export const actionGrantAPIKey = async ({ payload }) => {
    console.log({payload})
    const url = '/resource/resource-access/grant';
    try {
        const res =  await api({ url, method: 'POST', data: payload });
        const data = get(res, 'data');
        return data;
    } catch (error) {
    }
}


export const actionGenerateAPIKey = async ({ payload }) => {
    console.log({payload})
    const url = '/key/api-key-v2/generate';
    try {
        const res =  await api({ url, method: 'POST', data: payload });
        const data = get(res, 'data');
        return data;
    } catch (error) {
    }
}


export const actionGetResourceList = ({ params }) => async dispatch => {
    const url = '/resource/resources/list';
    dispatch({ type: actions.FETCH_RESOURCE })
    try {
        const res =  await api({ url, method: 'GET', params });
        const data = get(res, 'data');
        dispatch({ type: actions.FETCH_RESOURCE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.FETCH_RESOURCE_ERROR })
    }
}
