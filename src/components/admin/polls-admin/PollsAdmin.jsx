import React, { Component } from 'react';

import AddPoll from './AddPoll';
import PollList from './PollsList';

import styles from './PollsAdmin.css';

export class PollsAdmin extends Component {
  state = {
    currentPolls: [],
    pastPolls: [],
  };

  componentWillReceiveProps() {
    console.log('this.props.items') //eslint-disable-line
    console.log(this.props.items) //eslint-disable-line
    const today = Date.now();
    const currentPolls = this.props.items.filter((poll) => {
      console.log(new Date(poll.endDate) >= today) //eslint-disable-line
      return new Date(poll.endDate) >= today;
    });
    const pastPolls = this.props.items.filter((poll) => {
      return new Date(poll.endDate) < today;
    });
    this.setState({
      currentPolls: currentPolls,
      pastPolls: pastPolls,
    });
  }

  componentWillUnmount() {
    //need to clear some shit
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
