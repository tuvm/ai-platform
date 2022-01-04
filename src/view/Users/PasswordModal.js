import React from 'react';
import { Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Form, message, Button } from 'antd';
import { Input } from 'antd';
import get from 'lodash/get';
import { actionChangePassword } from '../system/systemAction';

export default function PasswordModal(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { open } = props;

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
    const oldPassword = get(values, 'oldPassword', '');
    const newPassword = get(values, 'newPassword', '');
    const confirmPassword = get(values, 'confirmPassword', '');

    actionChangePassword({
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmation: confirmPassword,
    })
      .then((res) => {
        message.success('Your password has been changed');
        closeAndReload();
      })
      .catch((err) => {
        message.error('Invalid password');
      });
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <div>
      <Modal
        title={t('Change Password')}
        visible={open}
        closable={true}
        onOk={handleOk}
        onCancel={handleCancel}
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
            <Form.Item
              name="oldPassword"
              label="Old password"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Name is invalid.',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input
                type="password"
                placeholder={t('Enter old password')}
                style={{ height: 38 }}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New password"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Password is invalid.',
                },
                {
                  min: 8,
                  message: ' Must be at least 8 characters',
                },
              ]}
              style={{ width: '100%' }}
            >
              <Input
                type="password"
                placeholder={t('Enter new password')}
                style={{ height: 38 }}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm new password"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Both passwotds must match')
                    );
                  },
                }),
              ]}
              style={{ width: '100%' }}
            >
              <Input
                type="password"
                placeholder={t('Enter password again')}
                style={{ height: 38 }}
              />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
