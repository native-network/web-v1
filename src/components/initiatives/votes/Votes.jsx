import React, { Component } from 'react';
import Vote from './vote';
import styles from './Votes.css';
import moment from 'moment';

class Votes extends Component {
  state = {
    sortFilter: null,
  };

  changeFilter = ({ target }) => {
    const today = moment();
    let sortFilter;
    switch (target.value) {
      case 'open':
        sortFilter = (poll) => moment(poll.endDate).isAfter(today);
        break;
      case 'closed':
        sortFilter = (poll) => moment(poll.endDate).isBefore(today);
        break;
      default:
        sortFilter = null;
        break;
    }
    this.setState({ sortFilter });
  };

  render() {
    const { items } = this.props;
    const { sortFilter } = this.state;
    const filteredItems = sortFilter ? items.filter(sortFilter) : items;
    return (
      <div className={styles.Vote}>
        <div className={styles.Filter}>
          Filter by Vote Type
          <select defaultValue="all" name="" id="" onChange={this.changeFilter}>
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <ul className={styles.VoteList}>
          {(filteredItems || []).map((item, i) => (
            <Vote key={i} vote={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Votes;
