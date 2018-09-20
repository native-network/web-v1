import { userWalletActions as actions } from '../actions/actionTypes';

export default function userWalletReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USER_WALLET_ADDRESS_SUCCESS:
      return {
        ...state,
        wallet: {
          address: action.address,
          currencies: [],
        },
        addressError: '',
      };
    case actions.GET_USER_WALLET_ADDRESS_ERROR:
      return { ...state, address: '', addressError: action.error };

    case actions.GET_USER_WALLET_BALANCES_SUCCESS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          currencies: action.currencies,
        },
      };
    case actions.GET_USER_WALLET_BALANCES_ERROR:
      return {
        ...state,
        wallet: {
          currencyError: action.error,
        },
      };
    default:
      return state;
  }
}
