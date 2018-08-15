import CurrencyConverter from '../../../../src/components/shared/currency-converter';

describe('CurrencyConverter', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = buildComponent(CurrencyConverter, props);
  });

  xit('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
