import React, { Component } from 'react';
import Loader from '../../../shared/loader';

import Button from '../../../shared/button';

class StepTwo extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading && !this.props.loading) {
      this.props.submitHandler();
    }
  }

  render() {
    const { dismissDialog } = this.props;

    return (
      <div>
        <h1>Transaction Processing</h1>
        <div
          style={{
            position: 'relative',
            height: '16rem',
          }}
        >
          <Loader />
        </div>
        Your transaction progress can be viewed on{' '}
        <a target="_blank" rel="noopener nofollow" href="https://etherscan.io">
          etherscan.io
        </a>
        .<br />
        <Button
          centered
          theme="primary"
          clickHandler={dismissDialog}
          content="Close"
        />
      </div>
    );
  }
}

export default StepTwo;
