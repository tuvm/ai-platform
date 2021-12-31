import React, { useState, useContext } from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Form, message, Button, Typography, Radio, Space, Select } from 'antd';
import { Input } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { ENV_OPTIONS, regex_name } from '../../../utils/constants/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './Credentials.scss';
import CredentialTableModule from './CredentialTableModule';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { useProjectsParams } from '../../../utils/hooks';
import { actionGenerateAPIKey, actionGrantAPIKey } from './actions';
import { CredentialContext } from './context';

const { Option } = Select;

const filterModules = (modules, ids) => {
  if (modules && ids) {
    return modules.filter((item) => ids.includes(item.id));
  }
  return [];
};

export default function CreateCredentialModal(props) {
  const { t } = useTranslation();
  const [moduleSelected, setModuleSelected] = useState([]);
  const [quotaSelected, setQuotaSelected] = useState([]);
  const [env, setEnv] = useState(ENV_OPTIONS.DEV);
  const [form] = Form.useForm();
  const resourceList = useSelector((state) => state.system.resourceList);
  const vindrModules = get(resourceList, 'modules');
  const [token, setToken] = useState('');
  const { params } = useProjectsParams();
  const { handleGetCredentials } = useContext(CredentialContext);

  const { Text, Link } = Typography;

  const handleOk = () => {};

  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };

  const onFinish = async () => {
    const name = form.getFieldValue('Credential name');
    let end_time = form.getFieldValue('end_time');

    // validate quota first
    var errors = quotaSelected.filter((item) => item.error == true);
    if (errors.length > 0) {
      return;
    }

    if (!end_time) {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var seconds = d.getSeconds();
      var minutes = d.getMinutes();
      var hour = d.getHours();
      end_time = new Date(year + 1, month, day, hour, minutes, seconds);

      end_time = end_time.toISOString();
    }

    const projectId = get(params, 'projectId', '');

    const newQuotaSelected = quotaSelected.map((item) => {
      item.resource_id = item['id'];
      delete item['id'];
      delete item['name'];
      item.quota = item.quota.toString().toLowerCase();
      item.period = item.period.toString().toLowerCase();
      return item;
    });

    const payload = {
      project_id: projectId,
      environment: env === ENV_OPTIONS.DEV ? 'dev' : 'prod',
      request_data: newQuotaSelected,
    };
    const project_id = projectId;
    const res = await actionGrantAPIKey({ project_id, payload });
    if (res && res.token) {
      const payload_apikey = {
        name: name,
        grant_id: get(res, 'data.grant_id'),
        end_time,
        project_id: projectId,
        token: res.token,
      };
      let token_res = await actionGenerateAPIKey({ payload: payload_apikey, project_id });
      // Endtime must greater than now
      token_res = get(token_res, 'data');
      if (token_res && token_res.token) {
        setToken(token_res.token);
        message.success(t('IDS_GENERATE_API_KEY_SUCCESS'));
        handleGetCredentials();
      } else {
        message.error(t('IDS_GENERATE_API_KEY_FAIL'));
      }
      handleCancel();
    }
  };

  function onOkEndTime(value) {
    form.setFieldsValue({ end_time: value.toISOString() });
  }

  const handleRegenerageAPIKey = () => {
    console.log('generate api key');
  };

  const onChangeEvironment = (e) => {
    const value = e.target.value;
    setEnv(value);
  };

  const handleModule = (value) => {
    const list = filterModules(vindrModules, value);
    setModuleSelected(list);
  };

  const disabledDate = (current) => {
    return current && current.valueOf() < Date.now();
  };

  return (
    <div>
      <Modal
        title={t('IDS_CREATE_CREDENTIAL')}
        visible={true}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="credential_form"
            htmlType="submit"
          >
            Save
          </Button>,
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
            name="Credential name"
            label={t('IDS_NAME')}
            rules={[
              { required: true },
              {
                pattern: regex_name,
                message: 'Only alphabets and numbers are allowed',
              },
              { type: 'string', min: 4 },
            ]}
          >
            <Input placeholder="Credential name" />
          </Form.Item>

          <Form.Item name="end_time" label={t('End time')}>
            <div className="create-credential-subtitle">
              <Text type="secondary">
                Schedule expiration time for your API key
              </Text>
            </div>
            <DatePicker
              format="MMM, D YYYY, h:mm:ss A"
              showNow={false}
              showTime
              onOk={onOkEndTime}
              style={{ width: '40%' }}
              disabledDate={disabledDate}
            />
          </Form.Item>

          <div className="create-credential-apikey-section">
            <Text>API Key</Text>
            <div className="credential-key-input">
              <Input value={token} style={{ paddingRight: '40px' }} disabled />
              <CopyToClipboard
                text={token}
                onCopy={(_text, result) => {
                  if (result) {
                    message.success(t('IDS_COPY_API_KEY'));
                  } else {
                    message.error('IDS_CREDENTIAL_CANNOT_COPY_API_KEY');
                  }
                }}
              >
                <CopyOutlined
                  style={{ fontSize: '20px' }}
                  className="copy-button"
                />
              </CopyToClipboard>
            </div>
            {token && (
              <Link onClick={handleRegenerageAPIKey}>
                Regenerate new API Key
              </Link>
            )}
          </div>

          <div className="create-credential-environment-section">
            <Text strong>Environment</Text>
            <Form.Item>
              <Radio.Group
                name={'rb1'}
                onChange={onChangeEvironment}
                value={env}
              >
                <Space direction="vertical">
                  <Radio value={ENV_OPTIONS.DEV}>
                    Development <br />
                    <Text
                      type="secondary"
                      className="create-credential-radio-subtext"
                    >
                      Free quota amounts on each project are applied daily and
                      reset at 0:00 AM.
                    </Text>
                  </Radio>
                  <Radio value={ENV_OPTIONS.PRO}>
                    Production <br />
                    <Text
                      type="secondary"
                      className="create-credential-radio-subtext"
                    >
                      Unlimited quota amounts beyond your configuration.
                    </Text>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="create-credential-table-section">
            <div>
              <Text strong>API Quotations</Text>
            </div>
            <div className="create-credential-subtitle">
              <Text type="secondary">
                Limit the number of requests you can make to call API in the
                period.
              </Text>
            </div>

            <div className="create-credential-select-module">
              <Form.Item
                rules={[{ required: true }]}
                label="Modules"
                name="Modules"
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  onChange={handleModule}
                  placeholder="Select modules"
                  showArrow
                >
                  {vindrModules &&
                    vindrModules.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
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
  );
}
