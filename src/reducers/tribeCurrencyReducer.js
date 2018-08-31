/* eslint-disable */
import { currencyActions, allTribesActions } from '../actions/actionTypes';
import currencyReducer from './currencyReducer';
import allTribesReducer from './allTribesReducer';
import { initialState } from './initialState';

export default function tribesCurrencyReducer(state = initialState, action) {
  switch (action.type) {
    case currencyActions.GET_CURRENCY_DATA_BY_TRIBE_SUCCESS:
      return {
        ...state,
        tribes: {
          tribes: [
          ...state.tribes.tribes.map(t => t !== action.tribe ? t : {...t, currency: action.data}),
        ]},
        currencies: currencyReducer(state.currencies, action)
      };
    default:
      return state;
  }
}
