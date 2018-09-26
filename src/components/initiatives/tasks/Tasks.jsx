import React from 'react';

import Button from '../../shared/button';

import styles from './Tasks.css';

function Tasks({ items }) {
  const renderTask = ({ index, ...item }) => {
    return (
      <li className={styles.TaskItem} key={index}>
        <div className={styles.TaskImage}>
          <img src="http://placehold.it/250x150" alt="" />
          <span>Reward: $$$$$$</span>
        </div>
        <div className={styles.TaskDescription}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <Button centered theme="secondary" content="Claim Task" />
        </div>
        <div className={styles.TaskMeta}>
          <h4>Task Duration</h4>
          <p>One Week</p>
          <h4>Task History</h4>
        </div>
      </li>
    );
  };

  return items.length ? (
    <ul className={styles.TaskList}>
      {(items || []).map((item, i) => renderTask({ index: i, ...item }))}
    </ul>
  ) : (
    <p>
      Looks like there are no tasks available at this time. Please try back
      later.
    </p>
  );
}

export default Tasks;
