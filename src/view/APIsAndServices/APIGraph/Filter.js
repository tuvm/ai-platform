import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import moment from 'moment';

import { FILTER_DAYS } from '../../../utils/constants/config';
import { API_SCOPES } from '../../../utils/constants/config'
import { APIContext } from './index';
import "./Filter.scss";

const { Option } = Select;

export default function Filter() {
  const { t } = useTranslation();
  const { setFilterType, setFilterDate } = useContext(APIContext);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setFilterType([API_SCOPES[0].key]);
    setSelected([API_SCOPES[0].key]);
    handleChangeDate(7)
  }, [])

  function handleChange(value) {
    setFilterType(value);
    setSelected(value);
  }

  const handleChangeDate = value => {
    const endDate = moment(new Date()).format('YYYYMMDD');
    const startDate = moment().subtract(value, "days").format("YYYYMMDD")
    setFilterDate({ startDate, endDate });
  }

  return (
    <div className="filter-bar">
      <div className="left-filter">
        <span className="filter-name">{t("IDS_API_SELECT_NAME")}</span>
        <Select
          mode="multiple"
          value={selected}
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          {API_SCOPES.map(item => <Option key={item.key} value={item.key}>{item.name}</Option>)}
        </Select>

        <Select
          defaultValue={7}
          style={{ width: "150px" }}
          onChange={handleChangeDate}
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
