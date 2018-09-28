import React, { Component } from 'react';
import Loader from '../../../shared/loader';
import { connect } from 'react-redux';

import Button from '../../../shared/button';

import styles from '../CommunityStake.css';

class ProcessTransaction extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading && !this.props.loading) {
      this.props.submitHandler();
    }
  }

  render() {
    const { dismissDialog } = this.props;

    return (
      <div className={styles.CommunityStake}>
        <h1 className={styles.Header}>Transaction Processing</h1>
        <div className={styles.TextContainer}>
          <div
            style={{
              position: 'relative',
              height: '16rem',
            }}
          >
            <Loader />
          </div>
          {this.props.hash ? (
            <p>
              Your transaction progress can be viewed on{' '}
              <a
                target="_blank"
                rel="noopener nofollow"
                href={`https://${
                  process.env.WEB3NETWORK == 'rinkeby' ? 'rinkeby.' : ''
                }etherscan.io/tx/${this.props.hash}`}
              >
                etherscan.io
              </a>
              .
            </p>
          ) : null}
        </div>
        <Button
          className={styles.Button}
          centered
          theme="primary"
          clickHandler={dismissDialog}
          content="Close"
        />
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      hash: state.currencies.hash,
    };
  },
  null,
)(ProcessTransaction);
