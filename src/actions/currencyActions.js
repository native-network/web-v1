import { currencyActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import CommunityWeb3 from '../web3/CommunityWeb3';

export const getCurrencyPriceByCommunityId = (communityId) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_CURRENCY_PRICE_BY_COMMUNITY_ID });
    dispatch(beginAjaxCall());

    try {
      const service = getWeb3ServiceInstance();
      const community3 = new CommunityWeb3(communityId, service);

      await community3.initContracts();

      return Promise.all([
        community3.smartTokenContractWS.methods.price().call(),
        community3.smartTokenContractWS.methods.symbol().call(),
        community3.smartTokenContractWS.methods.totalSupply().call(),
      ])
        .then((data) => {
          const [price, symbol, totalSupply] = data;
          return dispatch(
            getCurrencyPriceByCommunityIdSuccess(communityId, {
              price,
              symbol,
              totalSupply,
            }),
          );
        })
        .catch((err) => {
          const { message } = err;
          return dispatch(getCurrencyPriceByCommunityIdError(message));
        });
    } catch (err) {
      const { message } = err;
      return dispatch(getCurrencyPriceByCommunityIdError(message));
    }
  };
};

export const getCurrencyPriceByCommunityIdSuccess = (communityId, data) => {
  return {
    type: actions.GET_CURRENCY_PRICE_BY_COMMUNITY_ID_SUCCESS,
    community: communityId,
    data,
  };
};

export const getCurrencyPriceByCommunityIdError = (error) => {
  return {
    type: actions.GET_CURRENCY_PRICE_BY_COMMUNITY_ID_ERROR,
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
