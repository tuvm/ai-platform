import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Routes from './Routes';
import { LeftMenu, Header } from './components/layout';
import Loading from './components/loading/Loading';
import {
  getAccountInfo,
  actionShowLoading,
  actionShowUploadModal,
} from './view/system/systemAction';
import BreadCrumb from './components/breadcrumb/BreadCrumb';

import './App.scss';

const App = (props) => {
  return (
    <div className="app-container">
      <Loading dark />
      <Layout>
        <Header />
        <Layout>
          <LeftMenu />

          <Layout.Content className="content-container">
            <div className="breadcrumb-content">
              <BreadCrumb />
            </div>
            <Routes />
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default connect(
  (state) => ({
    uploadInfoModal: state.system.uploadInfoModal,
  }),
  { getAccountInfo, actionShowLoading, actionShowUploadModal }
)(App);
