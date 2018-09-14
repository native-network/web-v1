import { currencyActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getWeb3ServiceInstance } from '../web3/Web3Service';

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
