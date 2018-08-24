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
  activeTribe: tribeReducer,
});

export default rootReducer;
