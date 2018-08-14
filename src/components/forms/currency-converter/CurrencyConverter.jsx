/* eslint-disable */
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import styles from './CurrencyConverter.css';

import Button from '../../shared/button';
import CurrencySelector from '../../shared/currency-selector';
import CurrencyInput from '../../shared/currency-input';

class CurrencyConverter extends Component {
  state = {
    activeFrom: this.props.fromCurrencies[0],
    activeTo: this.props.toCurrencies[0],
  };

  setActiveFromCurrency(selection) {
    this.setState({ activeFrom: selection });
  }

  setActiveToCurrency(selection) {
    this.setState({ activeTo: selection });
  }

  handleSubmit(values) {
    const { fromCurrency, toCurrency } = values;
    alert(
      JSON.stringify({
        from: { [this.state.activeFrom.id]: fromCurrency },
        to: { [this.state.activeTo.id]: toCurrency },
      }),
    );
  }

  render() {
    const { activeFrom, activeTo } = this.state;
    const { fromCurrencies, toCurrencies } = this.props;
    const hasEnoughValue = (value) => this.state.activeFrom.balance >= value && value.length ? undefined : `You don't have enough currency`;

    return (
      <Form
        onSubmit={this.handleSubmit.bind(this)}
        className={styles.ConversionInputs}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="fromCurrency" validate={hasEnoughValue}>
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={activeFrom}
                    renderLabel={(currency) => (
                      <CurrencySelector
                        isFrom
                        selectHandler={(selection) =>
                          this.setActiveFromCurrency(selection)
                        }
                        defaultCurrency={currency}
                        currencies={fromCurrencies.filter(
                          (curr) => curr.id !== activeFrom.id,
                        )}
                      />
                    )}
                  />
                  {meta.error && meta.touched && <span className={styles.Error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <span className="visible-md">&rarr;</span>
            <Field name="toCurrency">
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={activeTo}
                    renderLabel={(currency) => (
                      <CurrencySelector
                        isFrom
                        selectHandler={(selection) =>
                          this.setActiveFromCurrency(selection)
                        }
                        defaultCurrency={currency}
                        currencies={toCurrencies.filter(
                          (curr) => curr && curr.id !== activeFrom.id,
                        )}
                      />
                    )}
                  />
                  {meta.error && meta.touched && <span className={styles.Error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Button
              content="&#8644; Convert"
              centered
              theme="secondary"
              type="submit"
              className={styles.ConversionButton}
            />
          </form>
        )}
      </Form>
    );
  }
}

export default CurrencyConverter;
