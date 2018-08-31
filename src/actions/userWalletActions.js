/* eslint-disable */
import { userWalletActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import {
  getAddress,
  getBalance,
  getWeb3ServiceInstance,
} from '../web3/Web3Service';
import { allTribeContractInstances } from '../utils/constants';

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
      console.log(address);
      dispatch(getUserWalletEthBalanceSuccess(fromWei(balance)));
      return dispatch(getUserWalletCommunityBalance(address));
    } catch (err) {
      const { message } = err;

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
    if (address) {
      const { tribes } = getState().tribes;
      const { currencies } = getState().currencies;
      dispatch({ type: actions.GET_USER_WALLET_COMMUNITY_BALANCE });
      dispatch(beginAjaxCall());
      try {
        const instances = await Promise.all(allTribeContractInstances(tribes))

        // Race condition, currencies may still be undefined
        instances.map(async ({id, tribe3}) => {
          console.log(currencies);
          const tribe = tribes.find(t => t.id === id);
          console.log(tribe, await tribe3.getTokenBalance(address))
        })
          // .then((tribeInstances) => {
          //   return tribeInstances.map(async ({id, tribe3}) => {
          //     const tribe = tribes.find((t) => t.id === id);
          //     const currency = currencies.find(c => c.tribeId === id);
          //     if (tribe && currency) {
          //       return {
          //         symbol: currency && currency.symbol,
          //         tribeId: id,
          //         iconUrl: tribe && tribe.icon,
          //         balance: await tribe3.getTokenBalance(address),
          //       };
          //     }
          //   }
          // )})
          // .then((data) =>
          //   data
          //     .map(async (balance) => {
          //       const b = await balance;
          //       if (b) console.log(b);
          //       return b ? getUserWalletCommunityBalanceSuccess(b) : null;
          //     })
          // );

        dispatch({type: actions.GET_USER_WALLET_COMMUNITY_BALANCE_SUCCESS})
      } catch (err) {
        const { message } = err;

        return dispatch(getUserWalletCommunityBalanceError(message));
      }
    }

  };
}

export const getUserWalletCommunityBalanceSuccess = (balance) => {
  console.log(balance);
  return {
    type: actions.GET_USER_WALLET_COMMUNITY_BALANCE_SUCCESS,
    balance
  }
}

export const getUserWalletCommunityBalanceError = (error) => {
  return {
    type: actions.GET_USER_WALLET_COMMUNITY_BALANCE_ERROR,
    error
  }
}
