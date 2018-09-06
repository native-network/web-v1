import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';

import { sendTransaction } from '../../actions/currencyActions';

export class Home extends Component {
  submitTransaction(community, amount) {
    this.props.sendTransaction(community, amount);
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <main>
        <CardList
          listItems={(this.props.communities || []).map((community) => ({
            ...community,
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
      communities: state.communities.communities.map((community) => {
        const currency = state.currencies.currencies.find(
          (c) => c.communityId === community.id,
        );

        return currency ? { ...community, currency } : community;
      }),
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(Home);
