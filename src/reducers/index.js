import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { initialState } from './initialState';

import loadingReducer from './loadingReducer';
import allTribesReducer from './allTribesReducer';
import currencyReducer from './currencyReducer';
import tribeReducer from './tribeReducer';
import userAddressReducer from './userAddressReducer';
import userSessionReducer from './userSessionReducer';
import tribePollsReducer from './tribePollsReducer';

const rootReducer = combineReducers({
  user: reduceReducers(
    userSessionReducer,
    userAddressReducer,
    initialState.user,
  ),
  loading: loadingReducer,
  tribes: allTribesReducer,
  currencies: currencyReducer,
  polls: tribePollsReducer,
  activeTribe: tribeReducer,
});

export default rootReducer;
