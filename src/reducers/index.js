import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { initialState } from './initialState';

import loadingReducer from './loadingReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import currencyReducer from './currencyReducer';
import communityReducer from './communityReducer';
import userWalletReducer from './userWalletReducer';
import userSessionReducer from './userSessionReducer';
import communityPollsReducer from './communityPollsReducer';
import communityProjectsReducer from './communityProjectsReducer';
import communityTasksReducer from './communityTasksReducer';

const rootReducer = combineReducers({
  user: reduceReducers(
    userSessionReducer,
    userWalletReducer,
    initialState.user,
  ),
  loading: loadingReducer,
  communities: allCommunitiesReducer,
  currencies: currencyReducer,
  polls: communityPollsReducer,
  projects: communityProjectsReducer,
  tasks: communityTasksReducer,
  activeCommunity: communityReducer,
});

export default rootReducer;
