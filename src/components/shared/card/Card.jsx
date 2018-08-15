import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import Button from '../button';
import TokenData from '../token-data';
import Tag from '../tag';

import styles from './Card.css';

const tokenData = {
  value: '.031 NT ($0.09)',
  marketCap: '$312,338.25',
  devFund: '24,958 NT',
  reserve: '2,495.8 NT',
  reserveRatio: '10%',
};

class Card extends Component {
  panelHeight = undefined;
  state = {
    isReadMoreOpen: true,
  };

  componentDidMount() {
    this.panelHeight = this.panel.offsetHeight;
    this.setState({ isReadMoreOpen: false });
  }

  toggleReadMore() {
    this.setState({ isReadMoreOpen: !this.state.isReadMoreOpen });
  }

  render() {
    const { props, state } = this;
    const { tribe, render } = props;
    const { isReadMoreOpen } = state;

    const transitionDuration = 200;
    const transition = `all ${transitionDuration}ms linear`;
    const defaultStyles = {
      height: '0px',
      opacity: 0,
    };
    const transitionStyles = {
      entering: { height: `${this.panelHeight}px`, opacity: 1, transition },
      entered: { height: `${this.panelHeight}px`, opacity: 1 },
      exiting: { height: '0px', opacity: 0, transition },
      exited: defaultStyles,
    };

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
              <TokenData
                {...tokenData}
                containerClass={`${styles.TokenData} ${styles.Desktop}`}
                isMobile={false}
              />
            </div>
          </div>
        </div>
        <div className={styles.CTAMobile}>
          <div className={styles.CTABadge}>
            <span> Support {tribe.name}</span>
            <Button theme="primary" content="100 NT" />
          </div>
        </div>
        <TokenData
          {...tokenData}
          containerClass={`${styles.TokenData} ${styles.Mobile}`}
          isMobile={true}
        />
        <div className={styles.Summary}>
          <h3>About:</h3>
          <p className={styles.Intro}>{tribe.tribeIntro}</p>
        </div>
        <Transition
          mountOnEnter
          in={isReadMoreOpen}
          timeout={transitionDuration}
        >
          {(state) => (
            <div
              ref={(panel) => (this.panel = panel)}
              className={styles.Membership}
              style={{
                ...defaultStyles,
                ...transitionStyles[state],
              }}
            >
              <h3>Membership</h3>
              <p>Location: {tribe.location}</p>
              <p>{tribe.tribePurpose}</p>
            </div>
          )}
        </Transition>
        <Button
          className={styles.ReadMore}
          centered
          theme="primary"
          clickHandler={this.toggleReadMore.bind(this)}
          content={isReadMoreOpen ? `Collapse` : `Show More Info`}
        />
        {render && render()}
      </div>
    );
  }
}

export default Card;
