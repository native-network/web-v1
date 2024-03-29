import React from 'react';

import Card from '../card';
import styles from './CardList.css';

const renderListItem = (item, index) => {
  return (
    <li className={styles.CardListItem} key={index}>
      <Card community={item} />
    </li>
  );
};

function CardList({ listItems }) {
  return (
    <ul className={styles.CardList}>
      {(listItems || [])
        .filter((item) => item.name !== 'Native')
        .map((item, i) => renderListItem(item, i))}
    </ul>
  );
}

export default CardList;
