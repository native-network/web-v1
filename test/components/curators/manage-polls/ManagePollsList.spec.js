import ManagePollsList from '../../../../src/components/curators/manage-polls/ManagePollsList';

describe('ManagePollsList', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      polls: [
        {
          votes: [],
        },
      ],
    };
    wrapper = buildComponent(ManagePollsList, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
