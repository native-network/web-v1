import App from '../../src/components/App';

describe('App.js', () => {
  it('renders without crashing', () => {
    const wrapper = buildComponent(App);

    expect(wrapper).toHaveLength(1);
  });
});
