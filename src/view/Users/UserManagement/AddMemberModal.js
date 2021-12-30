import React, { useState } from 'react';
import { Modal, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { Form, message, Button } from 'antd';
import { Input } from 'antd';
import get from 'lodash/get';
import { apiError, actionAddOrgMember } from './actions';
import { RoleOptions } from './consts';

import './UserManagement.scss';

// const { Option } = Select;

import Select, { components } from 'react-select';

const Option = (props) => {
  return (
    <components.Option {...props}>
      <div>{props.data.label}</div>
      <div className="add-user-dropdown-sublabel">{props.data.subLabel}</div>
    </components.Option>
  );
};

const CustomStyle = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#39c2d74d' : '#fff',
    color: '#000',
    '&:hover': {
      backgroundColor: state.isSelected ? '#39c2d74d' : '#f1f1f1',
    },
  }),
  control: (base) => ({
    ...base,
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #39C2D7',
      boxShadow: '0 0 0 2px rgb(57 194 215 / 20%)',
    },
  }),
};

export default function AddMemberModal(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // const { Text, Link } = Typography;

  const handleOk = () => {};

  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };

  const closeAndReload = () => {
    props.onSave(true);
    form.resetFields();
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();
    const username = get(values, 'username', '');
    const role = get(values, 'role.value', '');
    const data = {
      username: username,
      role: role,
    };
    const response = await actionAddOrgMember({
      payload: data,
    });
    if (apiError(response)) {
      message.error(apiError(response));
      handleCancel();
      return;
    }
    message.success(t('IDS_ADD_PROJECT_MEMBER_SUCCESS'));
    closeAndReload();
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <div>
      <Modal
        title={t('IDS_ADD_MEMBER')}
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="create_member_form"
            htmlType="submit"
          >
            Save
          </Button>,
        ]}
        width={1000}
      >
        <Form
          form={form}
          id="create_member_form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[16]}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                name="username"
                label={t('IDS_EMAIL_ADDRESS')}
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Email address is invalid.',
                  },
                ]}
              >
                <Input
                  placeholder={t('IDS_EMAIL_ADDRESS')}
                  style={{ height: 38 }}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item
                label={t('IDS_ROLE')}
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Role cannot be empty.',
                  },
                ]}
              >
                <Select
                  options={RoleOptions}
                  components={{ Option }}
                  styles={CustomStyle}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#39c2d74d',
                      primary: '#39C2D7',
                    },
                  })}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
