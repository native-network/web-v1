import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

import Button from '../button';
import Modal from '../modal';
import CurrencyConverter from '../../forms/currency-converter';
import TokenData from '../token-data';
import Tag from '../tag';

import styles from './Card.css';
import BigNumber from 'bignumber.js';

const ANIMATION_DURATION = 200;

const tokenData = {
  value: '.031 NT ($0.09)',
  marketCap: '$312,338.25',
  devFund: '24,958 NT',
  reserve: '2,495.8 NT',
  reserveRatio: '10%',
};

export class Card extends Component {
  panelHeight = undefined;
  state = {
    isReadMoreOpen: true,
    isModalOpen: false,
  };

  componentDidMount() {
    this.panelHeight = this.panel.offsetHeight;
    this.setState({ isReadMoreOpen: false });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  toggleReadMore() {
    this.setState({ isReadMoreOpen: !this.state.isReadMoreOpen });
  }

  render() {
    const { props, state } = this;
    const { community, render } = props;
    const { isReadMoreOpen } = state;

    const transition = `all ${ANIMATION_DURATION}ms linear`;
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

    const minRequirement = (value) =>
      parseInt(value, 10) < community.currency.minimumStake
        ? `You don't have enough to stake`
        : undefined;

    const defaultSendCurrency = this.props.userCurrencies.find(
      (c) => c.symbol === 'NTV',
    );

    return (
      <div className={styles.Card}>
        <Modal
          hasCloseButton
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal.bind(this)}
          renderHeader={() => <h1>Support {community.name}</h1>}
        >
          {community && community.currency ? (
            <CurrencyConverter
              defaultValues={{
                sendCurrency: defaultSendCurrency,
                sendValue: new BigNumber(
                  (community &&
                    community.currency &&
                    community.currency.minimumStake) ||
                    1,
                )
                  .dividedBy(
                    (community &&
                      community.currency &&
                      community.currency.price) ||
                      1,
                  )
                  .toString(),
                receiveCurrency: community && community.currency,
                receiveValue:
                  community &&
                  community.currency &&
                  community.currency.minimumStake,
              }}
              sendCurrencies={[]}
              receiveCurrencies={[community.currency]}
              toValidation={minRequirement}
              submitHandler={community.submitTransaction}
            />
          ) : null}
        </Modal>
        <div
          style={{ backgroundImage: `url("/${community.image}")` }}
          className={styles.Header}
        >
          <div className={styles.HeaderOverlay}>
            <div className={styles.HeaderContainer}>
              <Tag name={community.subtitle} />
              <h2 className={styles.Title}>{community.name}</h2>
              <span className={styles.Location}>{community.location}</span>
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
            <span> Support {community.name}</span>
            <Button
              clickHandler={this.openModal.bind(this)}
              theme="primary"
              content={`${(community.currency &&
                community.currency.minimumStake) ||
                0} ${(community.currency && community.currency.symbol) || ''}`}
            />
          </div>
        </div>
        <TokenData
          {...tokenData}
          containerClass={`${styles.TokenData} ${styles.Mobile}`}
          isMobile={true}
        />
        <div className={styles.Summary}>
          <h3>About:</h3>
          <p className={styles.Intro}>{community.communityIntro}</p>
        </div>
        <Transition
          mountOnEnter
          in={isReadMoreOpen}
          timeout={ANIMATION_DURATION}
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
              <p>Location: {community.location}</p>
              <p>{community.communityPurpose}</p>
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

export default connect((state) => ({
  currencies: state.currencies.currencies,
  userCurrencies: state.user.wallet.currencies,
}))(Card);
