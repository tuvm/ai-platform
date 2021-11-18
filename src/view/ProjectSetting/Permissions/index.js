import React, { useState } from 'react';
import { Tabs, Button, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import AddMemberModal from './AddMemberModal';
import { Table } from 'antd';
// import CredentialDev from './CredentialDev';
import '../ProjectSetting.scss';

const { Column } = Table;

const { Title } = Typography;

const quotations = [
    {
        username: "example1@gmail.com",
        role: "owner",
    },
    {
        username: "example2@gmail.com",
        role: "editor",
    },
    {
        username: "example3@gmail.com",
        role: "billing",
    },
]


export default function Credentials() {
    const [openModal, setOpenModal] = useState(false);
    const { t } = useTranslation();

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    return (
        <div className="credential-page content-inner-center">
            <div className="credential-head">
                <Title level={4}>User list</Title>
                <Button type="primary"
                    icon={<UserAddOutlined />}
                    onClick={handleOpenModal}
                >
                    {t('IDS_ADD_MEMBER')}
                </Button>
            </div>
            <Table dataSource={quotations} className="app-table quotation-table" pagination={false}>
                    <Column title="Member" dataIndex="username" key="username" />
                    <Column title="Role" dataIndex="role" key="role" />
            </Table>
            {openModal && <AddMemberModal onCancel={() => setOpenModal(false)}/>}
        </div>
        
    );
}