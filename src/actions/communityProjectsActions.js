import { communityProjectsActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post, put } from '../requests';
import { toastrError } from './toastrActions';

export const getCommunityProjects = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_PROJECTS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`communities/${id}/projects`);

      return dispatch(getCommunityProjectsSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(getCommunityProjectsError(message));
    }
  };
};

export const getCommunityProjectsSuccess = (projects) => {
  return {
    type: actions.GET_COMMUNITY_PROJECTS_SUCCESS,
    projects,
  };
};

export const getCommunityProjectsError = (error) => {
  return {
    type: actions.GET_COMMUNITY_PROJECTS_ERROR,
    error,
  };
};

export const addNewProject = (project) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_PROJECT });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post('projects', project);

      return dispatch(addNewProjectSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(addNewProjectError(message));
    }
  };
};

export const addNewProjectSuccess = (project) => {
  return {
    type: actions.ADD_NEW_PROJECT_SUCCESS,
    project,
  };
};

export const addNewProjectError = (error) => {
  return {
    type: actions.ADD_NEW_PROJECT_ERROR,
    error,
  };
};

export const updateProject = (projectId, update) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PROJECT });
    dispatch(beginAjaxCall());

    try {
      const { data } = await put(`projects/${projectId}`, update);

      return dispatch(updateProjectSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(updateProjectError(message));
    }
  };
};

export const updateProjectSuccess = (project) => {
  return {
    type: actions.UPDATE_PROJECT_SUCCESS,
    project,
  };
};

export const updateProjectError = (error) => {
  return {
    type: actions.UPDATE_PROJECT_ERROR,
    error,
  };
};
