import { userWalletActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import {
  getAddress,
  getBalance,
  getWeb3ServiceInstance,
} from '../web3/Web3Service';
import { allCommunityContractInstances } from '../utils/constants';
import { toastrError } from './toastrActions';

const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

export const getUserWalletAddress = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_WALLET_ADDRESS });
    dispatch(beginAjaxCall());
    try {
      const data = await getAddress();
      dispatch(getUserWalletAddressSuccess(data));
      return dispatch(getUserWalletEthBalance(data));
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

export const getUserWalletEthBalance = (address) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_WALLET_ETH_BALANCE });
    dispatch(beginAjaxCall());

    try {
      const balance = await getBalance(address);
      return dispatch(getUserWalletEthBalanceSuccess(fromWei(balance)));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(getUserWalletEthBalanceError(message));
    }
  };
};

export const getUserWalletEthBalanceSuccess = (balance) => {
  return {
    type: actions.GET_USER_WALLET_ETH_BALANCE_SUCCESS,
    balance,
  };
};

export const getUserWalletEthBalanceError = (error) => {
  return {
    type: actions.GET_USER_WALLET_ETH_BALANCE_ERROR,
    error,
  };
};

export const getUserWalletCommunityBalance = (address) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { communities } = state.communities;
    const { currencies } = state.currencies;

    const instances = allCommunityContractInstances(communities);

    return Promise.all(instances)
      .then((instances) => {
        return instances.map(async ({ id, community3 }) => {
          dispatch({ type: actions.GET_USER_WALLET_COMMUNITY_BALANCE });
          dispatch(beginAjaxCall());
          const currency = currencies.find((c) => c.communityId === id);
          const balance = await community3.getTokenBalance(address);
          return dispatch(
            getUserWalletCommunityBalanceSuccess({
              ...currency,
              balance,
            }),
          );
        });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        return getUserWalletCommunityBalanceError(message);
      });
  };
};

export const getUserWalletCommunityBalanceSuccess = (currency) => {
  return {
    type: actions.GET_USER_WALLET_COMMUNITY_BALANCE_SUCCESS,
    currency,
  };
};

export const getUserWalletCommunityBalanceError = (error) => {
  return {
    type: actions.GET_USER_WALLET_COMMUNITY_BALANCE_ERROR,
    error,
  };
};
