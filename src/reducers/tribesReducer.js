import { tribeActions as actions } from '../actions/actionTypes';

export default function tribesReducer(state = [], action) {
  switch (action.type) {
    case actions.GET_TRIBES_SUCCESS:

      return [...state, ...action.tribes];
    case actions.GET_TRIBES_ERROR:

      console.log(action.error);
      return state;
    default:
      return state;
  }
}
