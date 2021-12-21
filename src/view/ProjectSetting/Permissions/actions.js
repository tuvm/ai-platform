import get from 'lodash/get';
import api from "../../../utils/service/api";
import * as actions from '../../../utils/constants/actions';

const organization = "cad";

const getError = ({error}) => {
    return {error: get(error, 'response.data.detail')};
}

export const apiError = (response) => {
    const e = get(response, 'error');
    if(e == null || e == undefined){
        return false;
    }
    return e;
}

export const actionAddProjectMember = async ({project_id, payload}) => {
    const url = `/console/project-members/orgs/${organization}/projects/${project_id}/members`;
    try {
        const res = await api({ url, method: 'POST', data: payload });
        const data = get(res, 'data');
        return data;
    } catch (error) {
        return getError({error});
    }
}

export const actionListProjectMember = async ({params}) => {
    const url = `/console/project-members/orgs/${organization}/projects/${params.project_id}/members`;
    try {
        const res = await api({ url, method: 'GET'});
        const data = get(res, 'data');
        return data;
    } catch (error) {
        return getError({error});
    }
}

export const actionDeleteProjectMember = async ({project_id, member_id}) => {
    const url = `/console/project-members/orgs/${organization}/projects/${project_id}/member/${member_id}`;
    try {
        const res = await api({ url, method: 'DELETE'});
        const data = get(res, 'data');
        return data;
    } catch (error) {
        return getError({error});
    }
}

export const actionEditProjectMember = async ({project_id, member_id, payload}) => {
    const url = `/console/project-members/orgs/${organization}/projects/${project_id}/member/${member_id}`;
    try {
        const res = await api({ url, method: 'PUT', data: payload});
        const data = get(res, 'data');
        return data;
    } catch (error) {
        return getError({error});
    }
}