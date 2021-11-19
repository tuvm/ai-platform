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
import { ENV_OPTIONS } from '../../../utils/constants/config';

import './Credentials.scss';
import CredentialTableModule from './CredentialTableModule';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import { actionGenerateAPIKey, actionGrantAPIKey } from './actions';


const { Option } = Select;

const filterModules = (modules, ids) => {
    if (modules && ids) {
        return modules.filter(item => ids.includes(item.id))
    }
    return [];
}

export default function CreateCredentialModal(props) {
    const { t } = useTranslation();
    const [moduleSelected, setModuleSelected] = useState([]);
    const [quotaSelected, setQuotaSelected] = useState([])
    const [env, setEnv] = useState(ENV_OPTIONS.DEV);
    const [form] = Form.useForm();
    const resourceList = useSelector(state => state.system.resourceList);
    const vindrModules = get(resourceList, 'modules');
    const [token, setToken] = useState('')
    const location = useLocation();

    const { Text, Link } = Typography;

    const handleOk = () => {
    };

    const handleCancel = () => {
        props.onCancel();
        form.resetFields()
    };

    const onSave = async () => {
        const name = form.getFieldValue('key_name');
        const end_time = form.getFieldValue('end_time');

        const { pathname } = location;

        const match = matchPath(pathname, {
            path: '/projects/:projectId/*',
            exact: true,
            strict: false
        });
    
        const projectId = get(match, 'params.projectId', '');

        const newQuotaSelected = quotaSelected.map(item => {
            item.resource_id = item['id'];
            item.period = 'daily';
            delete item['id'];
            delete item['name']
            return item;
        })

        const payload = {          
            project_id: projectId,
            environment: env === ENV_OPTIONS.DEV ? 1 : 2, // 1 is dev, 2 is prod
            request_data: newQuotaSelected
        }

        const res = await actionGrantAPIKey({ payload })
        if (res && res.token) {
            const payload_apikey = {
                "name": name,
                "grant_id": get(res, 'data.grant_id'),
                end_time,
                "project_id": projectId,
                "token": res.token
            }
            let token_res = await actionGenerateAPIKey({ payload: payload_apikey });
            token_res = get(token_res, 'data')
            if (token_res && token_res.token) {
                setToken(token_res.token);
                message.success(t('IDS_GENERATE_API_KEY_SUCCESS'));
            }
        }
    }


    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    function onOkEndTime(value) {
        form.setFieldsValue({ end_time: value.toISOString() })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(token).then(function () {
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
        const list = filterModules(vindrModules, value)
        setModuleSelected(list)
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
                        name="key_name"
                        label={t('IDS_NAME')}
                        rules={[
                            { required: true },
                            {
                                pattern: new RegExp(
                                    /^[A-Za-z0-9 _-]*[A-Za-z0-9][A-Za-z0-9 _-]*$/i
                                ),
                                message: "Only alphabets and numbers are allowed"
                            },
                            { type: 'string', min: 4 },
                        ]}
                    >
                        <Input placeholder={t('IDS_PROJECT_NAME')} />
                    </Form.Item>

                    <Form.Item
                        name="end_time"
                        label={t('End time')}
                    >
                        <div className="create-credential-subtitle"><Text type="secondary">Schedule expiration time for your API key</Text></div>
                        <DatePicker showTime onOk={onOkEndTime} style={{ width: '40%' }} />
                    </Form.Item>

                    <div className="create-credential-apikey-section">
                        <Text>API Key</Text>
                        <div className="credential-key-input">
                            <Input value={token} style={{ paddingRight: '40px' }} disabled />
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
                                // value={moduleSelected}
                                style={{ width: "100%" }}
                                onChange={handleModule}
                                placeholder="Select modules"
                                showArrow
                            >
                                {vindrModules && vindrModules.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        </div>
                        <CredentialTableModule
                            moduleSelected={moduleSelected}
                            env={env}
                            quotaSelected={quotaSelected}
                            setQuotaSelected={setQuotaSelected}
                        />
                    </div>
                </Form>
            </Modal>
        </div>
    )
}