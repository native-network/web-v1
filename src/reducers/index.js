import { combineReducers } from '../../../../../../../Library/Caches/typescript/2.9/node_modules/redux';
import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import tribeReducer from './tribeReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tribes: allTribesReducer,
  activeTribe: tribeReducer
});

export default rootReducer;
