import React, { Component } from 'react';

import styles from './CurrencyConverter.css';

import Button from '../button';
import CurrencySelector from '../currency-selector';
import CurrencyInput from '../currency-input';

class CurrencyConverter extends Component {
  state = {
    activeFrom: this.props.currencies[0],
    activeTo: this.props.currencies[1],
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
              <label
                htmlFor={currency.id}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <CurrencySelector
                  isFrom
                  selectHandler={(selection) =>
                    this.setActiveFromCurrency(selection)
                  }
                  defaultCurrency={currency}
                  currencies={this.props.currencies.filter(
                    (currency) => currency.balance && currency.balance > 0,
                  )}
                />
              </label>
            )}
          />
        </div>
        &rarr;
        <div className={styles.ConversionInput}>
          <CurrencyInput
            currency={activeTo}
            renderLabel={(currency) => (
              <label
                htmlFor={currency.id}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <CurrencySelector
                  selectHandler={(selection) =>
                    this.setActiveToCurrency(selection)
                  }
                  defaultCurrency={currency}
                  currencies={this.props.currencies.filter(
                    (curr) => curr.id !== activeFrom.id,
                  )}
                />
              </label>
            )}
          />
        </div>
        <Button content="&#8644; Convert" theme="secondary" />
      </div>
    );
  }
}

export default CurrencyConverter;
