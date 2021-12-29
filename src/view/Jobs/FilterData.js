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
  PRIORITY: 2,
  MODEL: 3,
  STATUS: 4,
  SEARCH: 5,
};

const INITIAL_FILTERS = {
  startDate: moment().subtract(30, 'days').format('YYYYMMDD'),
  endDate: moment().format('YYYYMMDD'),
  search: '',
};

function FilterData(props) {
  const {
    onSearch,
    initFilter,
    formatDate = 'YYYYMMDD',
    initSearchFields,
  } = props;
  const { t } = useTranslation(['Vindoc']);
  const [filterData, setFilterData] = useState(INITIAL_FILTERS);
  const [searchFields, setSearchFields] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [search, setSearch] = useState('');

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
      case FILTER_TYPE.MODEL:
        tempFilterData = {
          ...filterData,
          ai_model: values || '*',
        };
        break;
      case FILTER_TYPE.PRIORITY:
        tempFilterData = {
          ...filterData,
          priority: values || '*',
        };
        break;
      case FILTER_TYPE.STATUS:
        tempFilterData = {
          ...filterData,
          status: values || '*',
        };
        break;
      case FILTER_TYPE.SEARCH:
        console.log(values);
        tempFilterData = {
          ...filterData,
          search: values === '*' ? '' : values,
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
    setFilterData(INITIAL_FILTERS);
    setSearch('');
    onSearch(INITIAL_FILTERS);
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
                handleOnChangeFilter(FILTER_TYPE.PRIORITY, value);
              }}
              value={filterData?.priority || null}
            >
              <Option value="*">{t('All')}</Option>
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
                handleOnChangeFilter(FILTER_TYPE.STATUS, value);
              }}
              value={filterData?.status || null}
            >
              <Option value="*">{t('All')}</Option>
              <Option value="INITIAL">{t('Initial')}</Option>
              <Option value="DIAGNOSING">{t('Diagnosing')}</Option>
              <Option value="FAIL">{t('Fail')}</Option>
              <Option value="VALIDATING">{t('Validating')}</Option>
              <Option value="DONE">{t('Done')}</Option>
            </Select>
          </div>
          <div className="filter-item select-item">
            <Select
              size="small"
              style={{ width: '100%' }}
              suffixIcon={<CaretDownOutlined />}
              placeholder={t('Model')}
              className="select-dropdown-light"
              dropdownClassName="dropdown-options-dark"
              onChange={(value) => {
                handleOnChangeFilter(FILTER_TYPE.MODEL, value);
              }}
              value={filterData?.ai_model || null}
            >
              <Option value="*">{t('All')}</Option>
              <Option value="chestxray">{t('Chestxray')}</Option>
              <Option value="spinexray">{t('Spinexray')}</Option>
              <Option value="mamography">{t('Mamography')}</Option>
              <Option value="brainct">{t('Brainct')}</Option>
              <Option value="brainmri">{t('Brainmri')}</Option>
              <Option value="lungct">{t('Lungct')}</Option>
              <Option value="liverct">{t('Liverct')}</Option>
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
              onChange={(event) => setSearch(event?.target?.value)}
              onPressEnter={() => {
                console.log(search);
                handleOnChangeFilter(FILTER_TYPE.SEARCH, search || '*');
              }}
              value={search}
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
              onClick={() =>
                handleOnChangeFilter(FILTER_TYPE.SEARCH, search || '*')
              }
            >
              {t('Search')}
            </Button>
          </div>
          <div className="filter-item">
            <Button
              className="filter-btn"
              size="small"
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
                values[0].startOf('day').format(formatDate),
                values[1].endOf('day').format(formatDate),
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
