import React from 'react';

// import Button from '../../shared/button';

import styles from './ManageTasksList.css';

// function ManageTasksList({ tasks, handleExpand, expandedTask }) {
function ManageTasksList() {
  // const renderItem = ({ index, item }) => {
  //   return (
  //     <Fragment key={index}>
  //       <tr className={styles.TableRow}>
  //         <td className={styles.TableCell}>{item.title}</td>
  //         <td className={styles.TableCell}>{item.status}</td>
  //         <td className={styles.TableCell}>
  //           {new Date(item.startDate).toLocaleDateString()}
  //         </td>
  //         <td className={styles.TableCell}>
  //           {new Date(item.startDate).toLocaleDateString()}
  //         </td>
  //         <td className={styles.TableCell}>{item.reward} NT</td>
  //         <td className={styles.TableCell}>
  //           <Button
  //             theme="secondary"
  //             content="View"
  //             disabled={expandedTask === item.id}
  //             clickHandler={() => handleExpand(item.id)}
  //           />
  //         </td>
  //       </tr>
  //       {expandedTask === item.id && (
  //         <tr className={styles.TableRow}>
  //           <td colSpan="6" className={styles.TableCell}>
  //             <div className={styles.ExpandedCell}>
  //               <div>
  //                 <p>Claimed By:</p>
  //                 {item.userEmail !== 'null' && item.userEmail}
  //               </div>
  //               <div>
  //                 <p>Comments:</p>
  //                 {item.comments !== 'null' && item.comments}
  //               </div>
  //               <div className={styles.ExpandedCell}>
  //                 <div className={styles.CellButton}>
  //                   <Button theme="secondary" content="Send NT" />
  //                 </div>
  //                 <div className={styles.CellButton}>
  //                   <Button theme="secondary" content="Reject" />
  //                 </div>
  //                 <div className={styles.CellButton}>
  //                   <Button theme="secondary" content="Delete" />
  //                 </div>
  //               </div>
  //             </div>
  //           </td>
  //         </tr>
  //       )}
  //     </Fragment>
  //   );
  // };

  return (
    <table className={styles.Table}>
      <thead>
        <tr className={styles.TableRow}>
          <th className={styles.TableCell}>Title</th>
          <th className={styles.TableCell}>Status</th>
          <th className={styles.TableCell}>Start Date</th>
          <th className={styles.TableCell}>End Date</th>
          <th className={styles.TableCell}>Reward</th>
          <th className={styles.TableCell}>View Details</th>
        </tr>
      </thead>
    </table>
  );
}

export default ManageTasksList;
