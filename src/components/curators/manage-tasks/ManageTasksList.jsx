import React from 'react';

import styles from './ManageTasks.css';

function ManageTasksList({ tasks }) {
  const renderItem = ({ index, item }) => {
    return (
      <tr key={index} className={styles.TableRow}>
        <td className={styles.TableCell}>{item.title}</td>
        <td className={styles.TableCell}>
          {new Date(item.startDate).toLocaleDateString()}
        </td>
        <td className={styles.TableCell}>
          {new Date(item.startDate).toLocaleDateString()}
        </td>
      </tr>
    );
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.TableRow}>
          <th className={styles.TableCell}>Title</th>
          <th className={styles.TableCell}>Start Date</th>
          <th className={styles.TableCell}>End Date</th>
        </tr>
      </thead>
      <tbody>
        {(tasks || []).map((item, i) => {
          return renderItem({ index: i, item });
        })}
      </tbody>
    </table>
  );
}

export default ManageTasksList;
