import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Routes from './Routes';
import { useHistory } from 'react-router';
import { LeftMenu, Header } from './components/layout';
import Loading from './components/loading/Loading';
import get from 'lodash/get';
import {
  getAccountInfo,
  actionGetTenantSetting,
  actionShowLoading,
  actionHideLoading,
} from './view/system/systemAction';
import BreadCrumb from './components/breadcrumb/BreadCrumb';
import AppHelmet from './components/Helmet';
import './App.scss';
import { PAGES_HAS_NO_LAYOUT, PUBLIC_PATH } from './utils/constants/config';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserService from './view/system/userService';

const App = (props) => {
  const pathname = get(props, 'location.pathname');

  // useEffect(() => {
  //   // console.log(UserService.isLoggedIn());
  //   const isRedirect = get(props, 'location.hash');
  //   if (!PUBLIC_PATH.includes(pathname) && !UserService.isLoggedIn()) {
  //     initialRequest();
  //   }
  // }, []);

  // const initialRequest = async () => {
  //   dispatch(actionShowLoading());
  //   UserService.initKeycloak(
  //     () => {
  //       actionGetTenantSetting();
  //       getAccountInfo();
  //       dispatch(actionHideLoading());
  //     },
  //     () => {
  //       dispatch(actionHideLoading());
  //       history.push('/no-permission');
  //     }
  //   );
  // };

  return (
    <div className="app-container">
      <Loading />
      <AppHelmet />
      <Layout>
        <Header />
        <Layout>
          {PAGES_HAS_NO_LAYOUT.includes(pathname) ? null : <LeftMenu />}

          <Layout.Content className="content-container">
            {PAGES_HAS_NO_LAYOUT.includes(pathname) ? null : <BreadCrumb />}
            <div className="content-inner">
              <Routes />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default withRouter(App);
