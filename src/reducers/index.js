import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import tribeReducer from './tribeReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tribes: allTribesReducer,
  activeTribe: tribeReducer
});

export default rootReducer;
