/* eslint-disable */
import React, { Component } from 'react';
import Dialog from '../Dialog';

import Authorize from './steps/Authorize';
import Processing from './steps/Processing';
import KYC from './steps/KYC';

export class VerifyUser extends Component {
  state = {
    components: [],
  };

  componentDidMount() {
    const { user } = this.props;
    if (!user.id) {
      this.setState({components: [Authorize, Processing, KYC]})
    } else if (user.id && user.kycStatus !== 'approved') {
      this.setState({ components: [KYC]});
    } else if (user.id && user.kycStatus === 'approved') {
      this.setState({ components: []});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.kycStatus !== this.props.user.kycStatus && this.props.user.kycStatus === 'approved') {
      this.props.submitHandler();
    }
  }

  render() {
    const { props } = this;
    return <Dialog components={this.state.components} {...props} />;
  }
}

export default VerifyUser;
