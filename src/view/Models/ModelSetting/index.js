import { Switch, Typography, Select, Button } from 'antd';
import React, { useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import './ModelSetting.scss';

const { Title } = Typography;
const { Option } = Select;

const ModelSettings = () => {
  const [language, setLanguage] = useState('vi');
  const handleChangeLanguage = (value) => {
    console.log(value);
  };

  const labels = {
    Finding: [
      'Aortic enlargement',
      'Atelectasis',
      'Calcification',
      'Cardiomegaly',
      'Clavicle fracture',
      'Consolidation',
    ],
    Impression: ['Abnormal', 'No finding'],
  };

  return (
    <div className="model-setting">
      <div className="block">
        <div style={{ display: 'flex' }}>
          <Title level={5} className="title">
            Enable model
          </Title>
          <Switch />
        </div>
        <div>You must enable model before diagnosing the study</div>
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
          value={language}
        >
          <Option value="vi">Vietnamese</Option>
          <Option value="en">English</Option>
        </Select>
      </div>

      <div className="block">
        <Title level={5} className="title">
          Select labels on result display
        </Title>
        {Object.keys(labels).map((it) => (
          <div className="label-group">
            <div>{it}</div>
            {labels[it].map((label) => (
              <Button style={{ margin: 5 }}>{label}</Button>
            ))}
          </div>
        ))}
      </div>

      <div className="block">
        <div style={{ display: 'flex' }}>
          <Title level={5} className="title">
            Turn on automated rules
          </Title>
          <Switch />
        </div>
        <div>
          Automated rules allow the study that has passed the DICOM keyword
          filtering module to automatically diagnose by the model. You must not
          manually diagnose on each study
        </div>
      </div>
    </div>
  );
};

export default ModelSettings;
