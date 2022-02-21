import React, { useEffect, useState, useContext } from 'react';
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
import { getModuleName } from '../../../utils/constants/config';
import moment from 'moment';
import {
  serviceUpdateCredential,
  serviceGrantAPIKey,
  serviceRegenerateAPIKey,
} from './services';
import { CredentialContext } from './context';
import cloneDeep from 'lodash/cloneDeep';

const { Option } = Select;

const filterModules = (modules, ids) => {
  if (modules && ids) {
    return modules.filter((item) => ids.includes(item.id));
  }
  return [];
};

export default function EditCredentialModal(props) {
  const { t } = useTranslation();
  const [moduleSelected, setModuleSelected] = useState([]);
  const [quotaSelected, setQuotaSelected] = useState([]);
  const [currentStoredQuotas, setCurrentStoredQuotas] = useState([]);
  const [currentStoredModules, setCurrentStoredModules] = useState([]);
  const [env, setEnv] = useState(ENV_OPTIONS.DEV);
  const [form] = Form.useForm();
  const resourceList = useSelector((state) => state.system.resourceList);
  const vindrModules = get(resourceList, 'modules');
  const { params } = useProjectsParams();
  const { handleGetCredentials, currentCredential } =
    useContext(CredentialContext);

  const { Text, Link } = Typography;

  const handleOk = () => {};

  useEffect(() => {
    let selectedItem = get(currentCredential, 'request_data', []);
    selectedItem = filterRequestData(selectedItem);
    selectedItem = cloneDeep(selectedItem);
    form.setFieldsValue({ end_time: moment(currentCredential.end_time) });
    form.setFieldsValue({ credential_name: currentCredential.name });

    let storedQuotas = selectedItem.map((item) => item.resource_id);
    setCurrentStoredQuotas(storedQuotas);

    if (selectedItem.length > 0) {
      selectedItem = selectedItem.map((item) => {
        const finder = vindrModules.find((el) => el.id === item.resource_id);
        item.id = get(finder, 'id');
        item.name = get(finder, 'name');

        return item;
      });
      setQuotaSelected(selectedItem);

      const selectedKeys = selectedItem.map((item) => item.id);
      form.setFieldsValue({ Modules: selectedKeys });
      setCurrentStoredModules(selectedKeys);
    }
  }, [currentCredential, vindrModules, form]);

  const filterRequestData = (requestData) => {
    return requestData.filter(
      (it) => getModuleName(vindrModules, it.name).name != undefined
    );
  };

  const handleCancel = () => {
    props.onCancel();
    form.resetFields();
  };

  const onFinish = async () => {
    const name = form.getFieldValue('credential_name');
    const end_time = form.getFieldValue('end_time');

    const projectId = get(params, 'projectId', '');

    // validate quota first
    var errors = quotaSelected.filter((item) => item.error == true);
    if (errors.length > 0) {
      message.error(t('IDS_VALIDATE_API_KEY_FAIL'));
      return;
    }

    const newQuotaSelected = quotaSelected.map((item) => {
      item.resource_id = item['id'];
      delete item['id'];
      delete item['name'];
      item.quota = item.quota.toString().toLowerCase();
      item.period = item.period.toString().toLowerCase();
      return item;
    });

    // merge old quota
    const currentRequestData = get(currentCredential, 'request_data', []);
    console.log({ currentRequestData });
    for (let d of currentRequestData) {
      const exists = newQuotaSelected.find(
        (it) => it.resource_id == d.resource_id
      );
      if (!exists) {
        newQuotaSelected.push(d);
      }
    }

    const payload = {
      project_id: projectId,
      environment: env === ENV_OPTIONS.DEV ? 'dev' : 'prod',
      request_data: newQuotaSelected,
      grant_id: currentCredential.grant_id,
    };

    const project_id = projectId;
    const res = await serviceGrantAPIKey({ project_id, payload });
    if (res && res.token) {
      const payload_apikey = {
        name: name,
        grant_id: currentCredential.grant_id,
        end_time,
        project_id: projectId,
        token: res.token,
        id: currentCredential.id,
      };
      let update_res = await serviceUpdateCredential({
        payload: payload_apikey,
        project_id,
      });
      update_res = get(update_res, 'updated_id');
      if (update_res) {
        message.success(t('IDS_UPDATE_CREDENTIAL_SUCCESS'));
        handleGetCredentials();
        handleCancel();
      }
    }
  };

  function onOkEndTime(value) {
    form.setFieldsValue({ end_time: value });
  }

  const handleRegenerageAPIKey = async () => {
    const project_id = get(params, 'projectId', '');
    const token = await serviceRegenerateAPIKey({
      payload: currentCredential,
      project_id,
    });
    if (token) {
      message.success(t('IDS_REGENERATE_KEY_SUCCESS'));
      handleGetCredentials();
    }
  };

  const onChangeEvironment = (e) => {
    const value = e.target.value;
    setEnv(value);
  };

  const handleModule = (value) => {
    let addedValue = value.filter(
      (item) => !currentStoredModules.includes(item)
    );
    if (value.length + addedValue.length < currentStoredModules.length) {
      message.error(t('IDS_API_KEY_DELETE_MODULE_FAIL'));
    }
    let newVal = [...currentStoredModules, ...addedValue];
    form.setFieldsValue({ Modules: newVal });
    const list = filterModules(vindrModules, newVal);
    setModuleSelected(list);
  };

  const disabledDate = (current) => {
    return current && current.valueOf() < moment(currentCredential.create_time);
  };

  return (
    <div>
      <Modal
        title={t('IDS_EDIT_CREDENTIAL')}
        visible={true}
        onOk={handleOk}
        maskClosable={false}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('IDS_CANCEL')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="credential_form"
            htmlType="submit"
          >
            {t('IDS_UPDATE')}
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
            name="credential_name"
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
            <Input
              placeholder={t('IDS_PROJECT_NAME')}
              defaultValue={currentCredential.name}
            />
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
              defaultValue={moment(currentCredential.end_time)}
              disabledDate={disabledDate}
            />
          </Form.Item>

          <div className="create-credential-apikey-section">
            <Text>API Key</Text>
            <div className="credential-key-input">
              <Input
                value={currentCredential.token}
                style={{ paddingRight: '40px' }}
                disabled
              />
              <CopyToClipboard
                text={currentCredential.token}
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
            {currentCredential.token && (
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
                value={ENV_OPTIONS[currentCredential.environment]}
                disabled={true}
              >
                <Space direction="vertical">
                  <Radio value={ENV_OPTIONS.dev}>
                    Development <br />
                    <Text
                      type="secondary"
                      className="create-credential-radio-subtext"
                    >
                      Free quota amounts on each project are applied daily and
                      reset at 0:00 AM.
                    </Text>
                  </Radio>
                  <Radio value={ENV_OPTIONS.prod}>
                    Production <br />
                    <Text
                      type="secondary"
                      className="create-credential-radio-subtext"
                    >
                      Unlimited quota amounts beyond your configuration <b><i>(premium required)</i></b>.
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
              env={ENV_OPTIONS[currentCredential.environment]}
              quotaSelected={quotaSelected}
              setQuotaSelected={setQuotaSelected}
              currentStoredQuotas={currentStoredQuotas}
            />
          </div>
        </Form>
      </Modal>
    </div>
  );
}
