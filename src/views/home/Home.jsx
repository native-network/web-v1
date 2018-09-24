import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';

import {
  sendTransactionInEth,
  sendTransactionInNtv,
} from '../../actions/currencyActions';
import { endSession } from '../../actions/userSessionActions';

export class Home extends Component {
  static defaultProps = {
    communities: [],
  };

  submitTransaction(symbol, community, amount) {
    if (symbol === 'NTV') {
      this.props.sendTransactionInEth(community, amount);
    } else {
      this.props.sendTransactionInNtv(community, amount);
    }
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return <Loader />;

    return (
      <main>
        <CardList
          listItems={this.props.communities
            .filter((community) => community.currency)
            .map((community) => ({
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
    sendTransactionInEth: bindActionCreators(sendTransactionInEth, dispatch),
    sendTransactionInNtv: bindActionCreators(sendTransactionInNtv, dispatch),
    endSession: bindActionCreators(endSession, dispatch),
  };
}

export default connect(
  (state) => {
    return {
      communities: state.communities.communities,
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(Home);
