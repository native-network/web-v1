import { Home } from '../../../src/views/home/Home';

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = buildComponent(Home);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
