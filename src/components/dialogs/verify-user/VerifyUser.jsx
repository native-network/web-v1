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
    } else if (user.id) {
      this.setState({ components: [KYC]});
    }
  }

  // componentDidUpdate(prevProps) {
  //   // const { loading: prevLoading } = prevProps;
  //   // const { user: newUser, loading: newLoading } = this.props;
  //   // if (newUser.id && prevLoading !== newLoading) {
  //   //   console.log('foo!')
  //   //   this.setState({ components: [KYC] });
  //   // }
  // }

  render() {
    const { props } = this;
    return <Dialog components={this.state.components} {...props} />;
  }
}

export default VerifyUser;
