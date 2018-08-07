/* eslint-disable */
import {allTribesActions as actions} from '../actions/actionTypes';

const initialState = {
  tribes: [],
  error: '',
};

export default function allTribesReducer (state = initialState, action) {
  switch (action.type) {
    case actions.GET_TRIBES_SUCCESS:
      return {
        ...state,
        tribes: action.tribes,
      };
    case actions.GET_TRIBES_ERROR:
      return {
        ...initialState,
        tribes: [],
        error: action.error,
      };
    case actions.ADD_NEW_TRIBE_SUCCESS:
      console.log (action);

      return {
        ...state,
        tribes: [...state.tribes, action.tribe],
      };
    default:
      return state;
  }
}
