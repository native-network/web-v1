import createDecorator from 'final-form-calculate';
import { BigNumber } from 'bignumber.js';
import { bigNumber, isPriceInWei } from '../../../utils/helpers';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const CurrencyConverterDecorator = createDecorator(
  {
    field: /Currency/,
    updates: {
      receiveValue: () => '',
      sendValue: () => '',
    },
  },
  {
    field: 'sendValue',
    updates: {
      receiveValue: (value, allValues) => {
        const { receiveCurrency } = allValues;
        const receivePrice = bigNumber(receiveCurrency.price);
        const valueBN = bigNumber(value || 0);
        if (value && valueBN.gt(0)) {
          return isPriceInWei(receiveCurrency)
            ? valueBN
                .dividedBy(fromWei(receivePrice.toString()))
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
        const receivePrice = bigNumber(receiveCurrency.price);
        const valueBN = bigNumber(value || 0);
        if (value && valueBN.gt(0)) {
          return isPriceInWei(receiveCurrency)
            ? valueBN
                .multipliedBy(fromWei(receivePrice.toString()))
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
