import get from 'lodash/get';
import api from '../../utils/service/api';
// import * as actions from '../../../utils/constants/actions';

export const actionCreateProject = ({ params, payload }) => {
    const url = '/projects/new';
    try {
        return api({
            url,
            data: payload,
            method: "POST",
        })
    } catch (error) {
        console.log(error);
    }
}

export const actionGetProjectList = () => {
    const url = '/projects/list';

    try {
        return api({
            url,
            method: 'GET',
        });

        // const payload = get(data, 'data') || [];
        // return payload;
    } catch (error) {
        console.log(error);
    }
}