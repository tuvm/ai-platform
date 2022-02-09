import React from 'react';
import overviewContent from './chestCT/index.js';

const Overview = () => {
  return (
    <div
      style={{ marginTop: 1550, marginBottom: 700, transform: 'scale(1.5)' }}
    >
      <div dangerouslySetInnerHTML={{ __html: overviewContent }}></div>
    </div>
  );
};

export default Overview;
