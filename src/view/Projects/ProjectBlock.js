import React from 'react';
import { Card, Skeleton } from 'antd';
import './ProjectStyle.scss';
import { CloudOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionGetProjectDetail } from './actions';


const { Meta } = Card;

function ProjectBlock(props) {
    const handleActiveProject = () => {
        props.history.push(`/projects/${props.data.project_id}/dashboard`)
        const payload = { projectId: props.data.project_id }
        actionGetProjectDetail({ payload });
    }

    if (!props.data) {
        return  <Skeleton active />
    }

    return (
        <Card
            hoverable
            style={{ width: '100%' }}
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
