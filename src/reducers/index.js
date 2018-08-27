import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { initialState } from './initialState';

import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import currencyReducer from './currencyReducer';
import tribeReducer from './tribeReducer';
import userWalletReducer from './userWalletReducer';
import userSessionReducer from './userSessionReducer';
import tribePollsReducer from './tribePollsReducer';
import tribeProjectsReducer from './tribeProjectsReducer';
import tribeTasksReducer from './tribeTasksReducer';

const rootReducer = combineReducers({
  user: reduceReducers(
    userSessionReducer,
    userWalletReducer,
    initialState.user,
  ),
  loading: loadingReducer,
  tribes: allTribesReducer,
  currencies: currencyReducer,
  polls: tribePollsReducer,
  projects: tribeProjectsReducer,
  tasks: tribeTasksReducer,
  activeTribe: tribeReducer,
});

export default rootReducer;
