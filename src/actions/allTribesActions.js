import { allTribesActions as tribesActions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getCurrencyDataByTribe } from './currencyActions';
import { get, post } from '../requests';

export const getTribes = () => {
  return async (dispatch) => {
    dispatch({ type: tribesActions.GET_TRIBES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('tribes');

      dispatch(getTribesSuccess(data));
      return (data || []).map((tribe) =>
        dispatch(getCurrencyDataByTribe(tribe)),
      );
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
