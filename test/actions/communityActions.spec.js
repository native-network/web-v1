import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { instance } from '../../src/requests';

import {
  loadingActions,
  communityActions,
} from '../../src/actions/actionTypes';

import {
  getCommunityById,
  clearActiveCommunity,
  getCommunityByIdSuccess,
  getCommunityByIdError,
} from '../../src/actions/communityActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('communityActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getCommunityById', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_COMMUNITY_BY_ID', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });
      await store.dispatch(getCommunityById(3));

      const actions = store.getActions();
      const expectedAction = { type: communityActions.GET_COMMUNITY_BY_ID };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `GET_COMMUNITY_BY_ID`', async () => {
      moxiosResponse({ status: 200 });

      await store.dispatch(getCommunityById(3));

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    it('should handle 3 actions', async () => {
      moxiosResponse({ status: 200 });

      await store.dispatch(getCommunityById(3));

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      let response;

      beforeEach(() => {
        response = {
          id: 3,
          name: 'Foo',
        };

        moxiosResponse({ status: 200, response });
      });

      it('should finally dispatch `GET_COMMUNITY_BY_ID_SUCCESS` on success', async () => {
        await store.dispatch(getCommunityById(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityActions.GET_COMMUNITY_BY_ID_SUCCESS,
          community: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('error response', () => {
      let response;

      beforeEach(() => {
        response = 'Something went wrong';
        moxiosResponse({ status: 400, response });
      });

      it('should finally dispatch `GET_COMMUNITY_BY_ID_ERROR` on error', async () => {
        await store.dispatch(getCommunityById(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityActions.GET_COMMUNITY_BY_ID_ERROR,
          error: new Error(response),
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('clearActiveCommunity', () => {
    it('should create `CLEAR_ACTIVE_COMMUNITY` action', () => {
      const expectedAction = {
        type: communityActions.CLEAR_ACTIVE_COMMUNITY,
      };

      expect(clearActiveCommunity()).toEqual(expectedAction);
    });
  });

  describe('getCommunityByIdSuccess', () => {
    it('should create `GET_COMMUNITY_BY_ID_SUCCESS` action with a given community', () => {
      const community = {
        id: 3,
        name: 'foo',
      };

      const expectedAction = {
        type: communityActions.GET_COMMUNITY_BY_ID_SUCCESS,
        community,
      };

      expect(getCommunityByIdSuccess(community)).toEqual(expectedAction);
    });
  });

  describe('getCommunityByIdError', () => {
    it('should create `GET_COMMUNITY_BY_ID_ERROR` action with a given error', () => {
      const error = 'Something went wrong';
      const expectedAction = {
        type: communityActions.GET_COMMUNITY_BY_ID_ERROR,
        error,
      };

      expect(getCommunityByIdError(error)).toEqual(expectedAction);
    });
  });
});
