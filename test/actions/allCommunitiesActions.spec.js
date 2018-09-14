import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { instance } from '../../src/requests';

import {
  loadingActions,
  communitiesActions,
} from '../../src/actions/actionTypes';

import {
  getCommunities,
  getCommunitiesSuccess,
  getCommunitiesError,
  addNewCommunity,
} from '../../src/actions/communitiesActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('communitiesActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getCommunities', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_COMMUNITIES`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getCommunities());

      const actions = store.getActions();
      const expectedActions = { type: communitiesActions.GET_COMMUNITIES };

      expect(actions[0]).toEqual(expectedActions);
    });

    it('should dispatch `LOADING` after `GET_COMMUNITIES`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getCommunities());

      const actions = store.getActions();
      const expectedActions = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedActions);
    });

    it('should handle 3 actions', async () => {
      moxiosResponse({ status: 200 });

      await store.dispatch(getCommunities());

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      let response;

      beforeEach(() => {
        response = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
        moxiosResponse({ status: 200, response });
      });

      it('should finally dispatch `GET_COMMUNITIES_SUCCESS` on success', async () => {
        await store.dispatch(getCommunities());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communitiesActions.GET_COMMUNITIES_SUCCESS,
          communities: response,
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

      it('should finally dispatch `GET_COMMUNITIES_ERROR` on error', async () => {
        await store.dispatch(getCommunities());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communitiesActions.GET_COMMUNITIES_ERROR,
          error: new Error(response),
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('getCommunitiesSuccess', () => {
    it('should create `GET_COMMUNITIES_SUCCESS` action with given communities', () => {
      const communities = [{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }];
      const expectedAction = {
        type: communitiesActions.GET_COMMUNITIES_SUCCESS,
        communities,
      };

      expect(getCommunitiesSuccess(communities)).toEqual(expectedAction);
    });
  });

  describe('getCommunitiesError', () => {
    it('should create `GET_COMMUNITIES_ERROR` action with an error message', () => {
      const error = 'Something went wrong';
      const expectedAction = {
        type: communitiesActions.GET_COMMUNITIES_ERROR,
        error,
      };

      expect(getCommunitiesError(error)).toEqual(expectedAction);
    });
  });

  describe('addNewCommunity', () => {
    let community;

    beforeEach(
      () => (community = { name: 'Foo', id: 3 }),
      moxios.install(instance),
    );
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `ADD_NEW_COMMUNITY`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(addNewCommunity(community));

      const actions = store.getActions();
      const expectedAction = { type: communitiesActions.ADD_NEW_COMMUNITY };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `ADD_NEW_COMMUNITY`', async () => {
      moxiosResponse({ status: 200 });

      await store.dispatch(addNewCommunity(community));

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    it('should handle 3 actions', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(addNewCommunity(community));

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      let response;

      beforeEach(() => {
        response = community;
        moxiosResponse({ status: 200, response });
      });

      it('should finally dispatch `ADD_NEW_COMMUNITY_SUCCESS` on success', async () => {
        await store.dispatch(addNewCommunity(community));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communitiesActions.ADD_NEW_COMMUNITY_SUCCESS,
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

      it('should finally dispatch `ADD_NEW_COMMUNITY_ERROR` on error', async () => {
        await store.dispatch(addNewCommunity(community));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communitiesActions.ADD_NEW_COMMUNITY_ERROR,
          error: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });
});
