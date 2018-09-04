import { currencyActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getUserWalletCommunityBalance } from './userWalletActions';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import { communityContractInstance } from '../utils/constants';

export const getCurrencyDataByCommunity = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_CURRENCY_DATA_BY_COMMUNITY });
    dispatch(beginAjaxCall());

    return communityContractInstance(community).then(({ community3 }) => {
      Promise.all([
        community3.getPrice(),
        community3.getSymbol(),
        community3.getTotalSupply(),
      ])
        .then((data) => {
          if (data) {
            const [price, symbol, totalSupply] = data;
            dispatch(
              getCurrencyDataByCommunitySuccess(community, {
                price,
                symbol,
                totalSupply,
              }),
            );
            return dispatch(getUserWalletCommunityBalance());
          }
        })
        .catch((err) => {
          const { message } = err;
          return dispatch(getCurrencyDataByCommunityError(message));
        });
    });
  };
};

export const getCurrencyDataByCommunitySuccess = (community, data) => {
  return {
    type: actions.GET_CURRENCY_DATA_BY_COMMUNITY_SUCCESS,
    community,
    data,
  };
};

export const getCurrencyDataByCommunityError = (error) => {
  return {
    type: actions.GET_CURRENCY_DATA_BY_COMMUNITY_ERROR,
    error,
  };
};

export const sendTransaction = (tokenAddress, transactionAmount) => {
  return async (dispatch) => {
    dispatch({ type: actions.SEND_TRANSACTION });
    dispatch(beginAjaxCall());

    try {
      const service = getWeb3ServiceInstance();
      const { toWei } = service.web3.utils;
      const account = await service.getMainAccount();

      service.web3.eth
        .sendTransaction({
          from: account,
          to: tokenAddress,
          value: toWei(transactionAmount),
        })
        .then((receipt) => {
          return dispatch(sendTransactionSuccess(receipt));
        })
        .catch((err) => {
          const { message } = err;
          return dispatch(sendTransactionError(message));
        });
    } catch (err) {
      const { message } = err;
      return dispatch(sendTransactionError(message));
    }
  };
};

export const sendTransactionSuccess = (receipt) => {
  return {
    type: actions.SEND_TRANSACTION_SUCCESS,
    receipt,
  };
};

export const sendTransactionError = (error) => {
  return {
    type: actions.SEND_TRANSACTION_ERROR,
    error,
  };
};
