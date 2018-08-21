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
          const [price, symbol, totalSupply] = data;
          return dispatch(
            getCurrencyPriceByTribeIdSuccess(tribeId, {
              price,
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
