import ManagePolls from '../../../../src/components/curators/manage-polls';

describe('ManagePolls', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      items: [],
    };
    wrapper = buildComponent(ManagePolls, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a `ManagePollsNew` component', () => {
    const ManagePollsNew = wrapper.find('ManagePollsNew');
    expect(ManagePollsNew).toBeTruthy();
  });
});
