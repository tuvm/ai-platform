import React, { useState, useEffect } from 'react';
import { Button, Typography, Menu, Dropdown, message, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import {
  apiError,
  actionListOrgMember,
  actionDeleteOrgMember,
} from './actions';
import AddMemberModal from './AddMemberModal';
import EditMemberModel from './EditMemberModal';
import { useProjectsParams } from '../../../utils/hooks';
import { get, orderBy } from 'lodash';
// import orderBy from 'lodash/orderBy';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
// import CredentialDev from './CredentialDev';
import './UserManagement.scss';
import {
  PERM_TEAM_ORG_INVITE,
  PERM_TEAM_ORG_LIST,
  PERM_TEAM_ORG_REMVOE,
  PERM_TEAM_ORG_GET,
} from '../../../utils/permission/perms';
import UserService from '../../system/userService';

const { Column } = Table;

const { Title } = Typography;

// const quotations = [
//     {
//         username: "example1@gmail.com",
//         role: "owner",
//     },
//     {
//         username: "example2@gmail.com",
//         role: "editor",
//     },
//     {
//         username: "example3@gmail.com",
//         role: "billing",
//     },
// ]

export default function UserManagement() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentSelectedMember, setCurrentSelectedMember] = useState({});
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const ticket = useSelector((state) => state.system.ticket);

  const canInviteMember = () => {
    return UserService.hasPerm(ticket, [PERM_TEAM_ORG_INVITE]);
  };

  const canEditMember = () => {
    return UserService.hasPerm(ticket, [PERM_TEAM_ORG_INVITE]);
  };

  const canDeleteMember = () => {
    return UserService.hasPerm(ticket, [PERM_TEAM_ORG_REMVOE]);
  };

  const handleGetUserPermissions = async () => {
    const data = await actionListOrgMember();
    const rows = get(data, 'data', []);
    const sortRows = orderBy(rows, ['username'], ['asc']);
    setUsers(sortRows);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleOpenEditModel = () => {
    setOpenEditModal(true);
  };

  const handleModelClose = (success) => {
    setOpenCreateModal(false);
    setOpenEditModal(false);
    handleGetUserPermissions();
  };

  const handleDeleteItem = async ({ item }) => {
    Modal.confirm({
      title: 'Do you certainly delete this user?',
      content: null,
      onOk: async () => {
        const response = await actionDeleteOrgMember({
          member_id: item.id,
        });
        if (apiError(response)) {
          message.error(apiError(response));
          return;
        }
        message.success(t('IDS_DELETE_PROJECT_MEMBER_SUCCESS'));
        handleGetUserPermissions();
      },
      onCancel: () => {},
    });
  };

  const onAction = ({ key, item }) => {
    console.log(item);
    if (key === 'delete') {
      handleDeleteItem({ item });
    } else if (key === 'edit') {
      setCurrentSelectedMember(item);
      handleOpenEditModel();
    }
  };

  useEffect(() => {
    handleGetUserPermissions();
  }, []);

  const actionMenu = (item = {}) => {
    return (
      <Menu onClick={({ key }) => onAction({ key, item })}>
        <Menu.Item key="edit" disabled={!canEditMember()}>
          Edit
        </Menu.Item>
        <Menu.Item key="delete" disabled={!canDeleteMember()}>
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: (text, record) => (
        // <Space size="middle">
        //     <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold', }} />
        // </Space>
        <Dropdown overlay={actionMenu(record)} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <MoreOutlined
              style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}
            />
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="credential-page content-inner-center">
      <div className="credential-head">
        <Title level={4}>User list</Title>
        {canInviteMember() && (
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleOpenCreateModal}
          >
            {t('IDS_ADD_MEMBER')}
          </Button>
        )}
      </div>
      <Table
        dataSource={users}
        className="app-table quotation-table"
        pagination={false}
        columns={columns}
        rowKey="username"
      >
        {/* <Column title="Member" dataIndex="email" key="email" />
                    <Column title="Role" dataIndex="role" key="role" />
                    <Column title="" dataIndex="action" key="action" /> */}
      </Table>
      {openCreateModal && (
        <AddMemberModal
          onCancel={() => handleModelClose(false)}
          onSave={(success) => handleModelClose(success)}
        />
      )}
      {openEditModal && (
        <EditMemberModel
          model={currentSelectedMember}
          onCancel={() => handleModelClose(false)}
          onSave={(success) => handleModelClose(success)}
        />
      )}
    </div>
  );
}
