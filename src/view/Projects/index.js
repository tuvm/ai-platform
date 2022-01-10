import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import RecentProjects from './RecentProjects';
import Devider from '../../components/devider';
// import { actionGetProjectList } from './actions';
// import Loading from '../../components/loading/Loading';
import { useSelector, useDispatch } from 'react-redux';

import get from 'lodash/get';

import './ProjectStyle.scss';
import { actionGetProjectList } from './actions';

export default function Projects() {
  const data = useSelector((state) => state.system.projectList);
  const maxReload = 3;
  const [numberReload, setNumberReload] = useState(maxReload);
  const dispatch = useDispatch();
  // const loading = useSelector(state => state.system.projectListLoading)

  useEffect(() => {
    dispatch(actionGetProjectList());
  }, []);

  // if (loading || !data) {
  //   return <Loading />;
  // }

  useEffect(() => {
    let processingProjects = get(data, 'recent.data', []).filter(
      (p) => p.provision_status === 'processing'
    );
    let timer = null;
    if (processingProjects.length > 0) {
      console.log('Has processing project', numberReload);
      if (numberReload > 0) {
        setNumberReload(numberReload - 1);
        timer = setTimeout(() => {
          dispatch(actionGetProjectList());
        }, 2000);
      }
    } else {
      setNumberReload(maxReload);
    }
    if (timer) {
      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div className="project-page-inner">
      <RecentProjects data={data.recent} />
      <Devider />
      <ProjectList data={data.all} />
    </div>
  );
}
