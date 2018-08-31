import CurrencyInput from '../../../../src/components/shared/currency-input';

describe('CurrencyInput', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      currency: {
        symbol: 'eth',
      },
    };
    wrapper = buildComponent(CurrencyInput, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render an input element', () => {
    const input = wrapper.find('input');
    expect(input).toHaveLength(1);
  });

  it('should assign `id` to `input` id', () => {
    const input = wrapper.find('input');

    expect(input.props().id).toEqual(0);
  });

  it('should call `renderLabel` when provided a `renderLabel` prop', () => {
    const renderLabel = jest.fn();
    props = { ...props, renderLabel };
    wrapper = buildComponent(CurrencyInput, props);

    expect(renderLabel).toHaveBeenCalled();
  });
});
