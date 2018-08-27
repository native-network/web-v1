import { userWalletActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import {
  getAddress,
  getBalance,
  getWeb3ServiceInstance,
} from '../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

export const getUserWalletAddress = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_WALLET_ADDRESS });
    dispatch(beginAjaxCall());
    try {
      const data = await getAddress();
      dispatch(getUserWalletAddressSuccess(data));
      return dispatch(getUserWalletBalance(data));
    } catch (err) {
      const { message } = err;
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

export const getUserWalletBalance = (address) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_WALLET_BALANCE });
    dispatch(beginAjaxCall());

    try {
      const balance = await getBalance(address);

      return dispatch(getUserWalletBalanceSuccess(fromWei(balance)));
    } catch (err) {
      const { message } = err;

      return dispatch(getUserWalletBalanceError(message));
    }
  };
};

export const getUserWalletBalanceSuccess = (balance) => {
  return {
    type: actions.GET_USER_WALLET_BALANCE_SUCCESS,
    balance,
  };
};

export const getUserWalletBalanceError = (error) => {
  return {
    type: actions.GET_USER_WALLET_BALANCE_ERROR,
    error,
  };
};
