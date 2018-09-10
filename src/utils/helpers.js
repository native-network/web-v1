import BigNumber from 'bignumber.js';

export const bigNumber = (n = 0) => new BigNumber(n);

export const isPriceInWei = (currency) =>
  currency.symbol === 'ETH' || currency.symbol === 'NTV';

export const isEth = (currency) => currency.symbol === 'ETH';
