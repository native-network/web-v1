import { allTribesActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';

export const getTribes = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_TRIBES });
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
    type: actions.GET_TRIBES_SUCCESS,
    tribes,
  };
};

export const getTribesError = (error) => {
  return {
    type: actions.GET_TRIBES_ERROR,
    error,
  };
};

export const addNewTribe = (tribe) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_TRIBE });
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
    type: actions.ADD_NEW_TRIBE_SUCCESS,
    tribe,
  };
};

export const addNewTribeError = (error) => {
  return {
    type: actions.ADD_NEW_TRIBE_ERROR,
    error,
  };
};
