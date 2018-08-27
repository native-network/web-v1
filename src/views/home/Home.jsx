import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';

import { sendTransaction } from '../../actions/currencyActions';

export class Home extends Component {
  submitTransaction(tribe, amount) {
    this.props.sendTransaction(tribe, amount);
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <main>
        <CardList
          listItems={(this.props.tribes || []).map((tribe) => ({
            ...tribe,
            submitTransaction: this.submitTransaction.bind(this),
          }))}
        />
      </main>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    sendTransaction: bindActionCreators(sendTransaction, dispatch),
  };
}

export default connect(
  (state) => {
    return {
      tribes: state.tribes.tribes.map((tribe) => {
        const currency = state.currencies.currencies.find(
          (c) => c.tribeId === tribe.id,
        );

        if (currency) return { ...tribe, currency };
      }),
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(Home);
