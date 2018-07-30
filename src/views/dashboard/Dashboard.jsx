import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getUserSession,
  promptAuthorize,
} from '../../actions/userSessionActions';
import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';

export class Dashboard extends Component {
  state = {
    hasSession: this.props.hasSession || false,
  };

  componentDidMount() {
    this.props.getUserSession();
  }

  authorize() {
    this.props.promptAuthorize();
    this.setState({ hasSession: true });
  }

  render() {
    return (
      <div>
        <Modal
          title="Sign in"
          isModalOpen={!this.state.hasSession}
          render={() => {
            return (
              <Button
                centered
                theme="primary"
                content="Authorize"
                clickHandler={this.authorize.bind(this)}
              />
            );
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserSession: bindActionCreators(getUserSession, dispatch),
    promptAuthorize: bindActionCreators(promptAuthorize, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      hasSession: state.user.session && state.user.session.length > 0,
    };
  },
  mapDispatchToProps,
)(Dashboard);
