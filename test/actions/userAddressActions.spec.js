import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { instance } from '../../src/requests';
import { getAddress } from '../../src/web3.js';

jest.mock('../../src/web3.js', () => ({
  getAddress: jest.fn(),
}));

import {
  loadingActions,
  userAddressActions,
} from '../../src/actions/actionTypes';

import { getUserAddress } from '../../src/actions/userAddressActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userAddressActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getUserAddress', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_USER_ADDRESS', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getUserAddress());

      const actions = store.getActions();
      const expectedAction = { type: userAddressActions.GET_USER_ADDRESS };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `GET_USER_ADDRESS`', async () => {
      await store.dispatch(getUserAddress());

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    it('should handle 3 actions', async () => {
      await store.dispatch(getUserAddress());

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      beforeEach(() => getAddress.mockReturnValueOnce('foo'));

      it('should finally dispatch `GET_USER_ADDRESS_SUCCESS` on success', async () => {
        await store.dispatch(getUserAddress());
        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userAddressActions.GET_USER_ADDRESS_SUCCESS,
          address: 'foo',
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('error response', () => {
      beforeEach(() =>
        getAddress.mockReturnValue(Promise.reject({ message: 'foo' })));
      it('should finally dispatch `GET_USER_ADDRESS_ERROR` on error', async () => {
        await store.dispatch(getUserAddress());
        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userAddressActions.GET_USER_ADDRESS_ERROR,
          error: 'foo',
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });
});
