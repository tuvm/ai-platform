import React, { useEffect, useState } from 'react';
import { Menu, Layout, Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { connect } from 'react-redux';
import get from 'lodash/get';
import { routes, APP_ROUTES } from '../../../utils/constants/config';
import {
  IconCollapse,
} from '../../../assets';
import './LeftMenu.scss';
import {
  SettingOutlined,
} from '@ant-design/icons';
import ProjectSelect from './ProjectSelect';

import { matchPath } from 'react-router';

const { SubMenu } = Menu;

const LeftMenu = (props) => {
  const { location, userInfo } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname?.indexOf(routes.STUDY_LIST) > -1) {
      setSelectedKeys(routes.PROJECTS);
    } else {
      setSelectedKeys(pathname);
    }
  }, [location]);

  const onCollapse = (isCollapse) => {
    setCollapsed(isCollapse);
  };

  const handleMenuClick = ({ key }) => {
    const { pathname } = location;
    setSelectedKeys(key);
    
    const match = matchPath(pathname, {
      path: '/projects/:projectId/*',
      exact: true,
      strict: false
    });

    const projectId = get(match, 'params.projectId', '/');
    props.history.push(`/projects/${projectId}${key}`);
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="left-layout-sider"
      trigger={<IconCollapse />}
    >
      <div className="sider-container">
        <div className="left-menu-wrapper">
          <ProjectSelect />
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[selectedKeys]}
            mode="inline"
            // className="menu-list"
            theme="light"
          >
            {APP_ROUTES.map((el) => {
              if (el.isShow) {
                if (!el.hasSubmenu) {
                  return (
                    <Menu.Item
                      key={el.pathname}
                      icon={el.icon}
                    >
                      {t(el.name)}
                    </Menu.Item>
                  );
                }
                return (
                  <SubMenu key={el.pathname} icon={<SettingOutlined />} title={t(el.name)}>
                    {el.submenu && el.submenu.map(sub => (
                      <Menu.Item key={sub.pathname}>{t(sub.name)}</Menu.Item>
                    ))}
                  </SubMenu>
                )
              }
              return null;
            })}
          </Menu>
        </div>
      </div>
    </Layout.Sider>
  );
};

export default connect(
  (state) => ({ userInfo: state.system.profile }),
  null
)(withRouter(LeftMenu));
