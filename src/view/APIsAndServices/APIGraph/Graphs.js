import React from "react";
import { Row, Col } from "antd";
import RequestGraph from "./RequestGraph";

import "./Graphs.scss";

export default function Graphs() {
  return (
    <div className="graphs-list">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div>
              <RequestGraph />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div>
              <RequestGraph />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div>
              <RequestGraph />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
