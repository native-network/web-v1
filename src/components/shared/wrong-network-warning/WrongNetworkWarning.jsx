import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './WrongNetworkWarning.css';

class WrongNetworkBanner extends Component {
  render() {
    const networkName = process.env.WEB3NETWORK;
    const formattedNetworkName =
      networkName.slice(0, 1).toUpperCase() +
      networkName.slice(1, networkName.length);

    return !this.props.doesNetworkMatch ? (
      <div className={styles.Banner}>
        <div>
          <h1>Attention: Wrong Network</h1>
          <p>
            It appears that you are on the wrong network to interact with this
            application.
          </p>
          <p>Please switch to the {formattedNetworkName} Ethereum Network.</p>
        </div>
      </div>
    ) : null;
  }
}

export default connect(
  (state) => ({
    doesNetworkMatch: state.user.doesNetworkMatch,
  }),
  null,
)(WrongNetworkBanner);
