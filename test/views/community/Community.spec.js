import { Community } from '../../../src/views/community/Community';

describe('Community', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      id: 1,
      community: {
        name: 'Foo',
      },
      getCommunityById: jest.fn(),
      clearActiveCommunity: jest.fn(),
    };
    wrapper = buildComponent(Community, props);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('calls `getCommunityById` with props.id', () => {
    expect(props.getCommunityById).toHaveBeenCalledWith(1);
  });

  it('calls `clearActiveCommunity` on unmount', () => {
    wrapper = buildComponent(Community, props, mount);

    const instance = wrapper.instance();
    instance.panel = {
      panelHeight: 100,
    };

    wrapper.unmount();

    expect(props.clearActiveCommunity).toHaveBeenCalled();
  });
});
