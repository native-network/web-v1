/* eslint-disable */
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

            <div className={`${styles.TokenData} ${styles.Desktop}`}>
              <dl>
                <div>
                  <dt>Token Value</dt>
                  <dd>.031 NT ($0.09)</dd>
                </div>
                <div>
                  <dt>Market Cap</dt>
                  <dd>$312,338.25</dd>
                </div>
                <div>
                  <dt>Dev Fund</dt>
                  <dd>24,958 NT</dd>
                </div>
                <div>
                  <dt>Reserve</dt>
                  <dd>2,495.8 NT</dd>
                </div>
                <div>
                  <dt>Reserve Ratio</dt>
                  <dd>10%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.CTAMobile}>
        <div className={styles.CTABadge}>
          <span> Support {tribe.name}</span>
          <Button theme="primary" content="100 NT" />
        </div>
      </div>
      <div className={`${styles.TokenData} ${styles.Mobile}`}>
        <dl>
          <div>
            <dt>Token Value</dt>
            <dd>.031 NT ($0.09)</dd>
          </div>
          <div>
            <dt>Market Cap</dt>
            <dd>$312,338.25</dd>
          </div>
          <div>
            <dt>Dev Fund</dt>
            <dd>24,958 NT</dd>
          </div>
          <div>
            <dt>Reserve</dt>
            <dd>2,495.8 NT (10%)</dd>
          </div>
        </dl>
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
