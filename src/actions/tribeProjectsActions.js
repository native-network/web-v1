import { tribeProjectsActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post, put } from '../requests';

export const getTribeProjects = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_TRIBE_PROJECTS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`tribes/${id}/projects`);

      return dispatch(getTribeProjectsSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(getTribeProjectsError(message));
    }
  };
};

export const getTribeProjectsSuccess = (projects) => {
  return {
    type: actions.GET_TRIBE_PROJECTS_SUCCESS,
    projects,
  };
};

export const getTribeProjectsError = (error) => {
  return {
    type: actions.GET_TRIBE_PROJECTS_ERROR,
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
