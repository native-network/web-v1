import loadingReducer from '../../src/reducers/loadingReducer';
import {
  loadingActions as actions,
  allTribesActions,
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
      type: allTribesActions.GET_TRIBES_SUCCESS,
    });

    expect(reducedState).toEqual(0);
  });

  it('should decrement state for an error async action', () => {
    const reducedState = loadingReducer(1, {
      type: allTribesActions.GET_TRIBES_ERROR,
    });

    expect(reducedState).toEqual(0);
  });
});
