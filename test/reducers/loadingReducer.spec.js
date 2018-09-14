import loadingReducer from '../../src/reducers/loadingReducer';
import {
  loadingActions as actions,
  communitiesActions,
} from '../../src/actions/actionTypes';

const initialState = 0;

describe('loadingReducer', () => {
  it('should return the initial state', () => {
    const reducedState = loadingReducer(undefined, {});

    expect(reducedState).toEqual(initialState);
  });

  it('should increment state for `LOADING` action', () => {
    let reducedState = loadingReducer(initialState, {
      type: actions.LOADING,
    });

    expect(reducedState).toEqual(1);

    reducedState = loadingReducer(reducedState, {
      type: actions.LOADING,
    });

    expect(reducedState).toEqual(2);
  });

  it('should decrement state for a successful async action', () => {
    const reducedState = loadingReducer(1, {
      type: communitiesActions.GET_COMMUNITIES_SUCCESS,
    });

    expect(reducedState).toEqual(0);
  });

  it('should decrement state for an error async action', () => {
    const reducedState = loadingReducer(1, {
      type: communitiesActions.GET_COMMUNITIES_ERROR,
    });

    expect(reducedState).toEqual(0);
  });
});
