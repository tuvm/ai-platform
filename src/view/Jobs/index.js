import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import JobList from './JobList';
import FilterData from './FilterData';
import { useDispatch, useSelector } from 'react-redux';
import { actiongetJoblist } from './actions';
import { useProjectsParams } from '../../utils/hooks';
import { toLuceneQueryString } from '../../utils/helpers';
import moment from 'moment';
import { getModellist } from '../Models/actions';
import { ROWS_PER_PAGE } from '../../utils/constants/config';

// const INIT_QUERY = {
//   model: '*',
//   status: '*',
//   priority: '*',
// };

const Jobs = () => {
  const dispatch = useDispatch();
  const { params } = useProjectsParams();
  const credentialList = useSelector((state) => state.system.credentialList);
  const [queryStr, setQueryStr] = useState('*');
  const [query, setQuery] = useState({
    offset: 0,
    limit: ROWS_PER_PAGE[0],
    sort: '-start_time',
  });

  useEffect(() => {
    dispatch(
      actiongetJoblist(params.projectId, { ...query, query_string: queryStr })
    );
  }, [query, params, credentialList]);

  useEffect(() => {
    dispatch(getModellist(params.projectId));
  }, []);

  const handleSearch = (values) => {
    const str = toQueryString(values);
    setQueryStr(str);
    setQuery({
      ...query,
      offset: 0,
    });
  };

  const toQueryString = (values) => {
    let transformQuery = { ...values };
    delete transformQuery.startDate;
    delete transformQuery.endDate;
    delete transformQuery.search;

    if (values?.startDate && values?.endDate) {
      transformQuery.diagnosis_date = `[${moment(
        values?.startDate,
        'YYYYMMDD'
      ).valueOf()} TO ${moment(Number(values?.endDate), 'YYYYMMDD')
        .endOf('day')
        .valueOf()}]`;
    }

    let queryStr = toLuceneQueryString(transformQuery, ' AND ', ':');
    if (values?.search) {
      queryStr = queryStr
        ? queryStr + ` AND ${values?.search}`
        : values?.search;
    }
    return queryStr;
  };

  const handleTableChange = (value) => {
    setQuery({ ...query, ...value });
  };

  return (
    <>
      <FilterData onSearch={handleSearch} />
      <JobList onChange={handleTableChange} />
    </>
  );
};

export default React.memo(Jobs, () => true);
