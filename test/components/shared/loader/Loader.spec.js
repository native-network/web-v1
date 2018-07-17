import Loader from '../../../../src/components/shared/loader';

describe('Loader', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = buildComponent(Loader);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render 2 divs', () => {
    const divs = wrapper.find('div');

    expect(divs).toHaveLength(2);
  });
});
