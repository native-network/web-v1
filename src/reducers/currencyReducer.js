import { currencyActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function currencyReducer(state = initialState.currency, action) {
  switch (action.type) {
    case actions.GET_CURRENCY_PRICE_BY_TRIBE_ID_SUCCESS:
      return {
        ...state,
        currencies: [
          ...state.currencies,
          {
            tribeId: action.tribe.id,
            ...action.data,
            iconUrl: action.tribe.icon,
            minimumStake: '100',
          },
        ],
      };
    case actions.GET_CURRENCY_PRICE_BY_TRIBE_ID_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
