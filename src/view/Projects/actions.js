import get from 'lodash/get';
import api from '../../utils/service/api';
import * as actions from '../../utils/constants/actions';

export const actionCreateProject = ({ params, payload }) => {
    const url = '/console/projects/new';
    return api({
        url,
        data: payload,
        method: "POST",
    })
}

export const actionGetProjectDetail = ({ payload }) => {
    const url = `/console/projects/detail/${payload.projectId}`;
    return api({
        url,
        method: 'GET'
    })
}

export const actionGetProjectList = () => async dispatch => {
    const url = '/console/projects/list';
    dispatch(fetchProjectList());
    try {
        const data = await api({
            url,
            method: 'GET',
        });

        const payload = get(data, 'data') || {};
        const recent = get(payload, 'recent.data') || [];
        payload.recent.data = recent.slice(0, 5);
        dispatch(fetchProjectListSuccess(payload))
        return payload;
    } catch (error) {
        console.log(error);
        dispatch(fetchProjectListError(error))
    }
}

export const fetchProjectList = () => {
    return {
        type: actions.FETCH_PROJECT_LIST
    }
}

export const fetchProjectListSuccess = (data) => {
    return {
        type: actions.FETCH_PROJECT_LIST_SUCCESS,
        payload: data
    }
}

export const fetchProjectListError = (error) => {
    return {
        type: actions.FETCH_PROJECT_LIST_ERROR,
        payload: error
    }
}