import React, { useState, useEffect } from 'react';
import Filter from './Filter/Filter';
import APITable from './APITable';
import Devider from '../../components/devider';
import Graphs from './APIGraph';
import { useDispatch } from 'react-redux';
import { actionGetResourceOptions } from './actions';

export const APIContext = React.createContext();

export default function APIsAndServices() {
  const [filterType, setFilterType] = useState([]);
  const [filterDate, setFilterDate] = useState({ startDate: '', endDate: '' });
  const dispatch = useDispatch();

  const store = {
    filterDate,
    filterType,
    setFilterDate,
    setFilterType,
  };

  useEffect(() => {
    dispatch(actionGetResourceOptions({ params: { project_id: 'nothing'} }));
  },[dispatch]);

  return (
    <APIContext.Provider value={store}>
      <div className="graph-container">
        <Filter />
        <Devider />
        <Graphs />
        <Devider />
        <APITable/>
      </div>
    </APIContext.Provider>
  );
}