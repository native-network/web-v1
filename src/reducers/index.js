import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import tribeReducer from './tribeReducer';
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  tribes: allTribesReducer,
  activeTribe: tribeReducer
});

export default rootReducer;
