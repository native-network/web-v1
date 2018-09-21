import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { initialState } from './initialState';

import loadingReducer from './loadingReducer';
import communitiesReducer from './communitiesReducer';
import currencyReducer from './currencyReducer';
import userWalletReducer from './userWalletReducer';
import userSessionReducer from './userSessionReducer';
import communityPollsReducer from './communityPollsReducer';
import communityProjectsReducer from './communityProjectsReducer';
import communityTasksReducer from './communityTasksReducer';
import pricesReducer from './pricesReducer';

const rootReducer = combineReducers({
  user: reduceReducers(
    userSessionReducer,
    userWalletReducer,
    initialState.user,
  ),
  loading: loadingReducer,
  communities: communitiesReducer,
  currencies: currencyReducer,
  polls: communityPollsReducer,
  projects: communityProjectsReducer,
  tasks: communityTasksReducer,
  toastr: toastrReducer,
  prices: pricesReducer,
});

export default rootReducer;
