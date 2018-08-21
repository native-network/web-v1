import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';

import { BigNumber } from 'bignumber.js';

import styles from './CurrencyConverter.css';

import Button from '../../shared/button';
import CurrencySelector from '../../shared/currency-selector';
import CurrencyInput from '../../shared/currency-input';

const bigNumber = (n) => new BigNumber(n.toString());

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

const calculate = createDecorator({
  field: 'sendCurrency',
  updates: {
    receiveCurrency: (val) => equation(val),
  },
});

const reverse = createDecorator({
  field: 'receiveCurrency',
  updates: {
    sendCurrency: (val) => reverseEq(val),
  },
});

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
    this.setState({ activeSend: selection });
  }

  setActiveReceive(selection) {
    this.setState({ activeReceive: selection });
  }

  handleSubmit(values) {
    const { sendCurrency, receiveCurrency } = values;
    alert(
      JSON.stringify({
        send: { [this.state.activeSend.symbol]: sendCurrency },
        receive: { [this.state.activeReceive.symbol]: receiveCurrency },
      }),
    );
  }

  render() {
    const { activeSend, activeReceive } = this.state;
    const { sendCurrencies, receiveCurrencies, toValidation } = this.props;
    const hasEnoughBalance = (value) =>
      value > activeSend.balance ? `You don't have enough currency` : undefined;

    return (
      <Form
        decorators={[calculate, reverse]}
        initialValues={{
          sendCurrency: this.props.defaultValues.send,
          receiveCurrency: this.props.defaultValues.receive,
        }}
        onSubmit={this.handleSubmit.bind(this)}
        className={styles.ConversionInputs}
      >
        {({ handleSubmit, invalid }) => (
          <form className={styles.CurrencyForm} onSubmit={handleSubmit}>
            <Field name="sendCurrency" validate={hasEnoughBalance}>
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={activeSend}
                    renderLabel={(currency) => (
                      <CurrencySelector
                        isFrom
                        selectHandler={(selection) =>
                          this.setActiveSend(selection)
                        }
                        defaultCurrency={currency}
                        currencies={sendCurrencies.filter(
                          (curr) => curr.symbol !== currency.symbol,
                        )}
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
            <Field name="receiveCurrency" validate={toValidation}>
              {({ input, meta }) => (
                <div className={styles.ConversionInput}>
                  <CurrencyInput
                    {...input}
                    currency={activeReceive}
                    renderLabel={(currency) => (
                      <CurrencySelector
                        selectHandler={(selection) =>
                          this.setActiveReceive(selection)
                        }
                        defaultCurrency={currency}
                        currencies={receiveCurrencies.filter(
                          (curr) =>
                            curr &&
                            curr.symbol !== activeSend.symbol &&
                            curr.symbol !== currency.symbol,
                        )}
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
