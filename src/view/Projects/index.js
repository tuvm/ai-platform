import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import RecentProjects from './RecentProjects'
import Devider from '../../components/devider';
import { actionGetProjectList } from './actions';
import Loading from '../../components/loading/Loading';

import get from 'lodash/get';
import './ProjectStyle.scss';

export default function Projects() {
  const [data, setData] = useState({})
  const [dataLoading, setDataLoading] = useState(false)


  useEffect(() => {
    setDataLoading(true)
    actionGetProjectList().then(res => {
      const data = get(res, 'data');
      setData(data);
      const recent = get(data, 'recent.data') || [];
      data.recent.data = recent.slice(0, 5);
      setDataLoading(false)
    })
  }, [])

  if (dataLoading) {
    return <Loading />;
  }

  return (
    <div className="project-page-inner">
      <RecentProjects data = {data.recent} />
      <Devider />
      <ProjectList data={data.all} />
    </div>
  );
}