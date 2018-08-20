import { allTribesActions as tribesActions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getCurrencyPriceByTribeId } from './currencyActions';
import { get, post } from '../requests';

export const getTribes = () => {
  return async (dispatch) => {
    dispatch({ type: tribesActions.GET_TRIBES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('tribes');

      (data || []).map((tribe) => dispatch(getCurrencyPriceByTribeId(tribe)));

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
      const { message } = err;
      return dispatch(addNewTribeError(message));
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

// export const getTokenContractByTribeId = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: tokenActions.GET_TOKEN_BY_TRIBE_ID });
//     dispatch(beginAjaxCall());

//     const service = getWeb3ServiceInstance();

//     // const account = await service.getMainAccount();

//     const tribe3 = new TribeWeb3(id, service);
//     await tribe3.initContracts();

//     return dispatch(
//       getTokenContractByTribeIdSuccess(
//         id,
//         await tribe3.smartTokenContractWS.methods.priceInWei().call(),
//       ),
//     );

//     // service.web3.eth
//     //   .sendTransaction({
//     //     from: account,
//     //     to: tribe3.tribe.tokenAddress,
//     //     value: '10000000000000000000',
//     //   })
//     //   .then(function(receipt) {
//     //     console.log(receipt);
//     //   });
//   };
// };

// export const getTokenContractByTribeIdSuccess = (tribeId, contract) => {
//   return {
//     type: tokenActions.GET_TOKEN_BY_TRIBE_ID_SUCCESS,
//     tribeId,
//     contract,
//   };
// };
