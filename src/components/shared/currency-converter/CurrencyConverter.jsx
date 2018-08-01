/* eslint-disable */
import React, { Component } from 'react';

import styles from './CurrencyConverter.css';

import Button from '../button';
import CurrencyInput from '../currency-input';

class CurrencyConverter extends Component {
  state = {
    fromCurrency: this.props.currencies[0],
    toCurrency: this.props.currencies[1],
  };

  render() {
    const { fromCurrency, toCurrency } = this.state;

    return (
      <div className={styles.ConversionInputs}>
        <div className={styles.ConversionInput}>
          <CurrencyInput
            currency={fromCurrency}
            renderLabel={(currency) => (
              <label
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <img src={currency.thumb} alt="" />
                <span>Pay with</span>
                {currency.id} &#9662;
                <ul
                  style={{
                    position: 'absolute',
                    top: '100%',
                    margin: 0,
                    padding: 0,
                    listStyleType: 'none',
                    background: '#bada55',
                  }}
                >
                  {this.props.currencies
                    .filter((curr) => curr.id !== currency.id)
                    .map((curr, i) => (
                      <li style={{ padding: '0.25rem 1rem' }} key={i}>
                        <img src={curr.thumb} alt=""/>{curr.id}
                      </li>
                    ))}
                </ul>
              </label>
            )}
          />
        </div>
        &rarr;
        <div className={styles.ConversionInput}>
          <CurrencyInput
            currency={toCurrency}
            renderLabel={(currency) => (
              (
                <label
                  htmlFor={currency.id}
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  <img src={currency.thumb} alt="" />
                  <span>Pay with</span>
                  {currency.id} &#9662;
                  <ul
                    style={{
                      position: 'absolute',
                      top: '100%',
                      margin: 0,
                      padding: 0,
                      listStyleType: 'none',
                      background: '#bada55',
                    }}
                  >
                    {this.props.currencies
                      .filter(
                        (curr) =>
                          curr.id !== currency.id && curr.id !== fromCurrency.id,
                      )
                      .map((curr, i) => (
                        <li style={{ padding: '0.25rem 1rem' }} key={i}>
                          <img src={curr.thumb} alt=""/>{curr.id}
                        </li>
                      ))}
                  </ul>
                </label>
              )
            )}
          />
        </div>
        <Button content="&#8644; Convert" theme="secondary" />
      </div>
    );
  }
}

export default CurrencyConverter;
