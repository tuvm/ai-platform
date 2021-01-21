import React from 'react';
import Filter from './Filter';
import Graphs from './Graphs';

export default function APIGraph() {
    return (
      <div className="graph-container">
        <Filter />
        <Graphs />
      </div>
    );
}