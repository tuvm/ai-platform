import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Routes from './Routes';
import { LeftMenu, Header } from './components/layout';
import Loading from './components/loading/Loading';
import get from 'lodash/get';
import {
  actionGetTenantSetting,
  actionInspectTicket,
  getAccountInfo,
} from './view/system/systemAction';
import BreadCrumb from './components/breadcrumb/BreadCrumb';
import AppHelmet from './components/Helmet';
import './App.scss';
import { PAGES_HAS_NO_LAYOUT } from './utils/constants/config';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useProjectsParams } from './utils/hooks';

const App = (props) => {
  const pathname = get(props, 'location.pathname');
  const { params: projectParams } = useProjectsParams();
  const dispatch = useDispatch();

  const projectId = get(projectParams, 'projectId', '');

  useEffect(() => {
    actionGetTenantSetting();
    getAccountInfo();
  }, []);

  useEffect(() => {
    if (projectId) {
      dispatch(actionInspectTicket({ scope: projectId }));
    }
  }, [pathname]);

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
