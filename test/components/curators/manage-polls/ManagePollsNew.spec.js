import ManagePollsNew from '../../../../src/components/curators/manage-polls/ManagePollsNew';

describe('ManagePollsNew', () => {
  let wrapper;
  let props;
  let reduxState;

  beforeEach(() => {
    props = {};
    reduxState = {
      activeCommunity: {
        community: {
          id: 1,
        },
      },
      loading: false,
    };
    wrapper = buildConnectedComponent(ManagePollsNew, props, reduxState);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render `Loading` while props.isLoading is true', () => {
    props = {};
    reduxState = {
      activeCommunity: {
        community: {
          id: 1,
        },
      },
      loading: true,
    };
    wrapper = buildConnectedComponent(ManagePollsNew, props, reduxState);
    const loader = wrapper.find('Loader');
    expect(loader).toHaveLength(1);
  });

  it('should not render `Loading` while props.isLoading is false', () => {
    props = {};
    reduxState = {
      activeCommunity: {
        community: {
          id: 1,
        },
      },
      loading: false,
    };
    wrapper = buildConnectedComponent(ManagePollsNew, props, reduxState);
    const loader = wrapper.find('Loader');
    expect(loader).toHaveLength(0);
  });
});
