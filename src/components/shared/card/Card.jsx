import React from 'react';
import { Link } from 'react-router-dom';

import Tag from '../tag/Tag';

import styles from './Card.css';

function Card ({tribe}) {
  console.log(tribe);
  console.log(styles);
  return (
    <div className={styles.Card}>
      <h3>
        <Link to={`/tribes/${tribe.address}`}>{tribe.name}</Link>
      </h3>
      <h4>{tribe.subtitle}</h4>
      <img src="http://placehold.it/500x200" alt=""/>
      <p className={styles.Card_Intro}>
        {tribe.tribeIntro}
      </p>
      {tribe.tags &&
        <ul className={styles.Card_Taglist}>
          {tribe.tags.map((tag, i) => <li key={i}><Tag name={tag} /></li>)}
        </ul>
      }
      {tribe.location}
    </div>
  );
}

export default Card;

