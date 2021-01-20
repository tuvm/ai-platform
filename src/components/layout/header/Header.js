import React from 'react';
import { Menu, Dropdown, Layout, Modal, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import cookie from 'js-cookie';
import { withRouter } from 'react-router-dom';
import { routes, TOKEN, REFRESH_TOKEN } from '../../../utils/constants/config';
import { actionLogout, requestLogin } from '../../../view/system/systemAction';
import './Header.scss';

const Header = (props) => {
  const { currentProject = {}, location = {}, account } = props;
  const { pathname = '' } = location;
  const isShowProjectName = pathname.indexOf(routes.STUDY_LIST) !== -1;

  const handleClickAvatar = async (item) => {
    if (item.key === routes.LOGIN) {
      Modal.confirm({
        title: 'Are you sure?',
        content: null,
        onOk: () => {
          if (cookie.get(REFRESH_TOKEN)) {
            actionLogout();
          } else {
            cookie.remove(TOKEN);
            cookie.remove(REFRESH_TOKEN);
            requestLogin();
          }
        },
        onCancel: () => {},
      });
    }
  };

  const goHomePage = () => {
    props.history.push(routes.PROJECTS);
  };

  const menu = (
    <Menu onClick={handleClickAvatar}>
      <Menu.Item key={routes.LOGIN}>
        <FormattedMessage id="IDS_COMMON_LOGOUT" />
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header>
      <div className="header-container">
        <div className="header-left-content">
          <span role="img" className="anticon app-logo" onClick={goHomePage}>
            <span className="logo-text">VinDr</span>
            <span className="logo-sub-text">AI Platform</span>
          </span>
        </div>
        {isShowProjectName && currentProject?.name && (
          <div className="project-name">{currentProject?.name}</div>
        )}
        <div className="header-right-content">
          <Dropdown overlay={menu}>
            <div className="user-info">
              <span className="user-name">{account?.preferred_username}</span>
              <Avatar size={30} icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default connect(
  (state) => ({
    account: state.system.profile,
    currentProject: state.project.currentProject,
  }),
  {}
)(withRouter(Header));
