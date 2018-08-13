import React from 'react';

import Button from '../button';
import Tag from '../tag';

import styles from './Card.css';

function Card({ tribe, render }) {
  return (
    <div className={styles.Card}>
      <div
        style={{ backgroundImage: `url("${tribe.image}")` }}
        className={styles.Header}
      >
        <div className={styles.HeaderOverlay}>
          <div className={styles.HeaderContainer}>
            <Tag name={tribe.subtitle} />
            <h2 className={styles.Title}>{tribe.name}</h2>
            <span className={styles.Location}>{tribe.location}</span>
          </div>
        </div>
      </div>
      <div className={styles.CTAMobile}>
        <div className={styles.CTABadge}>
          <span> Support {tribe.name}</span>
          <Button theme="primary" content="100 NT" />
        </div>
      </div>
      <div className={styles.TokenDataMobile}>
        <ul>
          <li>Foo</li>
          <li>Foo</li>
          <li>Foo</li>
          <li>Foo</li>
        </ul>
      </div>
      <div className={styles.Summary}>
        <h4>About</h4>
        <p className={styles.Intro}>{tribe.tribeIntro}</p>
        {tribe.tags && (
          <ul className={styles.Taglist}>
            {tribe.tags.map((tag, i) => (
              <li key={i}>
                <Tag name={tag} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.Membership}>
        <h4>Membership</h4>
        <p>{tribe.tribePurpose}</p>
      </div>
      {render && render()}
    </div>
  );
}

export default Card;
