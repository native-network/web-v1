import { Home } from '../../../src/views/home/Home';

describe('Home', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      getTribes: jest.fn(),
    };
    wrapper = buildComponent(Home, props);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render `Loader` on load', () => {
    wrapper = buildComponent(Home, { ...props, isLoading: true });
    const loader = wrapper.find('Loader');

    expect(loader).toHaveLength(1);
  });

  it('should render `CardList` on load completion', () => {
    let loader, list;
    wrapper = buildComponent(Home, { ...props, isLoading: true });
    loader = wrapper.find('Loader');

    expect(loader).toHaveLength(1);

    wrapper.setProps({ isLoading: false });

    list = wrapper.find('CardList');
    expect(list).toHaveLength(1);
  });

  it('should add tribes into `CardList`', () => {
    wrapper = buildComponent(Home, { ...props, tribes: [{}, {}] });
    const list = wrapper.find('CardList');

    expect(list.props().listItems).toHaveLength(2);
  });
});
