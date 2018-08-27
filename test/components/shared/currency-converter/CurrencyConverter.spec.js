import CurrencyConverter from '../../../../src/components/forms/currency-converter';

describe('CurrencyConverter', () => {
  let wrapper;

  let props;

  beforeEach(() => {
    props = {
      sendCurrencies: [{}, {}],
      receiveCurrencies: [{}, {}],
    };
    wrapper = buildComponent(CurrencyConverter, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
