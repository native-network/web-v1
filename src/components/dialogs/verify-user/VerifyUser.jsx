import React, { Component } from 'react';
import Dialog from '../Dialog';

import Authorize from './steps/Authorize';
import Processing from './steps/Processing';

export class VerifyUser extends Component {
  state = {
    components: [],
  };

  componentDidMount() {
    const { user } = this.props;
    if (!user.id) {
      this.setState({ components: [Authorize, Processing] });
    } else {
      this.setState({ components: [] });
    }
  }

  render() {
    const { props } = this;
    return <Dialog components={this.state.components} {...props} />;
  }
}

export default VerifyUser;
