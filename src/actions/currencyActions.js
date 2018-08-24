import { currencyActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import TribeWeb3 from '../web3/TribeWeb3';

export const getCurrencyPriceByTribeId = (tribeId) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_CURRENCY_PRICE_BY_TRIBE_ID });
    dispatch(beginAjaxCall());

    try {
      const service = getWeb3ServiceInstance();
      const tribe3 = new TribeWeb3(tribeId, service);

      await tribe3.initContracts();

      return Promise.all([
        tribe3.smartTokenContractWS.methods.priceInWei().call(),
        tribe3.smartTokenContractWS.methods.symbol().call(),
        tribe3.smartTokenContractWS.methods.totalSupply().call(),
      ])
        .then((data) => {
          const [priceInWei, symbol, totalSupply] = data;
          return dispatch(
            getCurrencyPriceByTribeIdSuccess(tribeId, {
              priceInWei,
              symbol,
              totalSupply,
            }),
          );
        })
        .catch((err) => {
          const { message } = err;
          return dispatch(getCurrencyPriceByTribeIdError(message));
        });
    } catch (err) {
      const { message } = err;
      return dispatch(getCurrencyPriceByTribeIdError(message));
    }
  };
};

export const getCurrencyPriceByTribeIdSuccess = (tribeId, data) => {
  return {
    type: actions.GET_CURRENCY_PRICE_BY_TRIBE_ID_SUCCESS,
    tribe: tribeId,
    data,
  };
};

export const getCurrencyPriceByTribeIdError = (error) => {
  return {
    type: actions.GET_CURRENCY_PRICE_BY_TRIBE_ID_ERROR,
    error,
  };
};

export const sendTransaction = (tribe, transactionAmount) => {
  return async (dispatch) => {
    dispatch({ type: actions.SEND_TRANSACTION });
    dispatch(beginAjaxCall());

    try {
      const service = getWeb3ServiceInstance();
      const { toWei } = service.web3.utils;
      const account = await service.getMainAccount();
      const tribe3 = new TribeWeb3(tribe, service);

      await tribe3.initContracts();

      service.web3.eth
        .sendTransaction({
          from: account,
          to: tribe3.tribe.tokenAddress,
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
