import React from 'react';
import { Row, Col, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import Devider from '../../components/devider';
import BillingSummary from './BillingSummary';
import './Billing.scss';

export default function Billing() {
  const summaryCost = [
    {
      name: 'Month-to-date total cost',
      value: 15000,
    },
    {
      name: 'End-of-month total cost',
      value: 50000,
    },
  ];

  const billAccount = [
    {
      name: 'Billing ID',
      value: 'ffr-bxhr-ctz-211',
    },
    {
      name: 'Department',
      value: 'Medical Imaging',
    },
    {
      name: 'Company name',
      value: 'Vingroup Big Data Institute',
    },
    {
      name: 'Tax number',
      value: '0108539485',
    },
  ];

  return (
    <div className="billing-page">
      <Row className="billing-info" gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col className="col-item" xs={24} md={24} lg={14}>
          <div className="bill-info-box">
            <Row className="header-box summary-cost">
              <div className="box-title">Current month</div>
              <div className="box-description">
                {moment(new Date()).format('MMM DD, YYYY')}
              </div>
            </Row>
            <Row className="box-content">
              {summaryCost.map((it, idx) => (
                <Col xs={24} md={12} key={idx}>
                  <div className="lb-title">{it.name || ''}</div>
                  <div className="lb-value">{it.value || ''}</div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col className="col-item" xs={24} md={24} lg={10}>
          <div className="bill-info-box">
            <Row className="header-box">
              <div className="box-title">Billing account</div>
              <Button type="link" icon={<EditOutlined />} />
            </Row>
            <Row className="box-content">
              {billAccount.map((it, idx) => (
                <Col xs={24} md={12} key={idx}>
                  <div className="lb-title">{it.name || ''}</div>
                  <div className="lb-value">{it.value || ''}</div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      <Devider />
      <Row>
        <Col xs={24} md={24}>
          <BillingSummary />
        </Col>
      </Row>
    </div>
  );
}
