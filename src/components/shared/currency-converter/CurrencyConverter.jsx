import React, { Component } from 'react';

import styles from './CurrencyConverter.css';

import Button from '../button';
import CurrencySelector from '../currency-selector';
import CurrencyInput from '../currency-input';

class CurrencyConverter extends Component {
  state = {
    activeFrom: this.props.fromCurrencies[0],
    activeTo: this.props.toCurrencies[1],
  };

  setActiveFromCurrency(selection) {
    this.setState({ activeFrom: selection });
  }

  setActiveToCurrency(selection) {
    this.setState({ activeTo: selection });
  }

  render() {
    const { activeFrom, activeTo } = this.state;

    return (
      <div className={styles.ConversionInputs}>
        <div className={styles.ConversionInput}>
          <CurrencyInput
            currency={activeFrom}
            renderLabel={(currency) => (
              <CurrencySelector
                isFrom
                selectHandler={(selection) =>
                  this.setActiveFromCurrency(selection)
                }
                defaultCurrency={currency}
                currencies={this.props.fromCurrencies.filter(
                  (currency) => currency.balance && currency.balance > 0,
                )}
              />
            )}
          />
        </div>
        <span className="visible-md">&rarr;</span>
        <div className={styles.ConversionInput}>
          <CurrencyInput
            currency={activeTo}
            renderLabel={(currency) => (
              <CurrencySelector
                selectHandler={(selection) =>
                  this.setActiveToCurrency(selection)
                }
                defaultCurrency={currency}
                currencies={this.props.toCurrencies.filter(
                  (curr) => curr.id !== activeFrom.id,
                )}
              />
            )}
          />
        </div>
        <Button
          content="&#8644; Convert"
          centered
          block
          theme="secondary"
          className={styles.ConversionButton}
        />
      </div>
    );
  }
}

export default CurrencyConverter;
