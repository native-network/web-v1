import Header from '../../../../src/components/shared/header';

describe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = buildComponent(Header);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
