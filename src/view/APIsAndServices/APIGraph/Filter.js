import React, { useContext, useEffect } from "react";
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
  const { filterType, setFilterType, setFilterDate } = useContext(APIContext);

  useEffect(() => {
    setFilterType([API_SCOPES[0].key]);
  }, [])

  function handleChange(value) {
    setFilterType([value]);
  }

  const handleChangeDate = value => {
    const endDate = moment(new Date()).format('YYYYMMDD');
    const startdate = moment().subtract(value, "days").format("YYYYMMDD")
    setFilterDate({ startdate, endDate });
  }

  return (
    <div className="filter-bar">
      <div className="left-filter">
        <div className="filter-name">{t("IDS_API_SELECT_NAME")}</div>
        <Select
          value={filterType[0]}
          style={{ width: "300px" }}
          onChange={handleChange}
        >
          {API_SCOPES.map(item => <Option key={item.key} value={item.key}>API {item.name}</Option>)}
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
