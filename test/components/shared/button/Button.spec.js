import Button from '../../../../src/components/shared/button';

describe('Button', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = buildComponent(Button, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
