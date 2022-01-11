import React, { useEffect, useState } from 'react';
import JobList from './JobList';
import FilterData from './FilterData';
import { useDispatch } from 'react-redux';
import { getJoblist } from './actions';
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

export const Jobs = () => {
  const dispatch = useDispatch();
  const { params } = useProjectsParams();
  const [query, setQuery] = useState({
    offset: 0,
    limit: ROWS_PER_PAGE[0],
    query_string: '*',
    sort: '-start_time',
  });

  const handleSearch = (values) => {
    let transformQuery = { ...values };
    delete transformQuery.startDate;
    delete transformQuery.endDate;
    delete transformQuery.search;

    if (values?.startDate && values?.endDate) {
      transformQuery.diagnosis_date = `[${moment(
        values?.startDate,
        'YYYYMMDD'
      ).valueOf()} TO ${moment(
        Number(values?.endDate) + 1,
        'YYYYMMDD'
      ).valueOf()}]`;
    }

    let queryStr = toLuceneQueryString(transformQuery, ' AND ', ':');
    if (values?.search) {
      queryStr = queryStr
        ? queryStr + ` AND ${values?.search}`
        : values?.search;
    }
    console.log(queryStr);
    setQuery({ ...query, query_string: queryStr });
  };

  const handleTableChange = (value) => {
    setQuery({ ...query, ...value });
  };

  useEffect(() => {
    dispatch(getJoblist(params.projectId, query));
  }, [dispatch, query, params]);

  useEffect(() => {
    dispatch(getModellist(params.projectId));
  }, []);

  return (
    <>
      <FilterData onSearch={handleSearch} />
      <JobList onChange={handleTableChange} />
    </>
  );
};
