import BigNumber from 'bignumber.js';

export const bigNumber = (n = 0) => new BigNumber(n);

export const isPriceInWei = (currency) =>
  currency.symbol === 'ETH' || currency.symbol === 'NTV';

export const isEth = (currency) => currency.symbol === 'ETH';

export function numberWithCommas(x = 0) {
  if (x.toString().indexOf('.') > -1) {
    const before = x.toString().split('.')[0];
    const after = x.toString().split('.')[1];
    return `${before
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${after}`;
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function formatUsd(amt = 0) {
  if (Number(amt) === 0) {
    return Number(amt);
  }
  return '$' + numberWithCommas(parseFloat(amt || 0).toFixed(2));
}

export function formatCrypto(amt = 0) {
  return bigNumber(amt)
    .decimalPlaces(3)
    .toString();
}
