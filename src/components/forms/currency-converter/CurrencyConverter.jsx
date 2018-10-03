import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { Field as Field5 } from 'react-final-form-html5-validation';

import { getWeb3ServiceInstance } from '../../../web3/Web3Service';

import styles from './CurrencyConverter.css';

import Button from '../../shared/button';
import Icon from '../../shared/icon';
import Loader from '../../shared/loader';
import CurrencySelector from '../../shared/currency-selector';
import CurrencyInput from '../../shared/currency-input';

import { CurrencyConverterDecorator } from '../decorators/CurrencyConverterDecorator';
import BigNumber from 'bignumber.js';

const { web3 } = getWeb3ServiceInstance();
const { toWei } = web3.utils;

export class CurrencyConverter extends Component {
  static propTypes = {
    sendCurrencies: PropTypes.arrayOf(
      PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        iconUrl: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        communityId: PropTypes.number,
        minimumStake: PropTypes.string,
      }),
    ).isRequired,
    sendValue: PropTypes.string,
    receiveCurrencies: PropTypes.arrayOf(
      PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        iconUrl: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        communityId: PropTypes.number,
        minimumStake: PropTypes.string,
      }),
    ).isRequired,
    receiveValue: PropTypes.string,
    submitHandler: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sendValue: '',
    receiveValue: '',
  };

  state = {
    activeSendCurrency:
      this.props.defaultValues.sendCurrency ||
      this.props.sendCurrencies.find((currency) => currency.symbol === 'ETH'),
    sendCurrencies: this.props.sendCurrencies || [],
    activeReceiveCurrency:
      this.props.defaultValues.receiveCurrency ||
      this.props.receiveCurrencies.find(
        (currency) => currency.symbol === 'NTV',
      ),
    receiveCurrencies: this.props.receiveCurrencies || [],
  };

  componentDidMount() {
    if (this.state.activeSendCurrency.symbol === 'ETH') {
      this.setState({
        activeReceiveCurrency: this.props.receiveCurrencies.find(
          (c) => c.symbol === 'NTV',
        ),
        receiveCurrencies: [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.defaultValues !== prevProps.defaultValues) {
      if (
        this.props.defaultValues.sendCurrency &&
        this.props.defaultValues.receiveCurrency
      ) {
        this.setState({
          activeSendCurrency: this.props.defaultValues.sendCurrency,
          activeReceiveCurrency: this.props.defaultValues.receiveCurrency,
        });
      }
    }

    if (this.state.activeSendCurrency !== prevState.activeSendCurrency) {
      if (this.state.activeSendCurrency.symbol === 'NTV') {
        this.setState({
          activeReceiveCurrency: this.props.receiveCurrencies.find(
            (c) => c.symbol !== 'NTV',
          ),
          receiveCurrencies: this.props.receiveCurrencies.filter(
            (c) => c.symbol !== 'NTV',
          ),
        });
      } else if (this.state.activeSendCurrency.symbol === 'ETH') {
        this.setState({
          activeReceiveCurrency: this.props.receiveCurrencies.find(
            (c) => c.symbol === 'NTV',
          ),
          receiveCurrencies: [],
        });
      }
    }
  }

  handleChange(value, isFrom) {
    const base = 'Currency';
    const field = isFrom ? `activeSend${base}` : `activeReceive${base}`;
    this.setState({ [field]: value });
  }

  handleSubmit(values) {
    const { sendValue, receiveCurrency } = values;
    const token = (this.props.receiveCurrencies || []).find(
      (t) => t.symbol === receiveCurrency.symbol,
    );
    const { symbol, tokenAddress } = token;
    this.props.submitHandler(
      symbol,
      tokenAddress,
      token.symbol === 'NTV' ? sendValue : toWei(sendValue),
    );
  }

  render() {
    const { toValidation, defaultValues } = this.props;
    return (
      <Form
        decorators={[CurrencyConverterDecorator]}
        initialValues={{
          sendCurrency: this.state.activeSendCurrency,
          sendValue: defaultValues.sendValue || '',
          receiveCurrency: this.state.activeReceiveCurrency,
          receiveValue: defaultValues.receiveValue,
        }}
        onSubmit={this.handleSubmit.bind(this)}
        className={styles.ConversionInputs}
      >
        {({ handleSubmit, invalid, form }) => (
          <form
            ref={this.props.formRef}
            className={`${styles.CurrencyForm} ${this.props.className}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.ConversionInputs}>
              {this.props.isLoading ? <Loader isFullScreen={false} /> : null}
              <Field5
                name="sendValue"
                validate={(value, allValues) => {
                  const valueInWei = !!value && toWei(value);
                  return new BigNumber(valueInWei).gt(
                    allValues.sendCurrency.balance,
                  )
                    ? `You don't have enough ${allValues.sendCurrency.symbol}`
                    : undefined;
                }}
              >
                {({ input, meta }) => (
                  <div className={styles.ConversionInput}>
                    <CurrencyInput
                      {...input}
                      currency={this.state.activeSendCurrency}
                      renderLabel={(currency) => (
                        <Field
                          currency={currency}
                          isFrom
                          changeHandler={this.handleChange.bind(this)}
                          component={CurrencySelector}
                          name="sendCurrency"
                          currencies={this.state.sendCurrencies}
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
              <span className={`visible-md ${styles.Arrow}`}>
                <Icon icon="arrow" />
              </span>
              <Field5 name="receiveValue" validate={toValidation}>
                {({ input, meta }) => {
                  return (
                    <div className={styles.ConversionInput}>
                      <CurrencyInput
                        currency={this.state.activeReceiveCurrency}
                        {...input}
                        renderLabel={(currency) => {
                          return (
                            <Field
                              currency={currency}
                              changeHandler={this.handleChange.bind(this)}
                              component={CurrencySelector}
                              name="receiveCurrency"
                              currencies={this.state.receiveCurrencies}
                            />
                          );
                        }}
                      />
                      {meta.error && (
                        <span className={styles.Error}>{meta.error}</span>
                      )}
                    </div>
                  );
                }}
              </Field5>
            </div>
            <Button
              content={
                <span>
                  <Icon icon="convert" /> Convert
                </span>
              }
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

export default connect(
  (state) => {
    const isLoading = state.currencies.loading;
    return {
      isLoading,
    };
  },
  null,
)(CurrencyConverter);
