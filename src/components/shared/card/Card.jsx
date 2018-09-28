import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';

import Button from '../button';
import Modal from '../modal';
import SocialMedia from '../social-media';
import CommunityStake from '../../dialogs/community-stake';
import Tag from '../tag';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';
import { Link } from 'react-router-dom';
const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

import styles from './Card.css';

const ANIMATION_DURATION = 200;

export class Card extends Component {
  panelHeight = undefined;
  static defaultProps = {
    community: {
      currency: {
        price: '',
        totalSupply: '',
      },
    },
    prices: {
      ethUSD: '',
      ntvWei: '',
    },
  };

  state = {
    isReadMoreOpen: true,
    isModalOpen: false,
    activeCommunity: {},
  };

  componentDidMount() {
    this.panelHeight = this.panel.offsetHeight;
    this.setState({ isReadMoreOpen: false });
  }

  openModal(activeCommunity) {
    this.setState({ activeCommunity });
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  toggleReadMore() {
    this.setState({ isReadMoreOpen: !this.state.isReadMoreOpen });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isCurrencyLoading && this.props.userCurrencies.length) {
      const oldCurrency = prevProps.userCurrencies.find(
        (c) => c.symbol === prevProps.community.currency.symbol,
      );
      const newCurrency = this.props.userCurrencies.find(
        (c) => c.symbol === this.props.community.currency.symbol,
      );

      const oldBalance = oldCurrency && oldCurrency.balance;
      const newBalance = newCurrency && newCurrency.balance;

      if (oldBalance && oldBalance !== newBalance) {
        this.openModal(this.props.community);
      }
    }
  }

  isCommunityRoute() {
    return !!this.props.location.pathname.includes('community');
  }

  renderCommunityLink() {
    const { user, community } = this.props;
    const isMember = user.memberOf.find((userCommunity) => {
      return userCommunity.id === community.id;
    });
    return !this.isCommunityRoute() && !!isMember ? (
      <Link className={styles.CommunityLink} to={`/community/${community.id}`}>
        Visit {community.name}
      </Link>
    ) : null;
  }

  render() {
    const { props, state } = this;
    const { community, render } = props;
    const { isReadMoreOpen } = state;
    const socialLinks = JSON.parse(community.socialMediaLinks);
    const membershipBenefits = JSON.parse(community.membershipBenefits);
    const isMember = !!this.props.user.memberOf.find((userCommunity) => {
      return userCommunity.id === community.id;
    });

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

    return (
      <div
        className={styles.Card}
        style={this.isCommunityRoute() ? { overflow: 'visible' } : null}
      >
        <Modal
          hasCloseButton
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal.bind(this)}
          maxWidth="1020px"
        >
          <CommunityStake
            error={this.props.currencyError}
            loading={this.props.isCurrencyLoading}
            user={this.props.user}
            community={this.props.community}
            dismissDialog={this.closeModal.bind(this)}
          />
        </Modal>
        <div
          style={{ backgroundImage: `url("${community.image}")` }}
          className={styles.Header}
        >
          <div className={styles.HeaderOverlay}>
            <div className={styles.HeaderContainer}>
              <Tag name={community.subtitle} />
              <h2 className={styles.Title}>{community.name}</h2>
            </div>
          </div>
        </div>
        <div className={styles.CTABadge}>
          <Button
            className={styles.CommunityButton}
            clickHandler={() => this.openModal(community)}
            theme="white"
            disabled={!this.props.user.wallet.address}
            content={
              isMember
                ? `Get ${community.currency.symbol}`
                : `Support ${community.name} (${fromWei(
                    community.currency.minimumStake,
                  )} ${community.currency.symbol})`
            }
          />
        </div>
        <div className={styles.CardDetails}>
          <div className={styles.Summary}>
            <h3>About:</h3>
            <p className={styles.Intro}>{community.communityPurpose}</p>
            <dl className={styles.CommunityInfo}>
              <div>
                <dt>Location:</dt>
                <dd>{community.location}</dd>
              </div>
              <div>
                <dt>Total Members:</dt>
                <dd>{community.memberCount || 10}</dd>
              </div>
              <div>
                <dt>Curator:</dt>
                <dd>{community.curatorInfo}</dd>
              </div>
            </dl>
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
                <div className={styles.Benefits}>
                  <h3>Membership Benefits:</h3>
                  {membershipBenefits ? (
                    <ul>
                      {membershipBenefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className={styles.Policies}>
                  <h3>Governance Policies:</h3>
                  <p>
                    Quorum of {community.quorum}% is required to approve
                    projects.
                  </p>
                  <p>
                    <a
                      target="_blank"
                      rel="noopener nofollow"
                      href={community.votingPolicy}
                    >
                      Download the voting policy
                    </a>
                  </p>
                  <p>
                    <a
                      target="_blank"
                      rel="noopener nofollow"
                      href={community.revenueDistributionPolicy}
                    >
                      Download the revenue distribution policy
                    </a>
                  </p>
                </div>
                <SocialMedia className={styles.Social} links={socialLinks} />
              </div>
            )}
          </Transition>
        </div>
        <Button
          className={styles.ReadMore}
          clickHandler={this.toggleReadMore.bind(this)}
          content={isReadMoreOpen ? `Collapse` : `Show More Info`}
        />
        {this.renderCommunityLink(community, this.props.user)}
        {render && render()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      isCurrencyLoading: state.currencies.loading,
      currencies: state.currencies.currencies,
      userCurrencies: state.user.wallet.currencies,
      currencyError: state.currencies.error,
      prices: state.prices,
      location: state.router.location || [],
    };
  },
  null,
)(Card);
