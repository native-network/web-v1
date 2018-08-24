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

    case actions.GET_USER_WALLET_BALANCE_SUCCESS:
      return {
        ...state,
        wallet: {
          ...state.wallet,
          currencies: [
            ...currencies.filter((c) => c.symbol !== 'ETH'),
            {
              ...currencies.find((c) => c.symbol === 'ETH'),
              balance: action.balance,
            },
          ],
        },
      };
    default:
      return state;
  }
}
