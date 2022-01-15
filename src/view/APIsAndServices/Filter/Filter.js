import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import moment from 'moment';

import { FILTER_DAYS } from '../../../utils/constants/config';
import { APIContext } from '../index';
import './Filter.scss';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

const { Option } = Select;

export default function Filter() {
  const { t } = useTranslation();
  const { filterType, setFilterType, setFilterDate } = useContext(APIContext);
  // const [selected, setSelected] = useState();
  const resourceOptionsData = useSelector(
    (state) => state.system.resourceOptions
  );
  const resourceOptions = get(resourceOptionsData, 'options');

  // useEffect(() => {
  // setFilterType([API_SCOPES[0].key]);
  // setSelected([API_SCOPES[0].key]);
  // handleChangeDate(7);
  // }, [resourceOptions]);

  function handleChange(value) {
    setFilterType(value);
    // setSelected(value);
  }

  const handleChangeDate = (value) => {
    const endDate = moment(new Date()).utc().toISOString();
    const startDate = moment().subtract(value, 'days').utc().toISOString();
    setFilterDate({ startDate, endDate });
  };

  return (
    <div className="filter-bar">
      <div className="left-filter">
        <span className="filter-name">{t('IDS_API_SELECT_NAME')}</span>
        <Select
          value={filterType}
          style={{ minWidth: '300px' }}
          onChange={handleChange}
        >
          {(resourceOptions || []).map((item) => (
            <Option key={item.value} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue={7}
          style={{ width: '150px' }}
          onChange={handleChangeDate}
        >
          {FILTER_DAYS.map((day) => (
            <Option key={day} value={day}>
              {day} {t('IDS_DAY')}
            </Option>
          ))}
        </Select>
      </div>
      <div className="right-filter"></div>
    </div>
  );
}
