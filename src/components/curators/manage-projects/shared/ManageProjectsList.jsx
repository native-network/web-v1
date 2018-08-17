import React from 'react';

import styles from '../ManageProjects.css';

function ManageProjectsList({ projects }) {
  const renderItem = ({ index, item }) => {
    return (
      <tr key={index} className={styles.TableRow}>
        <td className={styles.TableCell}>
          <p>{item.name}</p>
        </td>
        <td className={styles.TableCell}>
          <p>{new Date(item.createdAt).toLocaleDateString()}</p>
        </td>
      </tr>
    );
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.TableRow}>
          <th className={styles.TableCell}>
            <p>Name</p>
          </th>
          <th className={styles.TableCell}>
            <p>Created At</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {(projects || []).map((item, i) => {
          return renderItem({ index: i, item });
        })}
      </tbody>
    </table>
  );
}

export default ManageProjectsList;
