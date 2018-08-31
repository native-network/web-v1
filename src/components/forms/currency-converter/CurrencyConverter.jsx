import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';

import { BigNumber } from 'bignumber.js';

import styles from './CurrencyConverter.css';

import Button from '../../shared/button';
import CurrencySelector from '../../shared/currency-selector';
import CurrencyInput from '../../shared/currency-input';

const bigNumber = (n = 0) => new BigNumber(n.toString());
const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;
const computeValueToEth = (v = 1, p) =>
  bigNumber(v)
    .multipliedBy(fromWei(p))
    .toString();

const decorator = createDecorator(
  {
    field: 'sendValue',
    updates: (value, name, allValues) => {
      const { sendCurrency, receiveCurrency } = allValues;
      const { price: sendPrice } = sendCurrency;
      const { price: receivePrice } = receiveCurrency;
      const valueInEth = computeValueToEth(value, sendPrice);
      const receiveValue = bigNumber(valueInEth)
        .dividedBy(fromWei(receivePrice))
        .toString();

      return value ? { receiveValue } : { receiveValue: '' };
    },
  },
  {
    field: 'receiveValue',
    updates: (value, name, allValues) => {
      const { sendCurrency, receiveCurrency } = allValues;
      const { price: sendPrice } = sendCurrency;
      const { price: receivePrice } = receiveCurrency;
      const valueInEth = computeValueToEth(value, receivePrice);
      const sendValue = bigNumber(valueInEth)
        .dividedBy(fromWei(sendPrice))
        .toString();

      return value ? { sendValue } : { sendValue: '' };
    },
  },
  {
    field: /Currency/,
    updates: (value, name, allValues) => {
      let valueInEth;
      const { price } = value;
      const {
        sendCurrency,
        sendValue,
        receiveCurrency,
        receiveValue,
      } = allValues;
      const isSend = /send/.test(name);

      if (isSend) {
        valueInEth = computeValueToEth(sendValue || 1, price);
        return sendValue
          ? {
              receiveValue: bigNumber(valueInEth)
                .dividedBy(fromWei(receiveCurrency.price))
                .toString(),
            }
          : {};
      } else {
        valueInEth = computeValueToEth(receiveValue || 1, price);
        return receiveValue
          ? {
              sendValue: bigNumber(valueInEth)
                .dividedBy(fromWei(sendCurrency.price))
                .toString(),
            }
          : {};
      }
    },
  },
);

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
        decorators={[decorator]}
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
            <Field
              name="sendValue"
              validate={(value, allValues) => {
                return value > parseInt(allValues.sendCurrency.balance)
                  ? `You don't have enough currency`
                  : undefined;
              }}
            >
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
            </Field>
            <span className={`visible-md ${styles.Arrow}`}>&rarr;</span>
            <Field name="receiveValue" validate={toValidation}>
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
            </Field>
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
