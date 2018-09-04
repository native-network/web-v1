import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { instance } from '../../src/requests';
// import { getAddress } from '../../src/web3/Web3Service';

import {
  loadingActions,
  userWalletActions,
} from '../../src/actions/actionTypes';

import { getUserWalletAddress } from '../../src/actions/userWalletActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userWalletActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getUserWalletAddress', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_USER_WALLET_ADDRESS', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getUserWalletAddress());

      const actions = store.getActions();
      const expectedAction = {
        type: userWalletActions.GET_USER_WALLET_ADDRESS,
      };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `GET_USER_WALLET_ADDRESS`', async () => {
      await store.dispatch(getUserWalletAddress());

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    it('should handle 6 actions', async () => {
      await store.dispatch(getUserWalletAddress());

      const actions = store.getActions();

      expect(actions).toHaveLength(6);
    });

    describe('success response', () => {
      // beforeEach(() => getAddress.mockReturnValueOnce('foo'));

      it('should finally dispatch `GET_USER_WALLET_ADDRESS_SUCCESS` on success', async () => {
        await store.dispatch(getUserWalletAddress());
        const actions = store.getActions();
        const lastAction = actions[2];
        const expectedAction = {
          type: userWalletActions.GET_USER_WALLET_ADDRESS_SUCCESS,
          address: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
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

      // TODO: I'm not sure how to stub getAccounts within the web3serviceMock
      // correctly, so this test returns a 200 even with moxios
      xit('should finally dispatch `GET_USER_WALLET_ADDRESS_ERROR` on error', async () => {
        await store.dispatch(getUserWalletAddress());
        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userWalletActions.GET_USER_WALLET_ADDRESS_ERROR,
          error: new Error(response),
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });
});
