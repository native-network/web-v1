import React from 'react';

import styles from './CurrencyInput.css';

function CurrencyInput({ currency, renderLabel, ...rest }) {
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
        type="number"
        min="0"
        placeholder="Enter Amount"
        className={styles.Input}
      />
    </div>
  );
}

export default CurrencyInput;
