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
    if (loading) {
      return;
    }
    props.history.push(`/projects/${props.data.project_id}/dashboard`);
    const payload = { projectId: props.data.project_id };
    actionGetProjectDetail({ payload });
    dispatch(
      actionGetResourceList({ params: { project_id: props.data.project_id } })
    );
  };

  if (!props.data) {
    return <Skeleton active />;
  }

  const loading = props.data.provision_status === 'processing';

  return (
    <Card
      hoverable={!loading}
      style={{ width: '100%', minWidth: 150, minHeight: 224 }}
      onClick={handleActiveProject}
    >
      <div className="project-block">
        <Skeleton loading={loading} title description>
          <Meta title={props.data.name} description={props.data.project_id} />
        </Skeleton>
      </div>
      <CloudOutlined key="setting" style={{ fontSize: '20px' }} />
    </Card>
  );
}

export default withRouter(ProjectBlock);
