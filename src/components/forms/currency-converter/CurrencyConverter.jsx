/* eslint-disable */
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import Web3 from 'web3';

import { BigNumber } from 'bignumber.js';

import styles from './CurrencyConverter.css';

import Button from '../../shared/button';
import CurrencySelector from '../../shared/currency-selector';
import CurrencyInput from '../../shared/currency-input';

const bigNumber = (n) => new BigNumber(n.toString());
const web3 = new Web3();

const equation = (n) =>
  n
    ? bigNumber(n)
        .multipliedBy(4)
        .toString()
    : n;
const reverseEq = (n) =>
  n
    ? bigNumber(n)
        .dividedBy(4)
        .toString()
    : n;

const calculate = createDecorator(
  {
    field: /Currency/,
    updates: (value, name, allValues) => {
      const { priceInWei } = value;
      const { sendValue, receiveValue } = allValues;
      const convertToWei = (n = 0) => bigNumber(n || 1).multipliedBy(priceInWei).toString();

      if (/send/.test(name)) {
        return { receiveValue: web3.utils.fromWei(convertToWei(sendValue)) }
      } else {
        return { sendValue: web3.utils.fromWei(convertToWei(receiveValue)) };
      }
    },
  },
  // {
  //   field: /Value/,
  //   updates: (value, name, allValues) => {
  //     console.log(value);
  //     console.log(name);
  //     console.log(allValues);

  //     return null;
  //   }
  // }
);

class CurrencyConverter extends Component {
  state = {
    activeSend: this.props.sendCurrencies[0],
    activeReceive: this.props.receiveCurrencies[0],
  };

  componentDidMount() {
    if (this.state.activeSend === this.state.activeReceive) {
      this.changeReceiveCurrency();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeSend: prevFrom } = prevState;
    const { activeSend: newFrom } = this.state;

    if (prevFrom !== newFrom) {
      if (newFrom === this.state.activeReceive) {
        this.changeReceiveCurrency(this.state.activeReceive);
      }
    }
  }

  changeReceiveCurrency() {
    const newActiveReceive = (this.props.receiveCurrencies || []).find(
      (currency) => currency !== this.state.activeSend,
    );

    if (newActiveReceive) {
      this.setState({ activeReceive: newActiveReceive });
    }
  }

  setActiveSend(selection) {
    console.log(selection); // eslint-disable-line
    this.setState({ activeSend: selection });
  }

  setActiveReceive(selection) {
    this.setState({ activeReceive: selection });
  }

  handleSubmit(values) {
    console.log(values) // eslint-disable-line
    // const { sendCurrency, receiveCurrency } = values;
    // alert(
    //   JSON.stringify({
    //     send: { [this.state.activeSend.symbol]: sendCurrency },
    //     receive: { [this.state.activeReceive.symbol]: receiveCurrency },
    //   }),
    // );
  }

  render() {
    const { activeSend, activeReceive } = this.state;
    const {
      sendCurrencies,
      receiveCurrencies,
      toValidation,
      defaultValues,
    } = this.props;
    const hasEnoughBalance = (value) =>
      value > activeSend.balance ? `You don't have enough currency` : undefined;

    return (
      <Form
        decorators={[calculate]}
        initialValues={{
          sendCurrency: defaultValues.sendCurrency,
          sendValue: defaultValues.sendValue,
          receiveCurrency: defaultValues.receiveCurrency,
          receiveValue: defaultValues.receiveValue,
        }}
        onSubmit={this.handleSubmit.bind(this)}
        className={styles.ConversionInputs}
      >
        {({ handleSubmit, invalid }) => (
          <form className={styles.CurrencyForm} onSubmit={handleSubmit}>
            <Field name="sendValue" validate={hasEnoughBalance}>
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={activeSend}
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
                    currency={activeReceive}
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
