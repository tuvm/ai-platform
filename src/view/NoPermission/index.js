import React from 'react';
// import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Header from '../../components/layout/header/Header';
import './NoPermission.scss';

const { Title } = Typography;

export default function NoPermission() {
  const {
    message = "Sorry, you don't have permission to view this page.",
    // showGoBackButton = true,
  } = {};
  return (
    <>
      <Header />
      <div className="not-found text-center">
        <div>
          <Title
            level={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <LockOutlined />
          </Title>
          <Title level={5} className="error-message">
            {message}
          </Title>
          {/* {showGoBackButton && (
            <Typography variant="body2">
              <Link to={'/'}>Go back Home</Link>
            </Typography>
          )} */}
        </div>
      </div>
    </>
  );
}

NoPermission.propTypes = {
  message: PropTypes.string,
  showGoBackButton: PropTypes.bool,
};
