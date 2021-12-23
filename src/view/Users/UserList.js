import React from 'react';
import { Row, Table } from 'antd';

const columns = [
  {
    title: 'Username',
    dataIndex: 'preferred_username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'acr',
    key: 'role',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

export default function UserList({ data }) {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
      <Table
        columns={columns}
        dataSource={data.data}
        rowKey="preferred_username"
        bordered
        style={{ width: '100%' }}
      />
    </Row>
  );
}
