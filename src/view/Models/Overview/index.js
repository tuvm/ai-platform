import React from 'react';
import overviewContent from './content';

const Overview = () => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: overviewContent }}></div>
    </div>
  );
};

export default Overview;
