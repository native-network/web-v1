import CurrencyInput from '../../../../src/components/shared/currency-input';

describe('CurrencyInput', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = buildComponent(CurrencyInput);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
