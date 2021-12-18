import React, { useState, useEffect } from 'react';
import { Tabs, Button, Typography, Space,  Menu, Dropdown, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { apiError, actionListProjectMember, actionDeleteProjectMember } from './actions';
import AddMemberModal from './AddMemberModal';
import EditMemberModel from './EditMemberModal';
import { useProjectsParams } from '../../../utils/hooks';
import get from 'lodash/get';
import { Table } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
// import CredentialDev from './CredentialDev';
import '../ProjectSetting.scss';

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


export default function Credentials() {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentSelectedMember, setCurrentSelectedMember] = useState({});
    const [users, setUsers] = useState([]);
    const { t } = useTranslation();
    const { params } = useProjectsParams();
    const projectId = get(params, 'projectId', '');

    const handleGetUserPermissions = async () => {
        const data = await actionListProjectMember({ params: { project_id: projectId } });
        const rows = get(data, 'data', []);
        setUsers(rows);
    }

    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    }

    const handleOpenEditModel = () => {
        setOpenEditModal(true);
    }

    const handleModelClose = (success) => {
        setOpenCreateModal(false);
        setOpenEditModal(false);
        handleGetUserPermissions();
    }

    const handleDeleteItem = async ({item}) => {
        const response = await actionDeleteProjectMember({project_id: projectId, member_id: item.id});
        if(apiError(response)){
            message.error(apiError(response));
            return
        }
        message.success(t("IDS_DELETE_PROJECT_MEMBER_SUCCESS"));
        handleGetUserPermissions();
    }

    const onAction = ({key, item}) => {
        console.log(item)
        if(key === "delete"){
            handleDeleteItem({item});
        }else if (key === "edit") {
            setCurrentSelectedMember(item);
            handleOpenEditModel();
        }
    }

    useEffect(() => {
        handleGetUserPermissions();
    }, [])

    const actionMenu = (item={}) => { 
        return (
            <Menu onClick={({key})=> onAction({key, item})}>
                <Menu.Item key="edit">Edit</Menu.Item>
                <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
        )
    }

    const columns = [
        {
            title: "User",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "",
            key: "action",
            align: 'right',
            render: (text, record) => (
                // <Space size="middle">
                //     <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold', }} />
                // </Space>
                <Dropdown overlay={actionMenu(record)} trigger={["click", ]}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold', color: 'black', }} />
                    </a>
                </Dropdown>
            )
        }
    ]

    return (
        <div className="credential-page content-inner-center">
            <div className="credential-head">
                <Title level={4}>User list</Title>
                <Button type="primary"
                    icon={<UserAddOutlined />}
                    onClick={handleOpenCreateModal}
                >
                    {t('IDS_ADD_MEMBER')}
                </Button>
            </div>
            <Table dataSource={users} className="app-table quotation-table" pagination={false} columns={columns}>
                    {/* <Column title="Member" dataIndex="email" key="email" />
                    <Column title="Role" dataIndex="role" key="role" />
                    <Column title="" dataIndex="action" key="action" /> */}
            </Table>
            {
                openCreateModal && <AddMemberModal 
                    projectId={projectId}
                    onCancel={() => handleModelClose(false)}
                    onSave={(success) => handleModelClose(success)} 
                />
            }
            {
                openEditModal && <EditMemberModel 
                    projectId={projectId}
                    model={currentSelectedMember}
                    onCancel={() => handleModelClose(false)}
                    onSave={(success) => handleModelClose(success)} 
                />
            }
        </div>
        
    );
}