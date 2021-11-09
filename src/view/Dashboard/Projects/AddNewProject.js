import React, { useState } from 'react';
import { Card, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import { changeToSlug, makeID } from '../../../utils/helpers';

import { Form, message, Button } from 'antd';

import './ProjectStyle.scss';

export default function ProjectBlock() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const { t } = useTranslation();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };


    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onSave = () => {
        form.setFieldsValue({
            'Project ID': changeToSlug(form.getFieldValue('Project name')) + '-' + makeID(4),
        });
    };

    const handleOnchange = () => {
        const projectName = form.getFieldValue('Project name')
        let projectId = ''
        if (projectName) {
            projectId =  changeToSlug(form.getFieldValue('Project name')) + '-' + makeID(4)
        }
        
        form.setFieldsValue({
            'Project ID': projectId,
        });
    }


    return (
        <>
            <Card
                hoverable
                style={{ width: '100%', height: '100%', position: 'relative' }}
                onClick={showModal}
            >
                <div className="add-new-project" >
                    <PlusOutlined style={{ fontSize: '5em' }} />
                    <div>{t('IDS_ADD_PROJECT')}</div>
                </div>
            </Card>

            <Modal title={t('IDS_CREATE_PROJECT')}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSave}>
                        Save
                    </Button>
                ]}
            >

                <h3>{t('IDS_PROJECT_CREATE_PROJECT_TITLE')}</h3>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div style={{ overflow: 'hidden' }}>
                        <Form.Item
                            name="Project name"
                            label={t('IDS_PROJECT_NAME')}
                            rules={[
                                { required: true },
                                { type: 'string', min: 4 },
                            ]}
                            onChange={handleOnchange}
                        >
                            <Input placeholder={t('IDS_PROJECT_NAME')} />
                        </Form.Item>

                        <Form.Item
                            name="Project ID"
                            label={t('Project ID')}
                            rules={[
                                { required: true },
                                { type: 'string', min: 4 },
                            ]}
                            extra="Your project ID is a unique identifier. You cannot change your project ID after project created."
                        >
                            <Input placeholder={t('IDS_PROJECT_NAME')} />
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
}