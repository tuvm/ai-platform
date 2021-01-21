import React from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { FILTER_DAYS } from '../../../utils/constants/config';

import "./Filter.scss";

const { Option } = Select;

export default function Filter() {
  const { t } = useTranslation();

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  

  return (
    <div className="filter-bar">
      <div className="left-filter">
        <div className="filter-name">{t("IDS_API_SELECT_NAME")}</div>
        <Select
          defaultValue="api1"
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          <Option value="api1">API LungCT</Option>
          <Option value="api2">API Mammography</Option>
          <Option value="api3">API Chest Xray</Option>
        </Select>

        <Select
          defaultValue={7}
          style={{ width: "150px" }}
          onChange={handleChange}
        >
          {FILTER_DAYS.map((day) => (
            <Option value={day}>{day} {t('IDS_DAY')}</Option>
          ))}
        </Select>
      </div>
      <div className="right-filter"></div>
    </div>
  );
}
