import createDecorator from 'final-form-calculate';
import { BigNumber } from 'bignumber.js';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';
import { bigNumber, isPriceInWei } from '../../../utils/helpers';

const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const CurrencyConverterDecorator = createDecorator(
  {
    field: 'sendValue',
    updates: {
      receiveValue: (value, allValues) => {
        const { receiveCurrency } = allValues;
        const valueBN = bigNumber(value || 0);
        if (value && valueBN.gt(0)) {
          return isPriceInWei(receiveCurrency)
            ? valueBN
                .dividedBy(fromWei(receiveCurrency.price))
                .decimalPlaces(18)
                .toString()
            : valueBN
                .multipliedBy(receiveCurrency.price)
                .decimalPlaces(18)
                .toString();
        }
      },
    },
  },
  {
    field: 'receiveValue',
    updates: {
      sendValue: (value, allValues) => {
        const { receiveCurrency } = allValues;
        const valueBN = bigNumber(value || 0);
        if (value && valueBN.gt(0)) {
          return isPriceInWei(receiveCurrency)
            ? valueBN
                .multipliedBy(fromWei(receiveCurrency.price))
                .decimalPlaces(18)
                .toString()
            : valueBN
                .dividedBy(receiveCurrency.price)
                .decimalPlaces(18)
                .toString();
        }
      },
    },
  },
);
