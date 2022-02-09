import React from 'react';
import { SLUG_TO_MODEL } from '../../../utils/constants/config';
import { useModelsParams } from '../../../utils/hooks';
// import overviewContent from './SpineXR';
import modelOverviews from './content/index';

const Overview = () => {
  const { params } = useModelsParams();
  console.log(params);
  console.log(modelOverviews);
  return (
    <div
      style={{
        transform: 'scale(1.5)',
        transformOrigin: '50% 0',
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: modelOverviews[SLUG_TO_MODEL[params.model]],
        }}
      ></div>
    </div>
  );
};

export default Overview;
