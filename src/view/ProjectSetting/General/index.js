import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Typography, Menu, Dropdown, message, Modal, Col, Row, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { useProjectsParams } from '../../../utils/hooks';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import { apiError, actionChangeSubcription } from './actions';
import { actionGetProjectList } from '../../Projects/actions';
import { useDispatch } from 'react-redux';
import '../ProjectSetting.scss';
import {
  PERM_PROJECT_SUBCRIPTION_EDIT
} from '../../../utils/permission/perms';
import UserService from '../../system/userService';

const { Title } = Typography;

export default function General() {
  const { t } = useTranslation();
  const { params } = useProjectsParams();
  const [project, setProject] = useState([]);
  const [selectedSubcription, setSelectedSubcription] = useState([]);
  const [openConfirmChangeSubcriptionModal, setOpenConfirmChangeSubcriptionModal] = useState(false);
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state.system.ticket);
  const projectId = get(params, 'projectId', '');
  const projectList = useSelector((state) => state.system.projectList);

  const canChangeChangeSubcription = () => {
    return UserService.hasPerm(ticket, [PERM_PROJECT_SUBCRIPTION_EDIT]);
  };

  const handleChangeSubcription = async () => {
    setOpenConfirmChangeSubcriptionModal(false);
    const response = await actionChangeSubcription({project_id: projectId, type: selectedSubcription});
    if(apiError(response)){
        message.error(apiError(response));
        return
    }
    dispatch(actionGetProjectList());
    message.success(t("IDS_CHANGE_SUBCRIPTION_SUCCESS"));
  }

  const handleCancelChangeSubcription = () =>{
    setOpenConfirmChangeSubcriptionModal(false);
  }

  const onChangeSubcription = async (e) => {
    console.log({e})
    setOpenConfirmChangeSubcriptionModal(true);
    setSelectedSubcription(e.target.value);
  }

  const rows = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Project ID',
      dataIndex: 'project_id',
      key: 'project_id',
    },
    {
      title: 'Created Time',
      dataIndex: 'created_time',
      key: 'created_time',
      render: (val) => {
        return moment(val).format(
          'MMM, D YYYY, h:mm:ss A'
        )
      }
    },
    {
      title: 'Subcription status',
      dataIndex: 'type',
      key: 'type',
      render: (val) => {
        return (
          <Radio.Group value={val} disabled={!canChangeChangeSubcription()}
            onChange={onChangeSubcription} buttonStyle="solid">
            <Radio.Button value="free">Free</Radio.Button>
            <Radio.Button value="premium">Premium</Radio.Button>
          </Radio.Group>
        )
      }
    }
  ]

  useEffect(() => {
    const project_ = (projectList.all.data || []).find(p => p.project_id == projectId);
    if(project_){
      setProject(project_);
    }
  }, [projectId, projectList]);


  return (
    <div className="general-page credential-page content-inner-center">
      <div className="credential-head">
        <Title level={4}>Your Project</Title>
      </div>
      {project && <div className="credential-tabs general-table">
        <Row gutter={[16, 12]}>
          {
            rows.map(row => {
              return (
                <React.Fragment key={row.key}>
                  <Col xs={12} sm={8} md={6} lg={4}>
                    {row.title}
                  </Col>
                  <Col xs={12} sm={16} md={18} lg={20}>
                    {(row.render)? row.render(project[row.dataIndex]): project[row.dataIndex]}
                  </Col>
                </React.Fragment>
              )
            })
          }
        </Row>
      </div>}
      {openConfirmChangeSubcriptionModal && (
        <Modal
            title={t('IDS_CONFIRMATION')}
            visible={true}
            onOk={handleChangeSubcription}
            onCancel={handleCancelChangeSubcription}
          >
          <p>{t('IDS_CONFIRM_CHANGE_SUBCRIPTION_MESSAGE')}</p>
        </Modal>
      )}
    </div>
  );
}
