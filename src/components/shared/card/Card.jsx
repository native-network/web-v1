import React from 'react';
import { Link } from 'react-router-dom';

import Tag from '../tag';

import styles from './Card.css';

function Card ({tribe}) {

  return (
    <div className={styles.Card}>
      <div className={styles.Card_Container}>
        <div className={styles.Header}>
          <h2 className={styles.Title}>
            <Link to={`/tribe/${tribe.id}`}>{tribe.name}</Link>
          </h2>
          <h3 className={styles.Subtitle}>{tribe.subtitle}</h3>
        </div>
        <div className={styles.Summary}>
          <h4>About</h4>
          <p className={styles.Intro}>
            {tribe.tribeIntro}
          </p>
          {tribe.tags &&
            <ul className={styles.Taglist}>
              {tribe.tags.map((tag, i) => <li key={i}><Tag name={tag} /></li>)}
            </ul>
          }
          Location: {tribe.location}
        </div>
        <div className={styles.Data}>
          <img src={`/${tribe.image}`} alt=""/>
        </div>
        <div className={styles.Membership}>
          <h4>Membership</h4>
        </div>
      </div>
    </div>
  );
}

export default Card;

