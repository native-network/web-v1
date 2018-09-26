import React, { Component } from 'react';
import Vote from './vote';
import styles from './Votes.css';

class Votes extends Component {
  render() {
    const { items } = this.props;
    return (
      <div className={styles.Vote}>
        {items.length ? (
          <ul className={styles.VoteList}>
            {(items || []).map((item, i) => (
              <Vote key={i} vote={item} />
            ))}
          </ul>
        ) : (
          <p>
            Looks like there are no votes available at the moment. Please try
            back later.
          </p>
        )}
      </div>
    );
  }
}

export default Votes;
