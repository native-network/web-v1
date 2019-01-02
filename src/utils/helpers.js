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
  return `$${
    Number(amt) === 0
      ? Number(amt)
      : numberWithCommas(parseFloat(amt || 0).toFixed(2))
  }`;
}

export function formatCrypto(amt = 0) {
  return bigNumber(amt)
    .decimalPlaces(3)
    .toString();
}

export function capitalizeFirstLetter(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export const uploadableField = (field) => {
  const portAppend = process.env.REACT_APP_API_PORT
    ? ':' + process.env.REACT_APP_API_PORT
    : '';
  return isUrl(field)
    ? field
    : process.env.REACT_APP_API_HOST +
        portAppend +
        '/community-assets/uploads/' +
        field;
};

export const isUrl = (test) => {
  const re = new RegExp(
    '[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)',
  );
  return re.test(test);
};

export function stringToDecimalPlaces(x, decimalPlaces) {
  if (x.indexOf('.') > -1) {
    const [before, after] = x.toString().split('.');
    return `${before}.${after.slice(0, decimalPlaces)}`;
  }
}
