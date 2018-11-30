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
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_NEW_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: [
          ...(state.tasks || []).map(
            (task) => (task.id === action.task.id ? action.task : task),
          ),
        ],
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
