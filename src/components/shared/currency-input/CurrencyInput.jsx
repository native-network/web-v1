/* eslint-disable */
import React from 'react';

import styles from './CurrencyInput.css';

function CurrencyInput ({currency, renderLabel, ...rest}) {
  return (
    <div className={styles.CurrencyInput}>
      <label htmlFor={currency.id} className={styles.Label}>
        {renderLabel && renderLabel(currency)}
      </label>
      <input
        {...rest}
        id={currency.id}
        type="text"
        placeholder="Enter Amount"
        className={styles.Input}
      />
    </div>
  );
}

export default CurrencyInput;
