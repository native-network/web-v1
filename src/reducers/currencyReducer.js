import { currencyActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function currencyReducer(state = initialState.currency, action) {
  switch (action.type) {
    case actions.SEND_TRANSACTION_SUCCESS:
      return { ...state };
    case actions.SEND_TRANSACTION_ERROR:
      return state;
    default:
      return state;
  }
}
