import React from "react";
import { Row, Col } from "antd";

import './Graphs.scss';

export default function Graphs() {
  return (
    <div className="graphs-list">
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div>graph</div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div>graph</div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div>graph</div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
