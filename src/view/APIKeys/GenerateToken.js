import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Checkbox, message } from 'antd';
import { Row, Col, notification } from "antd";
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { API_SCOPES } from '../../utils/constants/config';
import { actionGenerateToken, actionGetAPIKeys } from './actions';

import "./GenerateToken.scss";

export default function GenerateToken() {
  const [form] = Form.useForm();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = async () => {
    const name = form.getFieldValue('key_name');
    const scopes = form.getFieldValue('scope_list')
    const payload = {
      scope: scopes,
      expiry_time: 0,
      description: "",
      name
    }

    setLoading(true);

    const res = await actionGenerateToken({ payload });
    if (res && res.data) {
      const apiKey = get(res, 'data.data.api_key');
      setToken(apiKey);
      setLoading(false);
      notification.success({
        description:
          t('IDS_API_KEY_CREATE_SUCCESS'),
      });
      actionGetAPIKeys();
      form.resetFields();
    } else {
      setLoading(false);
      notification.error({ description: t('IDS_ERROR_MESSAGE') });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(token).then(function () {
      message.success('Copied API key');
    }, function (err) {
      message.error('Could not copy API Key: ');
    });
  }

  return (
    <Row gutter={16}>
      <Col sm={24} md={7}>
        <div className="generate-token-left-side">
          <h4>Access Token</h4>
          <p>
            You can generate a personal access token for each application you
            use that needs access to the VinDr AI Platform.
          </p>
        </div>
      </Col>
      <Col sm={24} md={17}>
        <div className="generate-token-right-side">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Name of API key"
              required
              tooltip="This is a required field"
              className="title"
              name="key_name"
              rules={[{ required: true, message: 'Please input your API Key name' }]}
            >
              <Input />
            </Form.Item>

            <div className="section">
              <div className="title">Scopes</div>
              <Form.Item name="scope_list" valuePropName="checked" rules={[{ required: true, message: 'Please select at least one API scope' }]}>
                <Checkbox.Group>
                  {API_SCOPES && API_SCOPES.map(item => (
                    <Checkbox key={item.key} value={item.key}>
                      <span>{item.name}</span>
                      <p className="sub-checkbox">
                        {t(item.description)}
                      </p>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </div>

            <div className="section generate-form">
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />} loading={loading}>
                  {t('IDS_CREATE_API_KEY')}
                </Button>
              </Form.Item>
              <div className="generate-input">
                <Input value={token} />
                <Button onClick={handleCopy}><CopyOutlined /></Button>
              </div>
            </div>
          </Form>
        </div>
      </Col>
    </Row >
  );
}
