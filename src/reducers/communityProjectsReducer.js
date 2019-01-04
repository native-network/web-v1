import { communityProjectsActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function communityProjectsReducer(
  state = initialState.projects,
  action,
) {
  switch (action.type) {
    case actions.GET_COMMUNITY_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.projects,
      };
    case actions.ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case actions.GET_COMMUNITY_PROJECTS_ERROR:
    case actions.ADD_NEW_PROJECT_ERROR:
    case actions.VOTE_ON_PROJECT_ISSUE:
    case actions.ADD_PROJECT_POLL_ISSUE:
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_PROJECT_POLL:
      return {
        ...state,
        projects: state.projects.map(
          (project) =>
            action.projectId === project.id
              ? { ...project, poll: action.poll }
              : project,
        ),
      };
    case actions.UPDATE_PROJECT:
      return {
        ...state,
        projects: [
          ...(state.projects || []).map(
            (project) =>
              project.id === action.project.id ? action.project : project,
          ),
        ],
      };
    default:
      return state;
  }
}
