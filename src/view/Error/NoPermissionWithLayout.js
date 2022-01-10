import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/layout/header/Header';
import Error from './Error';

export default function NoPermissionWithLayout() {
  return (
    <div>
      <Header />
      <Error
        message="Sorry, you don't have permission to view this page."
        showGoBackButton={false}
      />
    </div>
  );
}

NoPermissionWithLayout.propTypes = {
  message: PropTypes.string,
  showGoBackButton: PropTypes.bool,
};
