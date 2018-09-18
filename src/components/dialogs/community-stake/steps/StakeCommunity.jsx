import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { stake } from '../../../../actions/currencyActions';

import Button from '../../../shared/button';

import styles from '../CommunityStake.css';

class StakeCommunity extends Component {
  handleStake(community) {
    this.props.submitHandler();
    this.props.stake(community);
  }

  render() {
    const { community } = this.props;

    return (
      <div className={styles.CommunityStake}>
        <h1 className={styles.Header}>Join {community.name} Community</h1>
        <div className={styles.TextContainer}>
          <p>
            To join {community.name}, you will need to stake{' '}
            {community.currency.minimumStake} {community.currency.symbol}. You
            can retreive your currency if you choose to leave the community at
            some point in the future.
          </p>
          <p>
            <strong>
              This transaction could take up to 5 minutes. You will be notified
              when your currency has been transferred.
            </strong>
          </p>
        </div>
        <Button
          centered
          className={styles.Button}
          clickHandler={() => this.handleStake(community)}
          theme="primary"
          content={`Join Community`}
        />
      </div>
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
)(StakeCommunity);
