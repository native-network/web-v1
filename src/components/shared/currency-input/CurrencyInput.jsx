/* eslint-disable */
import React, { Fragment } from 'react';

import styles from './CurrencyInput.css';

function CurrencyInput({currency, renderLabel}) {

  return (
    <Fragment>
      {renderLabel && renderLabel(currency)}
      <input
        id={currency.id}
        type="text"
        placeholder="Enter Amount"
        className={styles.Input}
      />
    </Fragment>
  );
}

export default CurrencyInput;
