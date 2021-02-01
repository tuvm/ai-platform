import api from '../../utils/service/api';

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

export const actionGetTokenList = async () => {
    const url = '/api-key/list';
    try {
        return api({
            url,
            method: 'GET',
        });

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