import React from 'react';
import { Modal, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Form, message, Button } from 'antd';
import get from 'lodash/get';
import { actionCreateProject, actionGetProjectList } from './actions';
import { changeToSlug, makeID } from '../../utils/helpers';
import { regex_name } from '../../utils/constants/config';

import './ProjectStyle.scss';

export default function AddNewProjectModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleCancel = () => {
    props.handleCancel();
    form.resetFields();
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();
    const projectId = get(values, 'Project ID', '').replaceAll(/\s/g, '');
    const projectName = get(values, 'Project name', '');
    const data = {
      project_name: projectName,
      project_id: projectId,
    };

    actionCreateProject({ payload: data })
      .then((res) => {
        message.success('Create project sucessfully');
        dispatch(actionGetProjectList());
        handleCancel();
      })
      .catch((error) => {
        const errorMessage = get(error, 'response.data.detail', '');
        if (
          errorMessage &&
          typeof errorMessage == 'string' &&
          errorMessage.toLowerCase() === 'duplicate project id'
        ) {
          message.error('Project ID already exist');
        } else {
          message.error(JSON.stringify(errorMessage));
        }
      });
  };

  const handleOnchange = () => {
    const projectName = form.getFieldValue('Project name');
    let projectId = '';
    if (projectName) {
      projectId =
        changeToSlug(form.getFieldValue('Project name')) + '-' + makeID(4);
    }

    form.setFieldsValue({
      'Project ID': projectId,
    });
  };

  return (
    <>
      <Modal
        title={t('IDS_CREATE_PROJECT')}
        visible={true}
        onCancel={props.handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="create_project_form"
            htmlType="submit"
          >
            Save
          </Button>,
        ]}
      >
        <h3>{t('IDS_PROJECT_CREATE_PROJECT_TITLE')}</h3>

        <Form
          form={form}
          id="create_project_form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div style={{ overflow: 'hidden' }}>
            <Form.Item
              name="Project name"
              label={t('IDS_PROJECT_NAME')}
              rules={[
                { required: true },
                {
                  pattern: regex_name,
                  message: 'Only alphabets and numbers are allowed',
                },
                { type: 'string', min: 4 },
              ]}
              onChange={handleOnchange}
            >
              <Input placeholder={t('IDS_PROJECT_NAME')} />
            </Form.Item>

            <Form.Item
              name="Project ID"
              label={t('Project ID')}
              normalize={(value) => (value || '').toLowerCase()}
              rules={[
                { required: true },
                {
                  pattern: new RegExp(
                    /^[A-Za-z0-9 _-]*[A-Za-z0-9][A-Za-z0-9 _-]*$/i
                  ),
                  message: 'Only alphabets and numbers are allowed',
                },
                { type: 'string', min: 4 },
                () => ({
                  validator(_, value) {
                    if (/\s/.test(value)) {
                      return Promise.reject(
                        new Error('Project ID doesn’t contain space')
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              extra="Your project ID is a unique identifier. You cannot change your project ID after project created."
            >
              <Input placeholder={t('IDS_PROJECT_NAME')} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
