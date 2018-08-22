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
      const { priceInWei: sendPriceInWei } = sendCurrency;
      const { priceInWei: receivePriceInWei } = receiveCurrency;
      const valueInEth = computeValueToEth(value, sendPriceInWei);
      const receiveValue = bigNumber(valueInEth)
        .dividedBy(fromWei(receivePriceInWei))
        .toString();

      return value ? { receiveValue } : { receiveValue: '' };
    },
  },
  {
    field: 'receiveValue',
    updates: (value, name, allValues) => {
      const { sendCurrency, receiveCurrency } = allValues;
      const { priceInWei: sendPriceInWei } = sendCurrency;
      const { priceInWei: receivePriceInWei } = receiveCurrency;
      const valueInEth = computeValueToEth(value, receivePriceInWei);
      const sendValue = bigNumber(valueInEth)
        .dividedBy(fromWei(sendPriceInWei))
        .toString();

      return value ? { sendValue } : { sendValue: '' };
    },
  },
  {
    field: /Currency/,
    updates: (value, name, allValues) => {
      let valueInEth;
      const { priceInWei } = value;
      const {
        sendCurrency,
        sendValue,
        receiveCurrency,
        receiveValue,
      } = allValues;
      const isSend = /send/.test(name);

      if (isSend) {
        valueInEth = computeValueToEth(sendValue || 1, priceInWei);
        return sendValue
          ? {
              receiveValue: bigNumber(valueInEth)
                .dividedBy(fromWei(receiveCurrency.priceInWei))
                .toString(),
            }
          : {};
      } else {
        valueInEth = computeValueToEth(receiveValue || 1, priceInWei);
        return receiveValue
          ? {
              sendValue: bigNumber(valueInEth)
                .dividedBy(fromWei(sendCurrency.priceInWei))
                .toString(),
            }
          : {};
      }
    },
  },
);

class CurrencyConverter extends Component {
  handleSubmit(values) {
    const { sendCurrency, sendValue, receiveCurrency, receiveValue } = values;
    const { symbol: sendSymbol } = sendCurrency;
    const { symbol: receiveSymbol } = receiveCurrency;

    alert(
      JSON.stringify({
        send: { [sendSymbol]: sendValue },
        receive: { [receiveSymbol]: receiveValue },
      }),
    );
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
                return value > allValues.sendCurrency.balance
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
