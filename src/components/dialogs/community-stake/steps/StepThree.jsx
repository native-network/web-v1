import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { stake } from '../../../../actions/userSessionActions';

import Button from '../../../shared/button';

class StepThree extends Component {
  handleStake() {}

  render() {
    const { community, stake } = this.props;

    return (
      <Fragment>
        <h1>Join {community.name} Community</h1>
        <p>
          To join {community.name}, you will need to stake{' '}
          {community.currency.minimumStake} {community.currency.symbol}. You can
          retreive your currency if you choose to leave the community at some
          point in the future.
        </p>
        <p>
          <strong>
            This transaction could take up to 5 minutes. You will be notified
            when your currency has been transferred.
          </strong>
        </p>
        <Button
          centered
          clickHandler={() => stake(community)}
          theme="primary"
          content={`Join Community`}
        />
      </Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    stake: bindActionCreators(stake, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(StepThree);
