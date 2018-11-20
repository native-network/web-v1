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
        <h2 className={styles.TableTitle}>Polls Dashboard</h2>
        <ManagePollsNew communityId={this.props.communityId} />
        <ManagePollsList polls={this.props.items} />
      </div>
    );
  }
}

export default ManagePolls;
