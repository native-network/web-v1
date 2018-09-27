import React, { Component } from 'react';
import Icon from '../icon';
import styles from './Message.css';
import { dismissUserMessage } from '../../../actions/userSessionActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Message extends Component {
  dismiss() {
    this.props.dismissUserMessage(this.props.message.id);
  }
  render() {
    return (
      <div className={styles.Message}>
        {this.props.message.text}
        <span className={styles.Dismiss} onClick={() => this.dismiss()}>
          <Icon icon="close" />
        </span>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dismissUserMessage: bindActionCreators(dismissUserMessage, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Message);
