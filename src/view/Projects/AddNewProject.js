import React, { useState } from 'react';
import { Card, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { Form, message, Button } from 'antd';
import get from 'lodash/get';
import { actionCreateProject, actionGetProjectList } from './actions';
import { changeToSlug, makeID } from '../../utils/helpers';

import './ProjectStyle.scss';

export default function ProjectBlock() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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
        console.log(form)
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    const onSave = async () => {
        const values = form.getFieldsValue();
        const data = {
            "project_name": get(values, 'Project name'),
            "project_id": get(values, 'Project ID'),
        }

        actionCreateProject({ payload: data }).then(res => {
            message.success('Create project sucessfully')
            dispatch(actionGetProjectList());
        }).catch(error => {
            console.log(error)
            const errorMessage = get(error, 'response.data.detail', '');
            if (errorMessage.toLowerCase() === 'duplicate project id') {
                message.error('Project ID already exist')
            }
        });
    };

    const handleOnchange = () => {
        const projectName = form.getFieldValue('Project name')
        let projectId = ''
        if (projectName) {
            projectId = changeToSlug(form.getFieldValue('Project name')) + '-' + makeID(4)
        }

        form.setFieldsValue({
            'Project ID': projectId,
        });
    }


    return (
        <>
            <Card
                hoverable
                style={{ width: '100%', height: '100%', minHeight: 160, position: 'relative' }}
                onClick={showModal}
            >
                <div className="add-new-project">
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
                                {
                                    pattern: new RegExp(
                                        /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i
                                    ),
                                    message: "Only alphabets and numbers are allowed"
                                },
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
                                {
                                    // pattern: new RegExp(
                                    //     /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i
                                    // ),
                                    // message: "Only alphabets and numbers are allowed"
                                },
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