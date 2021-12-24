import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Select, Input, Button, DatePicker } from 'antd';
import { SearchOutlined, CaretDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import './FilterData.scss';
// import { BASE_TIME } from '../../../utils/constants';

const { Option } = Select;
const { RangePicker } = DatePicker;

const FILTER_TYPE = {
  RANGE_DATE: 1,
  MODALITIES: 2,
  MATCHED: 3,
};

function FilterData(props) {
  const {
    onSearch,
    initFilter,
    formatDate = 'YYYYMMDD',
    initSearchFields,
  } = props;
  const { t } = useTranslation(['Vindoc']);
  const [filterData, setFilterData] = useState({});
  const [searchFields, setSearchFields] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    if (initFilter) {
      setFilterData(initFilter);
    }
  }, [initFilter]);

  useEffect(() => {
    if (initSearchFields) {
      setSearchFields(initSearchFields || []);
    }
  }, [initSearchFields]);

  const handleOnSearch = (data = {}) => {
    let searchData = { ...filterData, ...data };
    searchFields.forEach((it) => {
      searchData[it.key] = it.value;
    });
    setIsFiltered(true);
    onSearch(searchData);
  };

  const handleOnChangeFilter = (type, values) => {
    if (!type || !values) return;
    let tempFilterData = {};

    switch (type) {
      case FILTER_TYPE.RANGE_DATE:
        tempFilterData = {
          ...filterData,
          startDate: values[0],
          endDate: values[1],
        };
        break;
      case FILTER_TYPE.MODALITIES:
        tempFilterData = {
          ...filterData,
          ModalitiesInStudy: values && values.length ? values : '*',
        };
        break;
      case FILTER_TYPE.MATCHED:
        tempFilterData = {
          ...filterData,
          matched: values,
        };
        break;
      default:
        break;
    }

    setIsFiltered(true);
    setFilterData(tempFilterData);
    handleOnSearch(tempFilterData);
  };

  // const handleChangeSearchKey = (fieldId, value) => {
  //   let tempSearchField = [...searchFields];
  //   tempSearchField.some((it) => {
  //     if (it.fieldId === fieldId) {
  //       it.key = value;
  //       return true;
  //     }
  //   });
  //   setSearchFields(tempSearchField);
  // };

  // const handleChangeSearchValue = (fieldId, value) => {
  //   let tempSearchField = [...searchFields];
  //   tempSearchField.some((it) => {
  //     if (it.fieldId === fieldId) {
  //       it.value = value;
  //       return true;
  //     }
  //   });
  //   setSearchFields(tempSearchField);
  // };

  const handleClearAllFilters = () => {
    let init = initSearchFields.map((it) => ({ ...it, value: '' }));
    setSearchFields([...init]);
    onSearch({ ...initFilter, search: [] });
    setIsFiltered(false);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  };

  // const presetRanges = {
  //   Today: [moment(), moment()],
  //   'Last 30 days': [moment().subtract(30, 'days'), moment()],
  //   'This Month': [moment().startOf('month'), moment()],
  //   'All time': [moment(BASE_TIME, 'YYYYMMDD'), moment()],
  // };

  const extendFilter = (
    <>
      <div className="filter-items">
        <Row>
          <div className="filter-item select-item">
            <Select
              size="small"
              style={{ width: '100%' }}
              suffixIcon={<CaretDownOutlined />}
              placeholder={t('Priority')}
              className="select-dropdown-light"
              dropdownClassName="dropdown-options-dark"
              onChange={(value) => {
                handleOnChangeFilter(FILTER_TYPE.STATUS, value);
              }}
              value={filterData?.VindocStatus || null}
            >
              <Option value="High">{t('High')}</Option>
              <Option value="Medium">{t('Medium')}</Option>
              <Option value="Low">{t('Low')}</Option>
            </Select>
          </div>
          <div className="filter-item select-item">
            <Select
              size="small"
              style={{ width: '100%' }}
              suffixIcon={<CaretDownOutlined />}
              placeholder={t('Status')}
              className="select-dropdown-light"
              dropdownClassName="dropdown-options-dark"
              onChange={(value) => {
                handleOnChangeFilter(FILTER_TYPE.MATCHED, value);
              }}
              value={filterData?.matched || null}
            >
              <Option value="Initial">{t('Initial')}</Option>
              <Option value="Diagnosing">{t('Diagnosing')}</Option>
              <Option value="Fail">{t('Fail')}</Option>
              <Option value="Validating">{t('Validating')}</Option>
              <Option value="Done">{t('Done')}</Option>
            </Select>
          </div>
        </Row>
      </div>
      <div className="filter-items">
        <Row>
          <div>
            <Input
              size="small"
              placeholder={t('Keyword')}
              onChange={(event) => console.log(event)}
              onPressEnter={() => handleOnSearch()}
            />
          </div>
        </Row>
      </div>
      <div className="filter-items">
        <Row>
          <div className="filter-item">
            <Button
              className="filter-btn"
              size="small"
              type="primary"
              icon={<SearchOutlined />}
              onClick={() => handleOnSearch()}
            >
              {t('Search')}
            </Button>
          </div>
          <div className="filter-item">
            <Button
              className="filter-btn"
              size="small"
              ghost
              disabled={!isFiltered}
              // icon={<ReloadOutlined />}
              onClick={() => handleClearAllFilters()}
            >
              {t('Clear Filter')}
            </Button>
          </div>
        </Row>
      </div>
    </>
  );

  return (
    <Row className="filter-data" align="bottom">
      <div className="filter-items">
        <Row className="picker-date">
          <RangePicker
            className="studylist-datepicker"
            size="small"
            allowClear={false}
            value={[
              moment(filterData.startDate || new Date(), formatDate),
              moment(filterData.endDate || new Date(), formatDate),
            ]}
            style={{ width: '100%' }}
            // ranges={presetRanges}
            // format={getDateFormatted()}
            dropdownClassName="date-picker-light"
            onChange={(values) => {
              handleOnChangeFilter(FILTER_TYPE.RANGE_DATE, [
                values[0].startOf('days').format(formatDate),
                values[1].endOf('days').format(formatDate),
              ]);
            }}
            disabledDate={disabledDate}
          />
        </Row>
      </div>
      {window.innerWidth > 600 && extendFilter}
    </Row>
  );
}

export default React.memo(FilterData);

FilterData.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
