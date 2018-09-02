/* eslint-disable */
import { currencyActions, allCommunitiesActions } from '../actions/actionTypes';
import currencyReducer from './currencyReducer';
import allCommunitiesReducer from './allCommunitiesReducer';
import { initialState } from './initialState';

export default function communitiesCurrencyReducer(state = initialState, action) {
  switch (action.type) {
    case currencyActions.GET_CURRENCY_DATA_BY_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: {
          communities: [
          ...state.communities.communities.map(t => t !== action.community ? t : {...t, currency: action.data}),
        ]},
        currencies: currencyReducer(state.currencies, action)
      };
    default:
      return state;
  }
}
