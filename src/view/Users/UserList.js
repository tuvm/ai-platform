import React, { useEffect } from 'react';
import { Row, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionGetUserList,
  fetchUserList,
  fetchUserListError,
  fetchUserListSuccess,
} from './actions';

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

export default function UserList() {
  const data = useSelector((state) => state.system.userList);
  const loading = useSelector((state) => state.system.userListLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
    actionGetUserList()
      .then((res) => {
        console.log(res);
        dispatch(fetchUserListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchUserListError(err));
      });
  }, [dispatch]);

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
      <Table
        columns={columns}
        dataSource={data.data}
        rowKey="preferred_username"
        bordered
        loading={loading}
        style={{ width: '100%' }}
      />
    </Row>
  );
}
