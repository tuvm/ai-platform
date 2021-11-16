import React from 'react';
import ProjectList from './ProjectList';
import RecentProjects from './RecentProjects'
import Devider from '../../components/devider';
// import { actionGetProjectList } from './actions';
import Loading from '../../components/loading/Loading';
import { useSelector } from 'react-redux';

import './ProjectStyle.scss';

export default function Projects() {
  const data = useSelector(state => state.system.projectList)
  // const dispatch = useDispatch()
  const loading = useSelector(state => state.system.projectListLoading)

  // useEffect(() => {
  //   dispatch(actionGetProjectList())
  // }, [dispatch])

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="project-page-inner">
      <RecentProjects data={data.recent} />
      <Devider />
      <ProjectList data={data.all} />
    </div>
  );
}