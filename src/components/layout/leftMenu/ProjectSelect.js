import { Menu, Dropdown, Typography, Space } from 'antd';
import { DownOutlined, HomeFilled } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import './LeftMenu.scss';
import { useState } from 'react';
import AddNewProjectModal from '../../../view/Projects/AddNewProjectModal';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { useProjectsParams } from '../../../utils/hooks';
import UserService from '../../../view/system/userService';
import { PERM_PROJECT_ORG_CREATE } from '../../../utils/permission/perms';

const { Text } = Typography;

export default function ProjectSelect(props) {
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();
  const projectList = useSelector((state) => state.system.projectList) || [];
  const recentProjects = get(projectList, 'recent.data', []);
  const allProjects = get(projectList, 'all.data', []);
  const { params } = useProjectsParams();
  const ticket = useSelector((state) => state.system.ticket);

  const projectId = get(params, 'projectId', '');
  const allProject = get(projectList, 'all.data', []);

  let activeProject = allProject.find((item) => item.project_id === projectId);

  const handleAddProject = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/">See all projects</Link>
      </Menu.Item>
      {UserService.hasPerm(ticket, [PERM_PROJECT_ORG_CREATE]) && (
        <Menu.Item key="1" onClick={handleAddProject}>
          Add a project
        </Menu.Item>
      )}

      <Menu.Divider />
      <Menu.ItemGroup key="g2" title="Recent">
        {recentProjects &&
          recentProjects.map((item) => (
            <Menu.Item
              key={item.project_id}
              onClick={() =>
                history.push(`/projects/${item.project_id}/dashboard`)
              }
            >
              <Text>{item.name}</Text>
              <div className="left-menu-project-slug">{item.project_id}</div>
            </Menu.Item>
          ))}
      </Menu.ItemGroup>

      <Menu.Divider />

      <Menu.ItemGroup key="g3" title="All Projects">
        {allProjects &&
          allProjects.map((item) => (
            <Menu.Item
              key={item.project_id}
              onClick={() =>
                history.push(`/projects/${item.project_id}/dashboard`)
              }
            >
              <Text>{item.name}</Text>
              <div className="left-menu-project-slug">{item.project_id}</div>
            </Menu.Item>
          ))}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <div className="left-menu-download-project">
      <Dropdown
        overlay={menu}
        trigger={['click']}
        overlayClassName="left-menu-dropdown-overlay"
      >
        {!props.collapsed ? (
          <div className="current-project">
            <Space align="center">
              <HomeFilled />
              <div>
                <Text>{activeProject?.name}</Text>
                <div className="left-menu-project-slug">
                  {activeProject?.project_id}
                </div>
              </div>
              <DownOutlined className="project-drop-down-icon" />
            </Space>
          </div>
        ) : (
          <HomeFilled />
        )}
      </Dropdown>
      {showPopup && <AddNewProjectModal handleCancel={handleCancel} />}
    </div>
  );
}
