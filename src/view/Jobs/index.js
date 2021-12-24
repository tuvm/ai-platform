import React, { useEffect } from 'react';
import JobList from './JobList';
import FilterData from './FilterData';
import { useDispatch } from 'react-redux';
import { getJoblist } from './actions';

export const Jobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJoblist());
  }, [dispatch]);

  return (
    <>
      <FilterData onSearch={(value) => console.log(value)} />
      <JobList />
    </>
  );
};
