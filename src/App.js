import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Routes from './Routes';
import { LeftMenu, Header } from './components/layout';
import Loading from './components/loading/Loading';
import get from 'lodash/get';
import {
  getAccountInfo,
  actionGetTenantSetting,
} from './view/system/systemAction';
import BreadCrumb from './components/breadcrumb/BreadCrumb';
import AppHelmet from './components/Helmet';
import './App.scss';
import { PAGES_HAS_NO_LAYOUT } from './utils/constants/config'
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actionGetProjectList } from './view/Projects/actions';
import { actionInspectTicket } from './view/system/systemAction';
import { useProjectsParams } from './utils/hooks';


const initialRequest = async () => {
  const res = await actionGetTenantSetting();
  if (res && res.data) {
    getAccountInfo();
  }
};

const App = (props) => {
  const dispatch = useDispatch();
  const { params: projectParams } = useProjectsParams();

  useEffect(() => {
    initialRequest();

    const projectId = get(projectParams, 'projectId', '');
    dispatch(actionInspectTicket({project_id: projectId}))

    dispatch(actionGetProjectList())
  }, [dispatch]);

  // if (isEmpty(props.profile)) {
  //   return <Loading />;
  // }

  const pathname = get(props, 'location.pathname')

  return (
    <div className="app-container">
      <Loading />
      <AppHelmet />
      <Layout>
        <Header />
        <Layout>
          {PAGES_HAS_NO_LAYOUT.includes(pathname) ? null : <LeftMenu />}

          <Layout.Content className="content-container">
            { PAGES_HAS_NO_LAYOUT.includes(pathname) ? null : <BreadCrumb /> }
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
)(withRouter(App));
