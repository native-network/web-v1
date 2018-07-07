import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import tribesReducer from './tribesReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  tribes: tribesReducer
});

export default rootReducer;
