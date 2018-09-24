import React from 'react';

import Icon from '../icon';

import styles from './SocialMedia.css';

function SocialMedia({ className, links }) {
  return links ? (
    <ul className={`${className} ${styles.SocialMedia}`}>
      {(links || []).map((link, index) => (
        <li key={index}>
          <a href={link.link} rel="noopener nofollow" target="_blank">
            <Icon icon={link.name.toLowerCase()} />
          </a>
        </li>
      ))}
    </ul>
  ) : null;
}

export default SocialMedia;
