import { currencyActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function currencyReducer(state = initialState.currency, action) {
  switch (action.type) {
    case actions.SEND_TRANSACTION_IN_ETH:
    case actions.SEND_TRANSACTION_IN_NTV:
      return { ...state, loading: true };
    case actions.SEND_TRANSACTION_IN_ETH_ERROR:
    case actions.SEND_TRANSACTION_IN_NTV_ERROR:
      return { ...state, error: action.error, loading: false };
    case actions.SEND_TRANSACTION_IN_ETH_SUCCESS:
    case actions.SEND_TRANSACTION_IN_NTV_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}
