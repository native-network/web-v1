import { priceActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function pricesReducer(state = initialState.prices, action) {
  switch (action.type) {
    case actions.SET_PRICE_ETH:
      return {
        ...state,
        ethUSD: action.price,
      };
    case actions.SET_PRICE_NTV:
      return {
        ...state,
        ntvWei: action.price,
      };
    default:
      return state;
  }
}
