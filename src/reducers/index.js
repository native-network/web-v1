import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import tribeReducer from './tribeReducer';
import userAddressReducer from './userAddressReducer';
import userSessionReducer from './userSessionReducer';
import tribePollsReducer from './tribePollsReducer';
import tribeProjectsReducer from './tribeProjectsReducer';

const initialUserState = {
  address: '',
  tribes: [],
  addressError: '',
  sessionError: '',
};

const rootReducer = combineReducers({
  user: reduceReducers(
    userSessionReducer,
    userAddressReducer,
    initialUserState,
  ),
  loading: loadingReducer,
  tribes: allTribesReducer,
  polls: tribePollsReducer,
  projects: tribeProjectsReducer,
  activeTribe: tribeReducer,
});

export default rootReducer;
