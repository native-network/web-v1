import { communityTasksActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function communityTasksReducer(
  state = initialState.tasks,
  action,
) {
  switch (action.type) {
    case actions.GET_COMMUNITY_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.tasks,
      };
    case actions.GET_COMMUNITY_TASKS_ERROR:
    case actions.APPROVE_TASK_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_NEW_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case actions.UPDATE_TASK:
    case actions.APPROVE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [
          ...(state.tasks || []).map(
            (task) => (task.id === action.task.id ? action.task : task),
          ),
        ],
      };
    case actions.UPDATE_TASK_ISSUE:
      return {
        ...state,
        error: action.error,
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
