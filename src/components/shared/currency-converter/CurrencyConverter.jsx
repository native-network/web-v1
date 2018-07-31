import React from 'react';

import styles from './CurrencyConverter.css';

import Button from '../button';

const currencies = [
  {
    id: 'ETH',
    thumb: 'http://placehold.it/50x50',
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
        <img src={currencies[0].thumb} alt="" />
        <label htmlFor="">
          <span>Pay with</span>
          {currencies[0].id}
        </label>
        <br />
        <input type="text" />
      </div>
      &rarr;
      <div className={styles.ConversionInput}>
        <img src={currencies[1].thumb} alt="" />
        <label htmlFor="">
          <span>Receive</span>
          {currencies[1].id}
        </label>
        <br />
        <input type="text" />
      </div>
      <Button content="&#8644; Convert" theme="secondary" />
    </div>
  );
}

export default CurrencyConverter;
