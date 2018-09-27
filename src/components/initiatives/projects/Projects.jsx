import React from 'react';

import styles from './Projects.css';

function Projects({ items }) {
  const renderProject = ({ index, ...item }) => {
    return (
      <li className={styles.ProjectItem} key={index}>
        <h3>{item.name}</h3>
      </li>
    );
  };

  return items.length ? (
    <ul className={styles.ProjectList}>
      {(items || []).map((item, i) => renderProject({ index: i, ...item }))}
    </ul>
  ) : (
    <p>
      Looks like there are no projects available at the moment. Please try back
      later.
    </p>
  );
}

export default Projects;
