import { userWalletActions as actions } from '../actions/actionTypes';
import { currencies } from '../utils/constants';

export default function userWalletReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USER_WALLET_ADDRESS_SUCCESS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          address: action.address,
        },
        addressError: '',
      };
    case actions.GET_USER_WALLET_ADDRESS_ERROR:
      return { ...state, address: '', addressError: action.error };

    case actions.GET_USER_WALLET_ETH_BALANCE_SUCCESS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          currencies: [
            ...state.wallet.currencies,
            {
              ...currencies.find((c) => c.symbol === 'ETH'),
              balance: action.balance,
            },
          ],
        },
      };
    case actions.GET_USER_WALLET_COMMUNITY_BALANCE_SUCCESS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          currencies: [
            ...state.wallet.currencies.filter(
              (c) => c.symbol !== action.currency.symbol,
            ),
            state.wallet.currencies.find(
              (c) => c.symbol === action.currency.symbol,
            )
              ? {
                  ...state.wallet.currencies.find(
                    (c) => c.symbol === action.currency.symbol,
                  ),
                  balance: action.currency.balance,
                }
              : action.currency,
          ],
        },
      };
    default:
      return state;
  }
}
