import React from "react";
import { Row, Col } from "antd";
import RecentRequests from './RecentRequests';
import RecentPayment from './RecentPayment';
import TopAPI from './TopAPI';
import CallRequest from './CallRequests';

import './Home.scss';

export default function Home() {
  return (
    <div className="home-page">
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 10 }}>
          <div className="column">
            <h3 className="title">Call Requests</h3>
            <CallRequest />
          </div>
        </Col>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 14 }}>
          <div className="column">
            <h3 className="title">Recent Requests</h3>
            <RecentRequests />
          </div>
        </Col>
      </Row>

      <div style={{ margin: "24px" }}></div>

      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 10 }}>
          <div className="column">
            <h3 className="title">Top API</h3> 
            <TopAPI />
          </div>
        </Col>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 14 }}>
          <div className="column">
            <h3 className="title">Recent payment</h3>
            <RecentPayment />
          </div>
        </Col>
      </Row>
    </div>
  );
}
