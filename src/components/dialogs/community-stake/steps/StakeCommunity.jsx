import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWeb3ServiceInstance } from '../../../../web3/Web3Service';
const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;
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
            Welcome to the Alpha version of the Native platform. Here you can
            convert Ether to Native Token (NTV) and support any Community by
            converting NTV to their Community Token. By converting to Community
            Token you get to participate in Community votes about how to
            allocate funds, and earn Community Token in exchange for completing
            tasks that further the Community’s interests. The Beta version of
            the platform, which is scheduled for release by the end of Q1 2019,
            will enable you to convert from Community Token and NTV back into
            Ether and other cryptocurrencies.
          </p>
          <p>
            To become a member of {community.name}, you will need to stake{' '}
            {`${fromWei(community.currency.minimumStake)} ${
              community.currency.symbol
            }`}
            .
          </p>
          <p>
            <strong>This process will be two transactions.</strong>
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
