import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import tribeReducer from './tribeReducer';
import userAddressReducer from './userAddressReducer';
import userSessionReducer from './userSessionReducer';
import tribePollsReducer from './tribePollsReducer';

const rootReducer = combineReducers({
  user: reduceReducers(userAddressReducer, userSessionReducer),
  loading: loadingReducer,
  tribes: allTribesReducer,
  polls: tribePollsReducer,
  activeTribe: tribeReducer,
});

export default rootReducer;
