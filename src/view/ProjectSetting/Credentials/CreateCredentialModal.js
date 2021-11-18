import React, { useState } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import {
    Form, message, Button,
    Typography, Radio,
    Space, Select,
} from 'antd';
import { Input } from 'antd';
import {
    CopyOutlined
} from '@ant-design/icons';
import { DatePicker } from 'antd';
import { VINDR_MODULES, ENV_OPTIONS } from '../../../utils/constants/config';

import './Credentials.scss';
import CredentialTableModule from './CredentialTableModule';


const { Option } = Select;


const data = {
    apikey: 'ae96d426-91ac-4511-a11b-79db15390921-ae96d426-91ac-4511-a11b-79db15390921-ae96d426-91ac-4511-a11b-79db15390921-ae96d426-91ac-4511-a11b-79db15390921',
    createdTime: '05/15/2021 19:20:15 PM',
    endTime: '05/15/2023 19:20:15 PM',
    status: 'active'
}

export default function CreateCredentialModal(props) {
    const { t } = useTranslation();
    const [moduleSelected, setModuleSelected] = useState([]);
    const [env, setEnv] = useState(ENV_OPTIONS.DEV);
    const [form] = Form.useForm();

    const { Text, Link } = Typography;

    const handleOk = () => {
    };

    const handleCancel = () => {
        props.onCancel();
        form.resetFields()
    };

    const onSave = () => {

    }


    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    function onChange(value, dateString) {
        console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
        console.log('onOk: ', value);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(data.apikey).then(function () {
            message.success('Copied API key');
        }, function (err) {
            message.error('Could not copy API Key: ');
        });
    }

    const handleRegenerageAPIKey = () => {
        console.log('generate api key')
    }

    const onChangeEvironment = e => {
        const value = e.target.value;
        setEnv(value);
    }

    const handleModule = value => {
        setModuleSelected(value)
    }


    return (
        <div>
            <Modal title={t('IDS_CREATE_CREDENTIAL')}
                visible={true}
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
                width={1000}
            >

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="name"
                        label={t('IDS_NAME')}
                        rules={[
                            { required: true },
                            {
                                pattern: new RegExp(
                                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                                ),
                                message: "Only alphabets and numbers are allowed"
                            },
                            { type: 'string', min: 4 },
                        ]}
                    >
                        <Input placeholder={t('IDS_PROJECT_NAME')} />
                    </Form.Item>

                    <Form.Item
                        name="End date"
                        label={t('End time')}
                    >
                        <div className="create-credential-subtitle"><Text type="secondary">Schedule expiration time for your API key</Text></div>
                        <DatePicker showTime onChange={onChange} onOk={onOk} style={{ width: '40%' }} />
                    </Form.Item>

                    <div className="create-credential-apikey-section">
                        <Text>API Key</Text>
                        <div className="credential-key-input">
                            <Input value={data.apikey} style={{ paddingRight: '40px' }} disabled />
                            <CopyOutlined
                                style={{ fontSize: '20px' }}
                                className="copy-button"
                                onClick={handleCopy}
                            />
                        </div>
                        <Link onClick={handleRegenerageAPIKey}>
                            Regenerate new API Key
                        </Link>
                    </div>

                    <div className="create-credential-environment-section">
                        <Text strong>Environment</Text>
                        <Form.Item>
                            <Radio.Group name={'rb1'} onChange={onChangeEvironment} value={env}>
                                <Space direction="vertical">
                                    <Radio value={ENV_OPTIONS.DEV}>
                                        Development <br />
                                        <Text type="secondary" className="create-credential-radio-subtext">
                                            Free quota amounts on each project are applied daily and reset at 0:00 AM.
                                        </Text>
                                    </Radio>
                                    <Radio value={ENV_OPTIONS.PRO}>
                                        Production <br />
                                        <Text type="secondary" className="create-credential-radio-subtext">
                                            Unlimited quota amounts beyond your configuration.
                                        </Text>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>


                    <div className="create-credential-table-section">
                        <div><Text strong>API Quotations</Text></div>
                        <div className="create-credential-subtitle">
                            <Text type="secondary">
                                Limit the number of requests you can make to call API in the period.
                            </Text>
                        </div>

                        <div className="create-credential-select-module">
                            <Select
                                mode="multiple"
                                value={moduleSelected}
                                style={{ width: "100%" }}
                                onChange={handleModule}
                                placeholder="Select modules"
                                showArrow
                            >
                                {VINDR_MODULES.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>)}
                            </Select>
                        </div>

                        <CredentialTableModule moduleSelected={moduleSelected} env={env}/>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}