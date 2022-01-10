import React from 'react';
import { Button, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import './Error.scss';

const { Title } = Typography;

export default function Error(props) {
  const {
    message = 'Something went wrong, please try again.',
    showGoBackButton = true,
  } = props || {};
  return (
    <div className="not-found text-center">
      <Title level={2} style={{ display: 'flex', justifyContent: 'center' }}>
        <LockOutlined />
      </Title>
      <Title level={5} className="error-message">
        {message}
      </Title>
      {showGoBackButton && (
        <Title level={5}>
          <Button type="link" href={'/'}>
            Go back Home
          </Button>
        </Title>
      )}
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string,
  showGoBackButton: PropTypes.bool,
};
