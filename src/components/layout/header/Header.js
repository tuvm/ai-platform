import React from 'react';
import { Menu, Dropdown, Layout, Modal, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { routes } from '../../../utils/constants/config';
import { actionLogout } from '../../../view/system/systemAction';
import './Header.scss';

const Header = (props) => {
  const { location = {}, profile } = props;
  const { t } = useTranslation();
  // const { pathname = '' } = location;

  const handleClickLogout = async (item) => {
    if (item.key === routes.LOGIN) {
      Modal.confirm({
        title: 'Are you sure?',
        content: null,
        onOk: () => {
          actionLogout();
        },
        onCancel: () => {},
      });
    }
  };

  const handleClickAvatar = () => {
    console.log('user');
    props.history.push(routes.USERS);
  };

  const goHomePage = () => {
    props.history.push(routes.HOME);
  };

  const menu = (
    <Menu onClick={handleClickLogout}>
      <Menu.Item key={routes.LOGIN}>{t('IDS_COMMON_LOGOUT')}</Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header>
      <div className="header-container">
        <div className="header-left-content" onClick={goHomePage}>
          {/* <span role="img" className="anticon app-logo" onClick={goHomePage}>
            <span className="logo-text">VinDr</span>
            <span className="logo-sub-text">AI Platform</span>
          </span> */}
          <img src="/ai-platform-logo.png" alt="logo" />
        </div>

        <div className="header-right-content">
          <Dropdown overlay={menu}>
            <div className="user-info" onClick={handleClickAvatar}>
              <Avatar size={30} src={profile?.avatar || <UserOutlined />} />
              <span className="user-name">{profile?.username}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default connect(
  (state) => ({
    profile: state.system.profile,
  }),
  {}
)(withRouter(Header));
