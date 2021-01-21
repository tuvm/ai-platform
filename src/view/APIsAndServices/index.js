import React from 'react';
import APITable from './APITable';
import Devider from '../../components/devider';
import APIGraph from './APIGraph';

export default function APIsAndServices() {
    return (
      <>
        <APITable />
        <Devider />
        <APIGraph />
      </>
    );
}