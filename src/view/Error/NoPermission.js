import React from 'react';
import Error from './Error';

const NoPermission = () => {
  return (
    <Error
      message="Sorry, you don't have permission to view this page."
      showGoBackButton={true}
    />
  );
};

export default NoPermission;
