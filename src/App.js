import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Routes from './Routes';
import { LeftMenu, Header } from './components/layout';
import Loading from './components/loading/Loading';
import {
  getAccountInfo,
  actionGetTenantSetting,
} from './view/system/systemAction';
import BreadCrumb from './components/breadcrumb/BreadCrumb';
import AppHelmet from './components/Helmet';
import './App.scss';

const initialRequest = async () => {
  const res = await actionGetTenantSetting();
  if (res && res.data) {
    getAccountInfo();
  }
};

const App = (props) => {
  useEffect(() => {
    initialRequest();
  }, []);

  // if (isEmpty(props.profile)) {
  //   return <Loading />;
  // }

  return (
    <div className="app-container">
      <Loading />
      <AppHelmet />
      <Layout>
        <Header />
        <Layout>
          <LeftMenu />

          <Layout.Content className="content-container">
            <BreadCrumb />
            <div className="content-inner">
              <Routes />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default connect(
  (state) => ({
    profile: state.system.profile,
  }),
  {}
)(App);
