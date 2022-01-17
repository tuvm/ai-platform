import { Switch, Typography, Select, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { get, clone, capitalize } from 'lodash';
import { CaretDownOutlined } from '@ant-design/icons';
import './ModelSetting.scss';
import {
  getModellist,
  getModelSetting,
  serviceUpdateModel,
  updateModelSetting,
} from '../actions';
import { useModelsParams } from '../../../utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { MODEL_STATUS } from '../../../utils/constants/config';

const { Title } = Typography;
const { Option } = Select;

const ModelSettings = () => {
  const { params } = useModelsParams();
  const modelList = useSelector((state) => state.system.modelList);
  const [currentModel, setCurrentModel] = useState({});
  const dispatch = useDispatch();
  const [config, setConfig] = useState({
    language: 'en',
    result_labels: {},
  });

  const handleChangeLanguage = (value) => {
    const newConfig = clone(config);
    newConfig.language = value;
    updateConfig(newConfig);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    if (!!modelList && modelList.modules) {
      try {
        console.log(modelList);
        const findModel = modelList.modules.find(
          (it) => it.slug === params.model
        );
        setCurrentModel(findModel);
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(getModellist(params.projectId));
    }
  }, [modelList]);

  const handleChangeStatus = (status) => {
    serviceUpdateModel(params.projectId, currentModel.id, status)
      .then((res) => {
        message.success('Status has been updated');
        dispatch(getModellist(params.projectId));
      })
      .catch((err) => {
        message.error('Update failed');
      });
  };

  const getConfig = () => {
    getModelSetting(params.projectId, params.model).then((res) => {
      if (res && res.data) {
        setConfig(res.data);
      }
    });
  };

  const updateConfig = (config) => {
    const lang = config.language;
    const finding = get(config, `result_labels.${lang}.finding`) || [];
    const impression = get(config, `result_labels.${lang}.impression`) || [];
    const formatConfig = {
      language: lang,
      finding_labels: finding.filter((it) => it.enabled).map((it) => it.id),
      impression_labels: impression
        .filter((it) => it.enabled)
        .map((it) => it.id),
    };
    updateModelSetting(params.projectId, params.model, formatConfig)
      .then((res) => {
        message.success('Updated settings');
        getConfig();
      })
      .catch((err) => {
        message.error('Updated failed');
      });
  };

  const toggleLabel = (lang, group, idx, status) => {
    const newConfig = clone(config);
    newConfig.result_labels[lang][group][idx].enabled = status;
    updateConfig(newConfig);
  };

  // const labels = {
  //   Finding: [
  //     'Aortic enlargement',
  //     'Atelectasis',
  //     'Calcification',
  //     'Cardiomegaly',
  //     'Clavicle fracture',
  //     'Consolidation',
  //   ],
  //   Impression: ['Abnormal', 'No finding'],
  // };

  const renderLabels = (config) => {
    const lang = config.language;
    const labels = config.result_labels[config.language];
    if (!!labels) {
      return Object.keys(labels)
        .reverse()
        .map((it) => (
          <div className="label-group" key={it}>
            <div>{capitalize(it)}</div>
            {labels[it] &&
              labels[it].map((label, idx) => (
                <Button
                  style={{ margin: 5 }}
                  key={label.id}
                  type={label.enabled ? 'primary' : 'default'}
                  onClick={() => toggleLabel(lang, it, idx, !label.enabled)}
                >
                  {label.label}
                </Button>
              ))}
          </div>
        ));
    } else {
      return null;
    }
  };

  return (
    <div className="model-setting">
      <div className="block">
        <div style={{ display: 'flex' }}>
          <Title level={5} className="title">
            Enable model
          </Title>
          <Switch
            checked={currentModel && currentModel.status === MODEL_STATUS.ON}
            onChange={() =>
              handleChangeStatus(
                currentModel.status === MODEL_STATUS.ON
                  ? MODEL_STATUS.OFF
                  : MODEL_STATUS.ON
              )
            }
          />
        </div>
        <div>You must enable model before diagnosing the study</div>
      </div>

      <div className="block">
        <div style={{ display: 'flex' }}>
          <Title level={5} className="title">
            Turn on automated rules
          </Title>
          <Switch checked={true} />
        </div>
        <div>
          Automated rules allow the study that has passed the DICOM keyword
          filtering module to automatically diagnose by the model. You must not
          manually diagnose on each study
        </div>
      </div>

      <div className="block">
        <Title level={5} className="title">
          Select the language on result display
        </Title>
        <Select
          size="small"
          style={{ width: 200 }}
          suffixIcon={<CaretDownOutlined />}
          placeholder={'Select Language'}
          className="select-dropdown-light"
          dropdownClassName="dropdown-options-dark"
          onChange={handleChangeLanguage}
          value={config.language}
        >
          <Option value="vi">Tiếng Việt</Option>
          <Option value="en">English</Option>
        </Select>
      </div>

      <div className="block">
        <Title level={5} className="title">
          Select labels on result display
        </Title>
        {renderLabels(config)}
      </div>
    </div>
  );
};

export default ModelSettings;
