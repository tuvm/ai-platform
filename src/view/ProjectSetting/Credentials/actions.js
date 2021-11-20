import get from 'lodash/get';
import api from "../../../utils/service/api";
import * as actions from '../../../utils/constants/actions';

export const actionGrantAPIKey = async ({ payload }) => {
    const url = '/resource/resource-access/grant';
    try {
        const res = await api({ url, method: 'POST', data: payload });
        const data = get(res, 'data');
        return data;
    } catch (error) {
    }
}


export const actionGenerateAPIKey = async ({ payload }) => {
    const url = '/key/api-key-v2/generate';
    try {
        const res = await api({ url, method: 'POST', data: payload });
        const data = get(res, 'data');
        return data;
    } catch (error) {
    }
}

export const actionUpdateCredential = async ({ payload }) => {
    const url = `/key/api-key-v2/update/${payload.id}`;
    try {
        const res = await api({ url, method: 'PUT', data: payload });
        const data = get(res, 'data');
        return data;
    } catch (error) {
    }
}


export const actionDeleteCredential = ({ payload }) => {
    const url = `/key/api-key-v2/${payload.id}`;
    try {
        return api({ url, method: 'DELETE' });
    } catch (error) {
    }
}


export const actionRevokeCredential = ({ payload }) => {
    const url = `/key/api-key-v2/revoke/${payload.id}`;
    try {
        return api({ url, method: 'POST' });
    } catch (error) {
    }
}

export const actionGetResourceList = ({ params }) => async dispatch => {
    const url = '/resource/resources/list';
    dispatch({ type: actions.FETCH_RESOURCE })
    try {
        const res = await api({ url, method: 'GET', params });
        const data = get(res, 'data');
        dispatch({ type: actions.FETCH_RESOURCE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: actions.FETCH_RESOURCE_ERROR })
    }
}

export const actionGetCredentialList = async ({ params }) => {
    const url = '/key/api-key-v2/list';
    try {
        const res = await api({ url, method: 'GET', params });
        const data = get(res, 'data.data');
        return data;
    } catch (error) {
    }
}