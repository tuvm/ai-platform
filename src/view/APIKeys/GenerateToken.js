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
    const scopes = []
    API_SCOPES.forEach(item => {
      if (form.getFieldValue(item.key)) {
        scopes.push(item.key)
      }
    })
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
      actionGetAPIKeys()
    } else {
      setLoading(false);
      notification.error({ description: t('IDS_ERROR_MESSAGE') });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(token).then(function() {
      message.success('Copied API key');
    }, function(err) {
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

            <div className="checkbox-list">
              <div className="title">Scopes</div>

              {API_SCOPES && API_SCOPES.map(item => (
                <Form.Item name={item.key} key={item.key} valuePropName="checked">
                  <Checkbox>
                    <span>{item.name}</span>

                    <p className="sub-checkbox">
                      {t(item.description)}
                    </p>
                  </Checkbox>
                </Form.Item>
              ))}
            </div>

            <div className="generate-form">
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={ <PlusOutlined />} loading={loading}>
                  Create access token
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
    </Row>
  );
}
