import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Checkbox, message } from 'antd';
import { Row, Col, notification } from "antd";
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { SCOPES } from '../../utils/constants/config';
import { actionGenerateToken } from './actions';
import { actionShowLoading, actionHideLoading } from '../system/systemAction';

import "./GenerateToken.scss";

export default function GenerateToken() {
  const [form] = Form.useForm();
  const [token, setToken] = useState('');
  const { t } = useTranslation();

  const onFinish = async () => {
    const name = form.getFieldValue('key_name');
    const scopes = []
    SCOPES.forEach(item => {
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

    actionShowLoading();

    const res = await actionGenerateToken({ payload });
    console.log(res)
    if (res && res.data) {
      const apiKey = get(res, 'data.data.api_key');
      setToken(apiKey);
      actionHideLoading();
      notification.success({
        description:
        t('IDS_API_KEY_CREATE_SUCCESS'),
      });
    } else {
      actionHideLoading()
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
            >
              <Input />
            </Form.Item>

            <div className="title">Scopes</div>

            {SCOPES && SCOPES.map(item => (
              <Form.Item name={item.key} key={item.key} valuePropName="checked">
                <Checkbox>
                  <span>{item.name}</span>

                  <p className="sub-checkbox">
                    {t(item.description)}
                  </p>
                </Checkbox>
              </Form.Item>
            ))}

            <div className="generate-form">
              <Button type="primary" htmlType="submit">
                <PlusOutlined /> Create access token
            </Button>
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
