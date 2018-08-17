/* eslint-disable */
import { allTribesActions as tribesActions, tokenActions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import TribeWeb3 from '../TribeWeb3';
import { getWeb3ServiceInstance } from '../Web3Service';

export const getTribes = () => {
  return async (dispatch) => {
    dispatch({ type: tribesActions.GET_TRIBES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('tribes');

      return dispatch(getTribesSuccess(data));
    } catch (err) {
      return dispatch(getTribesError(err));
    }
  };
};

export const getTribesSuccess = (tribes) => {
  return {
    type: tribesActions.GET_TRIBES_SUCCESS,
    tribes,
  };
};

export const getTribesError = (error) => {
  return {
    type: tribesActions.GET_TRIBES_ERROR,
    error,
  };
};

export const addNewTribe = (tribe) => {
  return async (dispatch) => {
    dispatch({ type: tribesActions.ADD_NEW_TRIBE });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post('tribes', tribe);

      return dispatch(addNewTribeSuccess(data));
    } catch (err) {
      return dispatch(addNewTribeError(err));
    }
  };
};

export const addNewTribeSuccess = (tribe) => {
  return {
    type: tribesActions.ADD_NEW_TRIBE_SUCCESS,
    tribe,
  };
};

export const addNewTribeError = (error) => {
  return {
    type: tribesActions.ADD_NEW_TRIBE_ERROR,
    error,
  };
};

export const getTokenContractByTribeId = (id) => {
  return async (dispatch) => {
    dispatch({ type: tokenActions.GET_TOKEN_BY_TRIBE_ID });

    const service = getWeb3ServiceInstance();

    const account = await service.getMainAccount();

    const tribe3 = new TribeWeb3(id, service);
    await tribe3.initContracts();
    const priceInWei = await tribe3.smartTokenContractWS.methods
      .priceInWei()
      .call();
    console.log(priceInWei);

    // service.web3.eth
    //   .sendTransaction({
    //     from: account,
    //     to: tribe3.tribe.tokenAddress,
    //     value: '10000000000000000000',
    //   })
    //   .then(function(receipt) {
    //     console.log(receipt);
    //   });
  };
};
