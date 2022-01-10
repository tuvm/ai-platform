import React from 'react';
import Error from './Error';

const NotFound = () => {
  return <Error message="Page not found." showGoBackButton={true} />;
};

export default NotFound;
