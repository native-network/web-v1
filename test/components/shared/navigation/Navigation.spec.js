import Navigation from '../../../../src/components/shared/navigation';

describe('Navigation', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      user: {
        role: '',
        wallet: { address: '' },
      },
    };
    wrapper = buildComponent(Navigation, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('always renders a Hamburger', () => {
    const Hamburger = wrapper.find('Hamburger');
    expect(Hamburger).toHaveLength(1);
  });
});
