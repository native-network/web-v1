import React, { Component } from 'react';

import AddPoll from './PollsAdminNew';
import PollList from './shared/PollsAdminList';

import styles from './PollsAdmin.css';

export class PollsAdmin extends Component {
  state = {
    currentPolls: [],
    pastPolls: [],
  };

  componentDidMount() {
    console.log('this.props.items in mounter') //eslint-disable-line
    console.log(this.props.items) //eslint-disable-line
    const currentPolls = this.props.items.filter((poll) => {
      return new Date(poll.endDate) >= Date.now();
    });
    const pastPolls = this.props.items.filter((poll) => {
      return new Date(poll.endDate) < Date.now();
    });
    this.setState({
      currentPolls: currentPolls,
      pastPolls: pastPolls,
    });
  }

  componentWillReceiveProps() {
    console.log('this.props.items in proper') //eslint-disable-line
    console.log(this.props.items) //eslint-disable-line
  }

  render() {
    return (
      <div>
        <AddPoll />
        <div className={styles.TableTitle}>
          <h2>Current Polls</h2>
        </div>
        <PollList polls={this.state.currentPolls} />
        <div className={styles.TableTitle}>
          <h2>Past Polls</h2>
        </div>
        <PollList polls={this.state.pastPolls} />
      </div>
    );
  }
}

export default PollsAdmin;
