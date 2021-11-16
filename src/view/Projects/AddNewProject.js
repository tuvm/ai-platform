import React, { useState } from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import AddNewProjectModal from './AddNewProjectModal';

import './ProjectStyle.scss';

export default function ProjectBlock() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { t } = useTranslation();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <Card
                hoverable
                style={{ width: '100%', height: '100%', minHeight: 180, minWidth: 150, position: 'relative' }}
                onClick={showModal}
            >
                <div className="add-new-project">
                    <PlusOutlined style={{ fontSize: '5em' }} />
                    <div>{t('IDS_ADD_PROJECT')}</div>
                </div>
            </Card>

            {isModalVisible && <AddNewProjectModal handleCancel={handleCancel}/>}
        </>
    );
}