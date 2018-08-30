import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Field as Field5 } from 'react-final-form-html5-validation';

import styles from './CurrencyConverter.css';

import Button from '../../shared/button';
import CurrencySelector from '../../shared/currency-selector';
import CurrencyInput from '../../shared/currency-input';

import { CurrencyConverterDecorator } from '../decorators/CurrencyConverterDecorator';

class CurrencyConverter extends Component {
  handleSubmit(values) {
    const { sendValue, receiveCurrency } = values;
    const token = (this.props.receiveCurrencies || []).find(
      (t) => t.symbol === receiveCurrency.symbol,
    );
    const { tokenAddress } = token;

    this.props.submitHandler(tokenAddress, sendValue);
  }

  render() {
    const {
      sendCurrencies,
      receiveCurrencies,
      toValidation,
      defaultValues,
    } = this.props;

    return (
      <Form
        decorators={[CurrencyConverterDecorator]}
        initialValues={{
          sendCurrency: defaultValues.sendCurrency,
          sendValue: defaultValues.sendValue || '',
          receiveCurrency: defaultValues.receiveCurrency,
          receiveValue: defaultValues.receiveValue || '',
        }}
        onSubmit={this.handleSubmit.bind(this)}
        className={styles.ConversionInputs}
      >
        {({ handleSubmit, invalid, form }) => (
          <form className={styles.CurrencyForm} onSubmit={handleSubmit}>
            <Field5 name="sendValue">
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={form.getState().values.sendCurrency}
                    renderLabel={() => (
                      <Field
                        isFrom
                        component={CurrencySelector}
                        name="sendCurrency"
                        currencies={sendCurrencies}
                      />
                    )}
                  />
                  {meta.error &&
                    !!input.value && (
                      <span className={styles.Error}>{meta.error}</span>
                    )}
                </div>
              )}
            </Field5>
            <span className={`visible-md ${styles.Arrow}`}>&rarr;</span>
            <Field5 name="receiveValue" validate={toValidation}>
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={form.getState().values.receiveCurrency}
                    renderLabel={() => (
                      <Field
                        component={CurrencySelector}
                        name="receiveCurrency"
                        currencies={receiveCurrencies}
                      />
                    )}
                  />
                  {meta.error && (
                    <span className={styles.Error}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field5>
            <Button
              content="&#8644; Convert"
              centered
              disabled={invalid}
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
