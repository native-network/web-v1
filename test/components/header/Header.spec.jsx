import Header from '../../../src/components/header/Header';

fdescribe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = buildComponent(Header);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
