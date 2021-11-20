import React, { useEffect, useState } from 'react';
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
import { ENV_OPTIONS, regex_name } from '../../../utils/constants/config';

import './Credentials.scss';
import CredentialTableModule from './CredentialTableModule';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import moment from 'moment';
import { actionUpdateCredential, actionGrantAPIKey } from './actions';


const { Option } = Select;

const filterModules = (modules, ids) => {
    if (modules && ids) {
        return modules.filter(item => ids.includes(item.id))
    }
    return [];
}

export default function EditCredentialModal(props) {
    const { t } = useTranslation();
    const { data } = props;
    const [moduleSelected, setModuleSelected] = useState([]);
    const [quotaSelected, setQuotaSelected] = useState([])
    const [env, setEnv] = useState(ENV_OPTIONS.DEV);
    const [form] = Form.useForm();
    const resourceList = useSelector(state => state.system.resourceList);
    const vindrModules = get(resourceList, 'modules');
    const location = useLocation();

    const { Text, Link } = Typography;

    const handleOk = () => {
    };

    useEffect(() => {
        let selectedItem = get(data, 'request_data', []);
        form.setFieldsValue({end_time: moment(data.end_time, 'YYYY-MM-DD HH:mm:ss')});
        form.setFieldsValue({credential_name: data.name});

        if (selectedItem.length > 0) {
            selectedItem = selectedItem.map(item => {
                const finder = vindrModules.find(el => el.id === item.resource_id);
                item.id = get(finder, 'id');
                item.name = get(finder, 'name');

                return item;
            })

            setQuotaSelected(selectedItem);
        }
    }, [data, vindrModules])

    const handleCancel = () => {
        props.onCancel();
        form.resetFields()
    };

    const onFinish = async () => {
        const name = form.getFieldValue('credential_name');
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
            delete item['id'];
            delete item['name']
            item.quota = item.quota.toString().toLowerCase();
            item.period = item.period.toString().toLowerCase()
            return item;
        })

        const payload = {          
            project_id: projectId,
            environment: env === ENV_OPTIONS.DEV ? 'dev' : 'prod',
            request_data: newQuotaSelected,
            grant_id: data.grant_id,
        }

        const res = await actionGrantAPIKey({ payload })
        if (res && res.token) {
            const payload_apikey = {
                "name": name,
                "grant_id": data.grant_id,
                end_time,
                "project_id": projectId,
                "token": res.token,
                id: data.id,
            }
            let update_res = await actionUpdateCredential({ payload: payload_apikey });
            update_res = get(update_res, 'updated_id')
            if (update_res) {
                message.success(t('IDS_UPDATE_CREDENTIAL_SUCCESS'));
                props.handleGetCredentials();
                handleCancel();
            }
        }
    }

    function onOkEndTime(value) {
        form.setFieldsValue({ end_time: value.toISOString() })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(data.token).then(function () {
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

    const selectedKeys = moduleSelected.map(item => item.id);

    return (
        <div>
            <Modal title={t('IDS_CREATE_CREDENTIAL')}
                visible={true}
                onOk={handleOk}
                maskClosable={false}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        {t('IDS_CANCEL')}
                    </Button>,
                    <Button key="submit" type="primary" form="credential_form" htmlType="submit">
                        {t('IDS_UPDATE')}
                    </Button>
                ]}
                width={1000}
            >

                <Form
                    form={form}
                    id="credential_form"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="credential_name"
                        label={t('IDS_NAME')}
                        rules={[
                            { required: true },
                            {
                                pattern: regex_name,
                                message: "Only alphabets and numbers are allowed"
                            },
                            { type: 'string', min: 4 },
                        ]}
                    >
                        <Input placeholder={t('IDS_PROJECT_NAME')} defaultValue={data.name}/>
                    </Form.Item>

                    <Form.Item
                        name="end_time"
                        label={t('End time')}
                    >
                        <div className="create-credential-subtitle"><Text type="secondary">Schedule expiration time for your API key</Text></div>
                        <DatePicker showTime onOk={onOkEndTime} style={{ width: '40%' }} value={moment(data.end_time, 'YYYY-MM-DD HH:mm:ss')} />
                    </Form.Item>

                    <div className="create-credential-apikey-section">
                        <Text>API Key</Text>
                        <div className="credential-key-input">
                            <Input value={data.token} style={{ paddingRight: '40px' }} disabled />
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
                            <Radio.Group name={'rb1'} onChange={onChangeEvironment} value={ENV_OPTIONS[data.environment]} disabled={true}>
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
                                style={{ width: "100%" }}
                                onChange={handleModule}
                                placeholder="Select modules"
                                value={selectedKeys}
                                showArrow
                            >
                                {vindrModules && vindrModules.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        </div>
                        <CredentialTableModule
                            moduleSelected={moduleSelected}
                            env={ENV_OPTIONS[data.environment]}
                            quotaSelected={quotaSelected}
                            setQuotaSelected={setQuotaSelected}
                        />
                    </div>
                </Form>
            </Modal>
        </div>
    )
}