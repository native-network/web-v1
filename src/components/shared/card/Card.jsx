import React from 'react';
import { Link } from 'react-router-dom';

import Tag from '../tag';

import styles from './Card.css';

function Card ({tribe}) {

  return (
    <div className={styles.Card}>
      <h3 className={styles.Title}>
        <Link to={`/tribe/${tribe.id}`}>{tribe.name}</Link>
      </h3>
      <h4 className={styles.Subtitle}>{tribe.subtitle}</h4>
      <img src={`/${tribe.image}`} alt=""/>
      <p className={styles.Intro}>
        {tribe.tribeIntro}
      </p>
      {tribe.tags &&
        <ul className={styles.Taglist}>
          {tribe.tags.map((tag, i) => <li key={i}><Tag name={tag} /></li>)}
        </ul>
      }
      {tribe.location}
    </div>
  );
}

export default Card;

