import communityReducer from '../../src/reducers/communityReducer';
import { communityActions as actions } from '../../src/actions/actionTypes';

const initialState = {
  community: {},
  error: '',
};

describe('communityReducer', () => {
  it('should return the initial state', () => {
    const reducedState = communityReducer(undefined, {});

    expect(reducedState).toEqual(initialState);
  });

  it('should add an active community to state for `GET_COMMUNITY_BY_ID_SUCCESS`', () => {
    const community = {
      id: 3,
      name: 'Foo',
    };
    const reducedState = communityReducer(initialState, {
      type: actions.GET_COMMUNITY_BY_ID_SUCCESS,
      community,
    });

    expect(reducedState).toEqual({
      ...initialState,
      community,
    });
  });

  it('should add an error to state for `GET_COMMUNITY_BY_ID_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = communityReducer(initialState, {
      type: actions.GET_COMMUNITY_BY_ID_ERROR,
      error,
    });

    expect(reducedState).toEqual({
      ...initialState,
      error,
    });
  });

  it('should remove the active community for `CLEAR_ACTIVE_COMMUNITY`', () => {
    const newState = { ...initialState, community: { name: 'foo' } };
    const reducedState = communityReducer(newState, {
      type: actions.CLEAR_ACTIVE_COMMUNITY,
    });

    expect(reducedState).toEqual(initialState);
  });
});
