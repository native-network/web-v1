/* eslint-disable */
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
const { fromWei, toWei } = web3.utils;
const computeValueToEth = (v = 1, p) =>
  bigNumber(v)
    .multipliedBy(fromWei(p))
    .toString();

const decorator = createDecorator(
  {
    field: 'sendValue',
    updates: {
      receiveValue: (value, allValues) => {
        const { sendCurrency, receiveCurrency } = allValues;
        const { priceInWei: sendPriceInWei } = sendCurrency;
        const { priceInWei: receivePriceInWei } = receiveCurrency;
        if (typeof value === 'object') {
          console.log(value.dividedBy(receivePriceInWei).toString());
        }
        console.log(receivePriceInWei);
        return typeof value === 'object' ? value.dividedBy(receivePriceInWei) : '';
      }
    }
  },
  // {
  //   field: /Value/,
  //   updates: (value, name, allValues) => {
  //     console.log(name, typeof value);
  //     const isSend = /send/.test(name);

  //     if (isSend) {

  //     } else {

  //     }
  //     // const { sendCurrency, receiveCurrency } = allValues;
  //     // const { priceInWei: sendPriceInWei } = sendCurrency;
  //     // const { priceInWei: receivePriceInWei } = receiveCurrency;
  //     // const valueInEth = computeValueToEth(value, sendPriceInWei);
  //     // const receiveValue = bigNumber(valueInEth)
  //     //   .dividedBy(fromWei(receivePriceInWei));

  //     // return value ? { receiveValue } : { receiveValue: '' };
  //     return {};
  //   },
  // },
  // {
  //   field: 'receiveValue',
  //   updates: (value, name, allValues) => {

  //     console.log(name, typeof value);
  //     // const { sendCurrency, receiveCurrency } = allValues;
  //     // const { priceInWei: sendPriceInWei } = sendCurrency;
  //     // const { priceInWei: receivePriceInWei } = receiveCurrency;
  //     // const valueInEth = computeValueToEth(value, receivePriceInWei);
  //     // const sendValue = bigNumber(valueInEth)
  //     //   .dividedBy(fromWei(sendPriceInWei));

  //     // return value ? { sendValue } : { sendValue: '' };
  //     return {};
  //   },
  // },
  // {
  //   field: /Currency/,
  //   updates: (value, name, allValues) => {
  //     let valueInEth;
  //     const { priceInWei } = value;
  //     const {
  //       sendCurrency,
  //       sendValue,
  //       receiveCurrency,
  //       receiveValue,
  //     } = allValues;
  //     const isSend = /send/.test(name);

  //     if (isSend) {
  //       valueInEth = computeValueToEth(sendValue || 1, priceInWei);
  //       return sendValue
  //         ? {
  //             receiveValue: bigNumber(valueInEth)
  //               .dividedBy(fromWei(receiveCurrency.priceInWei))
  //               .toString(),
  //           }
  //         : {};
  //     } else {
  //       valueInEth = computeValueToEth(receiveValue || 1, priceInWei);
  //       return receiveValue
  //         ? {
  //             sendValue: bigNumber(valueInEth)
  //               .dividedBy(fromWei(sendCurrency.priceInWei))
  //               .toString(),
  //           }
  //         : {};
  //     }
  //   },
  // },
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
        {({ handleSubmit, invalid, form, values }) => {
          const formState = form.getState();
          console.log(values);
          return (
            <form className={styles.CurrencyForm} onSubmit={handleSubmit}>
              <Field
                name="sendValue"
                parse={(value) => (value ? bigNumber(value).multipliedBy(values.sendCurrency.priceInWei) : '')}
                format={(value) => {
                  console.log(fromWei(value.toString()))
                  return value ? fromWei(value.toString()) : '';
                }}
                validate={(value, allValues) => {
                  return fromWei(value.toString()) > parseInt(allValues.sendCurrency.balance)
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
              <Field
                parse={(value) => (value ? bigNumber(value).multipliedBy(values.receiveCurrency.priceInWei) : '')}
                format={(value) => {
                  console.log(value.toString())
                  return value ? value.toString() : ''
                }}
                name="receiveValue"
                validate={toValidation}
              >
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
              <br />
              <code>
                <pre>
                  {JSON.stringify(
                    Object.entries(values)
                      .filter((entry) => /Value/.test(entry[0]))
                      .reduce((acc, entry) => {
                        /* eslint-disable */
                        acc[entry[0]] = entry[1];

                        return acc;
                      }, {}),
                  )}
                </pre>
              </code>
            </form>
          )
        }}
      </Form>
    );
  }
}

export default CurrencyConverter;
