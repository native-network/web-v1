import { communityProjectsActions as actions } from '../actions/actionTypes';

const initialState = {
  projects: [],
  error: '',
};

export default function communityProjectsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_COMMUNITY_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.projects,
      };
    case actions.GET_COMMUNITY_PROJECTS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.project],
      };
    case actions.ADD_NEW_PROJECT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project) => {
          return project.id === action.project.id ? action.project : project;
        }),
      };
    case actions.UPDATE_PROJECT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
