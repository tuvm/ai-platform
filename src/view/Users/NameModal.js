import React from 'react';
import { Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Form, message, Button } from 'antd';
import { Input } from 'antd';
import get from 'lodash/get';
import { actionUpdateUser } from './actions';

export default function NameModal(props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { open, profile } = props;

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
    const fullname = get(values, 'fullname', '');
    actionUpdateUser(profile.id_, {
      full_name: fullname,
      avatar: profile.avatar,
    })
      .then((res) => {
        message.success('Updated Profile');
        closeAndReload();
      })
      .catch((err) => {
        message.error('Updated failed');
      });
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <div>
      <Modal
        title={t('Edit Full Name')}
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
              name="fullname"
              label="Full Name"
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
                placeholder={t('Enter Full Name')}
                style={{ height: 38 }}
              />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
