import React from 'react';
import ProjectList from './ProjectList';
import RecentProjects from './RecentProjects'
import Devider from '../../../components/devider';
import './ProjectStyle.scss';

export default function Projects() {
  return (
    <div className="project-page-inner">
      <RecentProjects />
      <Devider />
      <ProjectList />
    </div>
  );
}