import React, { Component } from 'react';
import Loader from '../../../shared/loader';

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
          Your transaction progress can be viewed on{' '}
          <a
            target="_blank"
            rel="noopener nofollow"
            href="https://etherscan.io"
          >
            etherscan.io
          </a>
          .<br />
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

export default ProcessTransaction;
