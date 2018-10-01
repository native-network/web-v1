import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';

import styles from './Home.css';

import {
  sendTransactionInEth,
  sendTransactionInNtv,
} from '../../actions/currencyActions';
import { endSession } from '../../actions/userSessionActions';

export class Home extends Component {
  cards = [];

  static defaultProps = {
    communities: [],
  };

  setCardRef(card, index) {
    this.cards[index] = card;
  }

  componentDidUpdate(prevProps) {
    if (this.cards.length > 0 && this.props.anchor) {
      if (prevProps.communities !== this.props.communities) {
        const activeCard = this.cards.find(
          (card) => card.getAttribute('id') === this.props.anchor,
        );
        if (activeCard) {
          window.scroll(0, activeCard.offsetTop);
        }
      }
    }
  }

  submitTransaction(symbol, community, amount) {
    if (symbol === 'NTV') {
      this.props.sendTransactionInEth(community, amount);
    } else {
      this.props.sendTransactionInNtv(community, amount);
    }
  }

  render() {
    const { isLoading } = this.props;
    if (isLoading) return <Loader />;

    return (
      <main>
        <div className={styles.Header}>
          <h1>Discover Communities</h1>
          <Link className={styles.CTAButton} to="/dashboard">
            Get Native Tokens
          </Link>
        </div>
        {this.props.communities.length > 0 ? (
          <ul className={styles.CardList}>
            {(this.props.communities || [])
              .filter((item) => item.name !== 'Native')
              .map((item, index) => (
                <li key={index}>
                  <Card
                    index={index}
                    cardRef={this.setCardRef.bind(this)}
                    community={{
                      ...item,
                      submitTransaction: this.submitTransaction.bind(this),
                    }}
                  />
                </li>
              ))}
          </ul>
        ) : (
          <p className="container">
            There seems to have been a problem loading the communities.
          </p>
        )}
      </main>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    sendTransactionInEth: bindActionCreators(sendTransactionInEth, dispatch),
    sendTransactionInNtv: bindActionCreators(sendTransactionInNtv, dispatch),
    endSession: bindActionCreators(endSession, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const params = ownProps.location.hash && ownProps.location.hash.slice(1);

    return {
      communities: state.communities.communities,
      isLoading: state.loading > 0,
      anchor: params,
    };
  },
  mapDispatchToProps,
)(Home);
