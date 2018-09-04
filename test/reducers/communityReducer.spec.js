import communityReducer from '../../src/reducers/communityReducer';
import { communityActions as actions } from '../../src/actions/actionTypes';
import { initialState } from '../../src/reducers/initialState';
const initialCommunityState = initialState.activeCommunity;

describe('communityReducer', () => {
  it('should return the initial state', () => {
    const reducedState = communityReducer(undefined, {});
    expect(reducedState).toEqual(initialCommunityState);
  });

  it('should add an active community to state for `GET_COMMUNITY_BY_ID_SUCCESS`', () => {
    const community = {
      id: 3,
      name: 'Foo',
    };
    const reducedState = communityReducer(initialCommunityState, {
      type: actions.GET_COMMUNITY_BY_ID_SUCCESS,
      community,
    });

    expect(reducedState).toEqual({
      ...initialCommunityState,
      community,
    });
  });

  it('should add an error to state for `GET_COMMUNITY_BY_ID_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = communityReducer(initialCommunityState, {
      type: actions.GET_COMMUNITY_BY_ID_ERROR,
      error,
    });
    expect(reducedState).toEqual({
      ...initialCommunityState,
      error,
    });
  });

  it('should remove the active community for `CLEAR_ACTIVE_COMMUNITY`', () => {
    const newState = {
      ...initialState.activeCommunity,
      community: { name: 'foo' },
    };
    const reducedState = communityReducer(newState, {
      type: actions.CLEAR_ACTIVE_COMMUNITY,
    });

    expect(reducedState).toEqual(initialState);
  });
});
