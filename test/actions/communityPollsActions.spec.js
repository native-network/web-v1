import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { instance } from '../../src/requests';

import {
  communityPollsActions,
  loadingActions,
} from '../../src/actions/actionTypes';

import {
  getCommunityPolls,
  addNewPoll,
} from '../../src/actions/communityPollsActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('communityPollsActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getCommunityPolls', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_COMMUNITY_POLLS', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getCommunityPolls());

      const actions = store.getActions();
      const expectedAction = {
        type: communityPollsActions.GET_COMMUNITY_POLLS,
      };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `GET_COMMUNITY_POLLS`', async () => {
      moxiosResponse({ status: 200 });

      await store.dispatch(getCommunityPolls());

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    describe('success response', () => {
      let response;
      beforeEach(() => {
        response = {
          data: {
            polls: [],
          },
        };
        moxiosResponse({ status: 200, response });
      });

      it('should finally dispatch `GET_COMMUNITY_POLLS_SUCCESS` after `GET_COMMUNITY_POLLS`', async () => {
        await store.dispatch(getCommunityPolls(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityPollsActions.GET_COMMUNITY_POLLS_SUCCESS,
          polls: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('Error response', () => {
      beforeEach(() => {
        moxiosResponse({ status: 400 });
      });

      it('should finally dispatch `GET_COMMUNITY_POLLS_ERROR` after `GET_COMMUNITY_POLLS` error', async () => {
        await store.dispatch(getCommunityPolls(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityPollsActions.GET_COMMUNITY_POLLS_ERROR,
          error: '',
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('addNewPoll', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `ADD_NEW_POLL`', async () => {
      const response = {};
      moxiosResponse({ status: 200, response });

      await store.dispatch(addNewPoll(3));

      const actions = store.getActions();
      const firstAction = actions[0];
      const expectedAction = {
        type: communityPollsActions.ADD_NEW_POLL,
      };

      expect(firstAction).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after addNewPoll', async () => {
      const response = {};
      moxiosResponse({ status: 200, response });

      await store.dispatch(addNewPoll(3));

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    it('should dispatch `ADD_NEW_POLL_SUCCESS` on success of addNewPoll', async () => {
      const response = {};
      moxiosResponse({ status: 200, response });

      await store.dispatch(addNewPoll(3));

      const expectedAction = {
        type: communityPollsActions.ADD_NEW_POLL_SUCCESS,
        poll: response,
      };

      const actions = store.getActions();
      const lastAction = actions[actions.length - 1];
      expect(lastAction).toEqual(expectedAction);
    });

    it('should dispatch `ADD_NEW_POLL_ERROR` on error of addNewPoll', async () => {
      moxiosResponse({ status: 400 });

      await store.dispatch(addNewPoll(3));

      const expectedAction = {
        type: communityPollsActions.ADD_NEW_POLL_ERROR,
        error: '',
      };

      const actions = store.getActions();
      const lastAction = actions[actions.length - 1];
      expect(lastAction).toEqual(expectedAction);
    });
  });
});
