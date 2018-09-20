import { userWalletActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getAddress, getBalance } from '../web3/Web3Service';
import { retrieveWalletCurrencyData } from '../utils/constants';
import { toastrError } from './toastrActions';

export const getUserWalletAddress = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_WALLET_ADDRESS });
    dispatch(beginAjaxCall());

    try {
      const data = await getAddress();
      dispatch(getUserWalletAddressSuccess(data));
      return dispatch(getUserWalletBalances(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(getUserWalletAddressError(message));
    }
  };
};

export const getUserWalletAddressSuccess = (address) => {
  return {
    type: actions.GET_USER_WALLET_ADDRESS_SUCCESS,
    address,
  };
};

export const getUserWalletAddressError = (error) => {
  return {
    type: actions.GET_USER_WALLET_ADDRESS_ERROR,
    error,
  };
};

export const getUserWalletBalances = (address) => {
  return async (dispatch, getState) => {
    dispatch({ type: actions.GET_USER_WALLET_BALANCES });
    const { communities } = getState().communities;

    const instances = communities.map((community) =>
      retrieveWalletCurrencyData(address, community),
    );

    return Promise.all([getBalance(address), ...instances])
      .then((data) => dispatch(getUserWalletBalancesSuccess(data)))
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        return dispatch(getUserWalletBalancesError(message));
      });
  };
};

export const getUserWalletBalancesSuccess = (currencies) => {
  return {
    type: actions.GET_USER_WALLET_BALANCES_SUCCESS,
    currencies,
  };
};

export const getUserWalletBalancesError = (error) => {
  return {
    type: actions.GET_USER_WALLET_BALANCES_ERROR,
    error,
  };
};
