import React from 'react';

import ManageProjectsEdit from './ManageProjectsEdit';

import styles from './ManageProjects.css';

function ManageProjectsList({ projects }) {
  const renderItem = ({ index, item }) => {
    return (
      <tr key={index} className={styles.TableRow}>
        <td className={styles.TableCell}>{item.title}</td>
        <td className={styles.TableCell}>{item.subtitle}</td>
        <td className={styles.TableCell}>
          {new Date(item.startDate).toLocaleDateString()}
        </td>
        <td className={styles.TableCell}>
          {new Date(item.startDate).toLocaleDateString()}
        </td>
        <td className={styles.TableCell}>{item.totalCost} NT</td>
        <td className={styles.TableCell}>{item.tribe.quorum} %</td>
        <td className={styles.TableCell}>20%</td>
        <td className={styles.TableCell}>
          <ManageProjectsEdit />
        </td>
      </tr>
    );
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.TableRow}>
          <th className={styles.TableCell}>Name</th>
          <th className={styles.TableCell}>Subtitle</th>
          <th className={styles.TableCell}>Start Date</th>
          <th className={styles.TableCell}>End Date</th>
          <th className={styles.TableCell}>Total Cost</th>
          <th className={styles.TableCell}>Quorum</th>
          <th className={styles.TableCell}>Status</th>
          <th className={styles.TableCell} />
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
