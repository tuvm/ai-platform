import React from 'react';
import { Card, Skeleton } from 'antd';
import './ProjectStyle.scss';
import { CloudOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionGetProjectDetail } from './actions';
import { useDispatch } from 'react-redux';
import { actionGetResourceList } from '../ProjectSetting/Credentials/actions';


const { Meta } = Card;

function ProjectBlock(props) {
    const dispatch = useDispatch();

    const handleActiveProject = () => {
        props.history.push(`/projects/${props.data.project_id}/dashboard`)
        const payload = { projectId: props.data.project_id }
        actionGetProjectDetail({ payload });
        dispatch(actionGetResourceList({ params: { project_id: props.data.project_id }}))
    }

    if (!props.data) {
        return  <Skeleton active />
    }

    return (
        <Card
            hoverable
            style={{ width: '100%', minWidth: 150 }}
            onClick={handleActiveProject}
        >
            <div className="project-block">
                <Meta title={props.data.name} description={props.data.project_id} />
            </div>
            <CloudOutlined key="setting" style={{ fontSize: '20px' }} />
        </Card>
    );
}


export default connect(
    (state) => { },
    null
)(withRouter(ProjectBlock));
