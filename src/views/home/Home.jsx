import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';
import { connect } from 'react-redux';

export class Home extends Component {
  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <main>
        <CardList listItems={this.props.tribes} />
      </main>
    );
  }
}

export default connect(
  (state) => {
    return {
      tribes: state.tribes.tribes.map((tribe) => {
        const curr = state.currencies.currencies.find(
          (c) => c.tribeId === tribe.id,
        );

        if (curr) return { ...tribe, currency: curr };
      }),
      isLoading: state.loading > 0,
    };
  },
  null,
)(Home);
