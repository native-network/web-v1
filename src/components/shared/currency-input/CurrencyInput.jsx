import React from 'react';

import styles from './CurrencyInput.css';

function CurrencyInput({ currency, renderLabel, ...rest }) {
  const sanitize = (e) => {
    if (e.target.value === '.') {
      e.target.value = '0.';
    }
    e.target.value = e.target.value.replace(/[^0-9\.]/g, ''); // eslint-disable-line
    rest.onChange(e);
  };
  return (
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
  );
}

export default CurrencyInput;
