import React from 'react';

import Card from '../card';
import styles from './CardList.css';

const renderListItem = (item, index, prices) => {
  return (
    <li className={styles.CardListItem} key={index}>
      <Card community={item} prices={prices} />
    </li>
  );
};

function CardList({ listItems, prices }) {
  return (
    <ul className={styles.CardList}>
      {(listItems || [])
        .filter((item) => item.name !== 'Native')
        .map((item, i) => renderListItem(item, i, prices))}
    </ul>
  );
}

export default CardList;
