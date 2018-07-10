import React from 'react';

import Card from '../card/Card';
import styles from './CardList.css';

function CardList ({listItems}) {
  return (
    <ul className={styles.CardList}>
      {(listItems || []).map((item, i) => {
        return <li key={i}><Card tribe={item} /></li>
      })}
    </ul>
  );
}

export default CardList;
