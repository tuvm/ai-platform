import React, { useState, useEffect } from 'react';
import Filter from './Filter/Filter';
import APITable from './APITable';
import Devider from '../../components/devider';
import Graphs from './APIGraph';
import { useDispatch } from 'react-redux';
import { actionGetResourceOptions } from './actions';
import { useProjectsParams } from '../../utils/hooks';
import get from 'lodash/get';
import moment from 'moment';
import { API_SCOPES } from '../../utils/constants/config';
// import { actionInspectTicket } from '../system/systemAction';

const endDate = moment(new Date()).utc().toISOString();
const startDate = moment().subtract(7, 'days').utc().toISOString();
const DEFAULT_FILTER_DATE = {
  startDate,
  endDate,
};

export const APIContext = React.createContext();

export default function APIsAndServices() {
  const [filterType, setFilterType] = useState([API_SCOPES[0].key]);
  const [filterDate, setFilterDate] = useState(DEFAULT_FILTER_DATE);
  const { params: projectParams } = useProjectsParams();
  const projectId = get(projectParams, 'projectId', '');
  const dispatch = useDispatch();

  const store = {
    filterDate,
    filterType,
    setFilterDate,
    setFilterType,
  };

  useEffect(() => {
    // dispatch(actionInspectTicket({project_id: projectId}));
    dispatch(actionGetResourceOptions({ params: { project_id: projectId } }));
  }, [dispatch, projectId]);

  return (
    <APIContext.Provider value={store}>
      <div className="graph-container">
        <Filter />
        <Devider />
        <Graphs />
        <Devider />
        <APITable />
      </div>
    </APIContext.Provider>
  );
}
