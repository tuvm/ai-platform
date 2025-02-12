import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { APP_ROUTES } from '../../../utils/constants/config';
import { IconCollapse } from '../../../assets';
import './LeftMenu.scss';
import { SettingOutlined } from '@ant-design/icons';
import ProjectSelect from './ProjectSelect';
import { useProjectsParams } from '../../../utils/hooks';
import UserService from '../../../view/system/userService';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetProjectList } from '../../../view/Projects/actions';

const { SubMenu } = Menu;

const LeftMenu = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState();
  const ticket = useSelector((state) => state.system.ticket);
  const { t } = useTranslation();
  const { params } = useProjectsParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetProjectList());
  }, []);

  useEffect(() => {
    const page = get(params, 'page', '/');
    setSelectedKeys('/' + page);
  }, [params]);

  const isShowMenu = (el) => {
    return !el.requiredPerms || UserService.hasPerm(ticket, el.requiredPerms);
  };

  const onCollapse = (isCollapse) => {
    setCollapsed(isCollapse);
  };

  const handleMenuClick = ({ key }) => {
    const projectId = get(params, 'projectId', '');
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
          <ProjectSelect collapsed={collapsed} />
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[selectedKeys]}
            mode="inline"
            // className="menu-list"
            theme="light"
          >
            {APP_ROUTES.map((el) => {
              if (el.isShow && isShowMenu(el)) {
                if (!el.hasSubmenu) {
                  return (
                    <Menu.Item key={el.pathname} icon={el.icon}>
                      {t(el.name)}
                    </Menu.Item>
                  );
                }
                return (
                  <SubMenu
                    key={el.pathname}
                    icon={<SettingOutlined />}
                    title={t(el.name)}
                  >
                    {el.submenu &&
                      el.submenu.map((sub) => (
                        <Menu.Item key={sub.pathname}>{t(sub.name)}</Menu.Item>
                      ))}
                  </SubMenu>
                );
              }
              return null;
            })}
          </Menu>
        </div>
      </div>
    </Layout.Sider>
  );
};

export default withRouter(LeftMenu);
