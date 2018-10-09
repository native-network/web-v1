import React, { Component } from 'react';
import moment from 'moment';

import ManagePollsNew from './ManagePollsNew';
import ManagePollsList from './ManagePollsList';

import styles from './ManagePolls.css';

export class ManagePolls extends Component {
  state = {
    currentPolls: [],
    pastPolls: [],
  };

  componentDidMount() {
    const currentPolls = this.props.items.filter((poll) => {
      return moment(poll.endDate).isAfter(moment());
    });
    const pastPolls = this.props.items.filter((poll) => {
      return moment(poll.endDate).isBefore(moment());
    });
    this.setState({
      currentPolls: currentPolls,
      pastPolls: pastPolls,
    });
  }

  render() {
    return (
      <div>
        <ManagePollsNew communityId={this.props.communityId} />
        <div className={styles.TableTitle}>
          <h2>Current Polls</h2>
        </div>
        <ManagePollsList polls={this.state.currentPolls} />
        <div className={styles.TableTitle}>
          <h2>Past Polls</h2>
        </div>
        <ManagePollsList polls={this.state.pastPolls} />
      </div>
    );
  }
}

export default ManagePolls;
