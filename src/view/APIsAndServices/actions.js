import api from '../../utils/service/api';


export const actionQueryAPIUsage = ({ params, payload }) => {
    const url = '/usage/visual';
    return api({
        url,
        method: 'GET',
        params
    })
}