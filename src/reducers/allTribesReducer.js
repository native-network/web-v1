import { allTribesActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function allTribesReducer(state = initialState.tribes, action) {
  switch (action.type) {
    case actions.GET_TRIBES_SUCCESS:
      return {
        ...state,
        tribes: action.tribes,
      };
    case actions.GET_TRIBES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_NEW_TRIBE_SUCCESS:
      return {
        ...state,
        tribes: [...state.tribes, action.tribe],
      };
    default:
      return state;
  }
}
