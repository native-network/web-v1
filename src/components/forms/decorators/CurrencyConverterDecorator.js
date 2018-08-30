import createDecorator from 'final-form-calculate';
import { BigNumber } from 'bignumber.js';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();
const { fromWei /* , toWei */ } = web3.utils;

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

const bigNumber = (n = 0) => new BigNumber(n);
const computeValueToEth = (v = 1, p) => bigNumber(v).multipliedBy(fromWei(p));

export const CurrencyConverterDecorator = createDecorator(
  {
    field: 'sendValue',
    updates: {
      receiveValue: (value, allValues) => {
        const { sendCurrency, receiveCurrency } = allValues;
        return convert(value, sendCurrency, receiveCurrency);
      },
    },
  },
  {
    field: 'receiveValue',
    updates: {
      sendValue: (value, allValues) => {
        const { sendCurrency, receiveCurrency } = allValues;
        return convert(value, receiveCurrency, sendCurrency);
      },
    },
  },
  {
    field: /Currency/,
    updates: (value, name, allValues) => {
      let valueInEth;
      const { priceInWei } = value;
      const {
        sendCurrency,
        sendValue,
        receiveCurrency,
        receiveValue,
      } = allValues;
      const isSend = /send/.test(name);

      if (isSend) {
        valueInEth = computeValueToEth(sendValue || 1, priceInWei);
        return sendValue
          ? {
              receiveValue: bigNumber(valueInEth)
                .dividedBy(fromWei(receiveCurrency.priceInWei))
                .toString(),
            }
          : {};
      } else {
        valueInEth = computeValueToEth(receiveValue || 1, priceInWei);
        return receiveValue
          ? {
              sendValue: bigNumber(valueInEth)
                .dividedBy(fromWei(sendCurrency.priceInWei))
                .toString(),
            }
          : {};
      }
    },
  },
);

function convert(value, initialCurrency, convertCurrency) {
  const valueBN = bigNumber(value);
  if (value && valueBN.gt(0)) {
    return valueBN
      .multipliedBy(initialCurrency.priceInWei)
      .dividedBy(convertCurrency.priceInWei)
      .toString();
  }
}
