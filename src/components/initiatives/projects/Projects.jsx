import React from 'react';

import styles from './Projects.css';

function Projects ({items}) {

  const renderProject = ({index, ...item}) => {
    return (
      <li className={styles.ProjectItem} key={index}>
        <h3>{item.name}</h3>
      </li>
    );
  };

  return (
    <ul className={styles.ProjectList}>
      {
        (items || [])
          .map((item, i) => renderProject({index: i, ...item}))
      }
    </ul>
  );
}

export default Projects;
