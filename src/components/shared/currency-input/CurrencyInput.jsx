import React from 'react';

import styles from './CurrencyInput.css';

function CurrencyInput({ currency, renderLabel, ...rest }) {
  const sanitize = (e) => {
    let { value } = e.target;
    if (value === '.') {
      value = '0.';
    }
    e.target.value = value
      .replace(/[^0-9.]/g, '')
      .replace(/^([^.]*\.)(.*)$/, (a, b, c) => {
        // only allow one period
        return b + c.replace(/\./g, '');
      });
    rest.onChange(e);
  };
  return currency ? (
    <div className={styles.CurrencyInput}>
      {renderLabel && (
        <label htmlFor={currency.symbol} className={styles.Label}>
          {renderLabel(currency)}
        </label>
      )}
      <input
        {...rest}
        step="any"
        id={currency.symbol}
        type="text"
        onChange={sanitize}
        min="0"
        placeholder="Enter Amount"
        className={styles.Input}
      />
    </div>
  ) : null;
}

export default CurrencyInput;
