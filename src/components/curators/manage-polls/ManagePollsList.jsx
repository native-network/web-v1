import React from 'react';

import styles from './ManagePolls.css';

function ManagePollsList({ polls }) {
  const renderItem = ({ index, item }) => {
    return (
      <tr key={index} className={styles.TableRow}>
        <td className={styles.TableCell}>{item.title}</td>
        <td className={styles.TableCell}>{item.question}</td>
        <td className={styles.TableCell}>
          {new Date(item.startDate).toLocaleDateString()}
        </td>
        <td className={styles.TableCell}>
          {new Date(item.endDate).toLocaleDateString()}
        </td>
        <td className={styles.TableCell}>
          <p>{item.votes.length} - Total Votes</p>
          {(item.options || []).map((option, i) => {
            return renderStat({ index: i, option, item });
          })}
        </td>
      </tr>
    );
  };

  const renderStat = ({ index, option, item }) => {
    const optionVoteCount = option.votes.length;
    const voteCount = item.votes.length;

    const votePercentage = voteCount
      ? ((optionVoteCount / voteCount) * 100).toFixed(2)
      : 0;
    return (
      <p key={index}>
        {`${option.votes.length} - ${option.name}: ${votePercentage}%`}
      </p>
    );
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.TableRow}>
          <th className={styles.TableCell}>Title</th>
          <th className={styles.TableCell}>Question</th>
          <th className={styles.TableCell}>Start Date</th>
          <th className={styles.TableCell}>End Date</th>
          <th className={styles.TableCell}>Status</th>
        </tr>
      </thead>
      <tbody>
        {(polls || []).map((item, i) => {
          return renderItem({ index: i, item });
        })}
      </tbody>
    </table>
  );
}

export default ManagePollsList;
