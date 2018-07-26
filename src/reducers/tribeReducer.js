import { tribeActions as actions } from '../actions/actionTypes';

const initialState = {
  tribe: {},
  error: '',
};

export default function tribeReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_TRIBE_BY_ID_SUCCESS:
      return { ...state, tribe: action.tribe, error: '' };
    case actions.GET_TRIBE_BY_ID_ERROR:
      return { ...state, tribe: {}, error: action.error };
    case actions.CLEAR_ACTIVE_TRIBE:
      return initialState;
    default:
      return state;
  }
}
