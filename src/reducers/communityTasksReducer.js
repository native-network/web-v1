import { communityTasksActions as actions } from '../actions/actionTypes';

const initialState = {
  tasks: [],
  error: '',
};

export default function communityTasksReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_COMMUNITY_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case actions.GET_COMMUNITY_TASKS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_NEW_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case actions.ADD_NEW_TASK_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
