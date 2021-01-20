import { combineReducers } from 'redux';
import system from './system/systemReducer';
import project from './project/ProjectReducer';
import label from '../components/labels/LabelsReducer';

const rootReducer = combineReducers({
  system,
  project,
  label
});

export default rootReducer;
