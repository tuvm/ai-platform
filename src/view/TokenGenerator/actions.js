import get from 'lodash/get';
import api from '../../utils/service/api';
import * as actions from '../../utils/constants/actions';

export const actionGenerateToken = ({ params, payload }) => {
    const url = '/api-key/generate';
    try {
        return api({
            url,
            data: payload,
            method: "POST",
        });
    } catch (error) {
        console.log(error);
    }
}

export const actionGetAPIKeys = async () => {
    const url = '/api-key/list';
    try {
        const { data } = await api({
            url,
            method: 'GET',
        });

        console.log({ data })

        const payload = get(data, 'data') || [];
        window.store.dispatch({ type: actions.FETCH_API_KEY_LIST, payload });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const actionRevokeAPIKey = async ({ params }) => {
    const url = '/api-key/revoke';
    try {
        return api({
            url,
            method: 'GET',
            params
        });

    } catch (error) {
        console.log(error);
    }
}