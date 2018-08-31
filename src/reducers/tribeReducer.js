import { tribeActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function tribeReducer(state = initialState.activeTribe, action) {
  switch (action.type) {
    case actions.GET_TRIBE_BY_ID_SUCCESS:
      return { ...state, tribe: action.tribe, error: '' };
    case actions.GET_TRIBE_BY_ID_ERROR:
      return { ...state, error: action.error };
    case actions.CLEAR_ACTIVE_TRIBE:
      return initialState;
    default:
      return state;
  }
}
