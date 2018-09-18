import { currencyActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function currencyReducer(state = initialState.currency, action) {
  switch (action.type) {
    case actions.SEND_TRANSACTION_IN_ETH:
    case actions.SEND_TRANSACTION_IN_NTV:
    case actions.STAKE_TRANSACTION:
      return { ...state, loading: true, error: '' };
    case actions.SEND_TRANSACTION_IN_ETH_ERROR:
    case actions.SEND_TRANSACTION_IN_NTV_ERROR:
    case actions.STAKE_TRANSACTION_ERROR:
      return { ...state, error: action.error, loading: false };
    case actions.SEND_TRANSACTION_IN_ETH_SUCCESS:
    case actions.SEND_TRANSACTION_IN_NTV_SUCCESS:
    case actions.STAKE_TRANSACTION_SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}
