/* eslint-disable */
import React from 'react';

import styles from './CurrencyInput.css';

function CurrencyInput({ currency, renderLabel, ...rest }) {
  return (
    <div className={styles.CurrencyInput}>
      {renderLabel && (
        <label htmlFor={currency.id} className={styles.Label}>
          {renderLabel(currency)}
        </label>
      )}
      <input
        {...rest}
        step="0.01"
        id={currency.id}
        type="number"
        placeholder="Enter Amount"
        className={styles.Input}
      />
    </div>
  );
}

export default CurrencyInput;
