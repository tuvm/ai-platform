import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Checkbox } from 'antd';
import { Row, Col } from "antd";
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';

import "./GenerateToken.scss";

export default function GenerateToken() {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMark }) => {
    setRequiredMarkType(requiredMark);
  };

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
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
            initialValues={{ requiredMark }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <Form.Item
              label="Name of your application"
              required
              tooltip="This is a required field"
              className="title"
            >
              <Input />
            </Form.Item>
          </Form>

          <div>
            <div className="title">Scopes</div>
            <div>
              <Checkbox onChange={onChange}>
                <span>Lung CT</span>

                <p className="sub-checkbox">
                  Grants complete read/write access to the API, including all
                  projects, the container registry, and the package registry.
                </p>
              </Checkbox>
            </div>
            <div>
              <Checkbox onChange={onChange}>
                <span>Mammography</span>

                <p className="sub-checkbox">
                  Grants complete read/write access to the API, including all
                  projects, the container registry, and the package registry.
                </p>
              </Checkbox>
            </div>
          </div>

          <div className="generate-form">
            <Button type="primary"><PlusOutlined /> Create access token</Button>
            <div className="generate-input">
              <Input value="y4c8ZnT8_wo-f2qxUWZj" />
              <Button><CopyOutlined /></Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
