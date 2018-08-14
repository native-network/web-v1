import Hamburger from '../../../../src/components/shared/navigation/Hamburger';

describe('Hamburger', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = buildComponent(Hamburger, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
