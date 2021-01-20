import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Steps, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import UploadDatasets from '../../components/uploadDatasets';
import Labels from '../../components/labels';
import { actionGetProjectDetail } from '../project/ProjectAction';
import './CreateProject.scss';

const { Step } = Steps;

const CreateProject = (props) => {
  const { match, currentProject } = props;
  const [state, setState] = useState({ currentStep: 0 });
  const { currentStep } = state;
  const [breadcrumbList, setBreadcrumbList] = useState(['Vindr AI Platform', 'Home', '']);
  const { projectId = '' } = match?.params;

  useEffect(() => {
    if (match?.params?.projectId) {
      props.actionGetProjectDetail(match.params.projectId);
    }
    // eslint-disable-next-line
  }, [match]);

  useEffect(() => {
    if (currentProject) {
      const newBreadcrumb = [...breadcrumbList];
      newBreadcrumb[1] = currentProject.name || '';
      newBreadcrumb[2] = 'Create Project';
      setBreadcrumbList(newBreadcrumb);
    }
    // eslint-disable-next-line
  }, [currentProject]);

  const handleNextStep = (step = 0) => {
    if (currentStep >= 0 && currentStep <= 2) {
      setState({ ...state, currentStep: currentStep + step });
    }
  };

  return (
    <div className="common-style-page create-project-page">
      <div className="top-content">
        <div className="breadcrumb-content">
          <BreadCrumb breadcrumbList={breadcrumbList} />
        </div>
        <div className="step-container">
          <div className="step-content">
            <Steps current={currentStep}>
              <Step title="Datasets" />
              <Step title="Instructions & Labels" />
              <Step title="Labeling" />
            </Steps>
          </div>
          <div className="btn-change-step">
            <Button
              type="primary"
              shape="circle"
              icon={<LeftOutlined />}
              ghost
              className="btn-step"
              disabled={currentStep === 0}
              onClick={() => handleNextStep(-1)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<RightOutlined />}
              ghost
              className="btn-step"
              disabled={currentStep === 2}
              onClick={() => handleNextStep(1)}
            />
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className={`item-content ${currentStep === 0 ? 'is-show' : ''}`}>
          <UploadDatasets projectId={projectId} />
        </div>
        <div className={`item-content ${currentStep === 1 ? 'is-show' : ''}`}>
          <Labels projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    currentProject: state.project.currentProject,
  }),
  { actionGetProjectDetail }
)(withRouter(CreateProject));
