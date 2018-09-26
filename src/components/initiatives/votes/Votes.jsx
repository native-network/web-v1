import React, { Component } from 'react';
import Vote from './vote';
import styles from './Votes.css';

class Votes extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className={styles.Vote}>
        <ul className={styles.VoteList}>
          {(items || []).map((item, i) => (
            <Vote key={i} vote={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Votes;
