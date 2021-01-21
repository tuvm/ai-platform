import React, { useEffect, useState } from 'react';
import { Menu, Layout, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes, ROLES } from '../../../utils/constants/config';
import {
  IconCollapse,
} from '../../../assets';
// import { checkRole } from '../../../view/system/systemAction';
import './LeftMenu.scss';
import {
  HomeOutlined,
  ApiOutlined,
  KeyOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
const LeftMenu = (props) => {
  const { location, userInfo } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState();

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
    setSelectedKeys(key);
    props.history.push(key);
  };

  const menuList = [
    {
      icon: <HomeOutlined />,
      text: <FormattedMessage id="IDS_HOME" />,
      route: routes.PROJECTS,
      isShow: true,
    },
    {
      icon: <ApiOutlined />,
      text: <FormattedMessage id="IDS_API_AND_SERVICE" />,
      route: routes.API_AND_SERVICES,
      isShow: true,
    },
    {
      icon: <KeyOutlined />,
      text: <FormattedMessage id="IDS_TOKEN_GENERATOR" />,
      route: routes.TOKEN_GENERATOR,
      isShow: true,
    },
    {
      icon: <FileTextOutlined />,
      text: <FormattedMessage id="IDS_BILLING" />,
      route: routes.BILLING,
      isShow: true,
    },
    {
      icon: <SettingOutlined />,
      text: <FormattedMessage id="IDS_SETTING" />,
      route: routes.SETTING,
      isShow: true,
    },
  ];

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
          <div className="user-infor">
            <div>
              <Avatar size={40} icon={<UserOutlined />} />
            </div>
            <div className="user-account">
              <span><strong>Mi Nguyen</strong></span>
              <span>minnguyen@gmail.com</span>
            </div>
          </div>
          <Menu
            onClick={handleMenuClick}
            selectedKeys={[selectedKeys]}
            mode="inline"
            className="menu-list"
          >
            {menuList.map((el) => {
              if (el.isShow) {
                return (
                  <Menu.Item
                    key={el.route}
                    icon={
                      el.icon ? (
                        <span role="img" className="anticon">
                          {el.icon}
                        </span>
                      ) : null
                    }
                  >
                    {el.text}
                  </Menu.Item>
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

export default connect(
  (state) => ({ userInfo: state.system.profile }),
  null
)(withRouter(LeftMenu));
