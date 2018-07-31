import React from 'react';

import styles from './CurrencyConverter.css';

import eth from '../../../assets/img/eth.svg';
import native from '../../../assets/img/native.svg';

import Button from '../button';
import CurrencyInput from '../currency-input';

const currencies = [
  {
    id: 'ETH',
    thumb: eth,
  },
  {
    id: 'NT',
    thumb: native,
  },
  {
    id: 'EGTT',
    thumb: 'http://placehold.it/50x50',
  },
  {
    id: 'CCTT',
    thumb: 'http://placehold.it/50x50',
  },
  {
    id: 'IFTT',
    thumb: 'http://placehold.it/50x50',
  },
];

function CurrencyConverter() {
  return (
    <div className={styles.ConversionInputs}>
      <div className={styles.ConversionInput}>
        <CurrencyInput
          currency={currencies[0]}
          renderLabel={(currency) => (
            <label htmlFor={currency.id}>
              <img src={currency.thumb} alt="" />
              <span>Pay with</span>
              {currency.id} &#9662;
              <ul>
                {currencies
                  .filter((curr) => curr.id !== currency.id)
                  .map((curr, i) => <li key={i}>{curr.id}</li>)}
              </ul>
            </label>
          )}
        />
      </div>
      &rarr;
      <div className={styles.ConversionInput}>
        <CurrencyInput
          currency={currencies[1]}
          renderLabel={(currency) => (
            <label htmlFor={currency.id}>
              <img src={currency.thumb} alt="" />
              <span>Pay with</span>
              {currency.id} &#9662;
            </label>
          )}
        />
      </div>
      <Button content="&#8644; Convert" theme="secondary" />
    </div>
  );
}

export default CurrencyConverter;
