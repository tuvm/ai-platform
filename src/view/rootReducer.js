import { combineReducers } from 'redux';
import system from './system/systemReducer';

const rootReducer = combineReducers({
  system,
});

export default rootReducer;
