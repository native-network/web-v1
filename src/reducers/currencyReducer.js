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
            iconUrl: action.tribe.icon,
            tokenAddress: action.tribe.tokenAddress,
            minimumStake: '100',
            ...action.data,
          },
        ],
      };
    case actions.GET_CURRENCY_PRICE_BY_TRIBE_ID_ERROR:
      return { ...state, error: action.error };
    case actions.SEND_TRANSACTION_SUCCESS:
      return { ...state };
    case actions.SEND_TRANSACTION_ERROR:
      return state;
    default:
      return state;
  }
}
