import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import Graphs from './Graphs';
import { actionQueryAPIUsage } from '../actions';

export const APIContext = React.createContext();

export default function APIGraph() {
  const [filterType, setFilterType] = useState([]);
  const [filterDate, setFilterDate] = useState({ startDate: '', endDate: ''});

  useEffect(() => {
    const params = {
      query_string: `ai_model=${filterType.join(',')}`,
      start_date: filterDate.startDate,
      end_date: filterDate.endDate,
      metric: 'requests',
      interval: '1d'
    }
    // actionQueryAPIUsage({ params });
  }, [])

  const store = {
    filterDate,
    filterType,
    setFilterDate,
    setFilterType
  }

  console.log({store})

  return (
    <APIContext.Provider value={store}>
      <div className="graph-container">
        <Filter />
        <Graphs />
      </div>
    </APIContext.Provider>
  );
}