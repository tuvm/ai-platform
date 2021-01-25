import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Checkbox } from 'antd';
import { Row, Col } from "antd";
import { CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Tag, Space } from 'antd';

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
          <Table columns={columns} dataSource={data} />
        </div>
      </Col>
    </Row>
  );
}


const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Scopes",
    dataIndex: "scopes",
    key: "scopes",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" danger>
          Revoke
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'Product A',
    scopes: 'Lung CT',
    created: '01-25-2021',
  },
  {
    key: '2',
    name: 'Product B',
    scopes: 'Lung CT, Chest Xray',
    created: '01-25-2021',
  },
  {
    key: '3',
    name: 'Product C',
    scopes: 'Lung CT',
    created: '01-25-2021',
  },
];
