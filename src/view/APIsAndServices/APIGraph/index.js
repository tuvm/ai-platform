import React, { useState } from 'react';
import Filter from './Filter';
import Graphs from './Graphs';

export const APIContext = React.createContext();

export default function APIGraph() {
  const [filterType, setFilterType] = useState([]);
  const [filterDate, setFilterDate] = useState({ startDate: '', endDate: '' });


  const store = {
    filterDate,
    filterType,
    setFilterDate,
    setFilterType,
  };

  return (
    <APIContext.Provider value={store}>
      <div className="graph-container">
        <Filter />
        <Graphs />
      </div>
    </APIContext.Provider>
  );
}
