import React from 'react';

import styles from './ManagePolls.css';

function ManagePollsList({ polls }) {
  const renderItem = ({ index, item }) => {
    return (
      <tr key={index} className={styles.TableRow}>
        <td className={styles.TableCell}>
          <p>{item.title}</p>
        </td>
        <td className={styles.TableCell}>
          <p>{item.question}</p>
        </td>
        <td className={styles.TableCell}>
          <p>{new Date(item.startDate).toLocaleDateString()}</p>
        </td>
        <td className={styles.TableCell}>
          <p>{new Date(item.endDate).toLocaleDateString()}</p>
        </td>
        <td className={styles.TableCell}>
          <p>{item.votes.length} Total Votes</p>
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
        {`${option.votes.length} ${option.name} - ${votePercentage}%`}
      </p>
    );
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.TableRow}>
          <th className={styles.TableCell}>
            <p>Title</p>
          </th>
          <th className={styles.TableCell}>
            <p>Question</p>
          </th>
          <th className={styles.TableCell}>
            <p>Start Date</p>
          </th>
          <th className={styles.TableCell}>
            <p>End Date</p>
          </th>
          <th className={styles.TableCell}>
            <p>Status</p>
          </th>
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
