import React from 'react';

import TaskItem from './TaskItem';

import styles from './Tasks.css';

function Tasks({ items }) {
  const renderTask = (props) => <TaskItem key={props.index} {...props} />;

  return items.length ? (
    <ul className={styles.TaskList}>
      {(items || [])
        .filter((item) => item.status !== 'initialized')
        .map((item, index) => renderTask({ index, ...item }))}
    </ul>
  ) : (
    <p>
      Looks like there are no tasks available at this time. Please try back
      later.
    </p>
  );
}
export default Tasks;
