import { Home } from '../../../src/views/home/Home';

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = buildComponent(Home);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render `Loader` on load', () => {
    wrapper = buildComponent(Home, { isLoading: true });
    const loader = wrapper.find('Loader');

    expect(loader).toHaveLength(1);
  });

  it('should render `CardList` on load completion', () => {
    let loader, list;
    wrapper = buildComponent(Home, { isLoading: true });
    loader = wrapper.find('Loader');

    expect(loader).toHaveLength(1);

    wrapper.setProps({ isLoading: false });

    list = wrapper.find('CardList');
    expect(list).toHaveLength(1);
  });

  it('should add tribes into `CardList`', () => {
    wrapper = buildComponent(Home, { tribes: [{}, {}] });
    const list = wrapper.find('CardList');

    expect(list.props().listItems).toHaveLength(2);
  });

  it('should call `getTribes` on mount', () => {
    const getTribes = jest.fn();
    wrapper = buildComponent(Home, { getTribes, tribes: [] }, mount);

    expect(getTribes).toHaveBeenCalled();
  });
});
