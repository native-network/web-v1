import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './NotificationsBadge.css';

class NotificationsBadge extends Component {
  render() {
    return this.props.messages && this.props.messages.length > 0 ? (
      <span className={styles.NotificationsBadge}>
        {this.props.messages.length}
      </span>
    ) : null;
  }
}

export default connect((state) => {
  const { messages } = state.user;
  return {
    messages,
  };
})(NotificationsBadge);
