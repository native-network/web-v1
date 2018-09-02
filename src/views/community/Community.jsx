import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCommunityById,
  clearActiveCommunity,
} from '../../actions/communityActions';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';
import TabPanels from '../../components/shared/tab-panels';

import { Votes, Tasks, Projects } from '../../components/initiatives';

import styles from './Community.css';

const initiatives = [
  {
    name: 'Votes',
    items: [
      {
        name: 'Support First thing',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
        open: false,
      },
      {
        name: 'Support Second Thing',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
        open: true,
      },
      {
        name: 'Support Third thing',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
        open: true,
      },
    ],
    render: (items) => <Votes items={items} />,
  },
  {
    name: 'Tasks',
    items: [
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
      },
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
      },
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
      },
    ],
    render: (items) => <Tasks items={items} />,
  },
  {
    name: 'Projects',
    items: [
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
      },
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
      },
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
      },
    ],
    render: (items) => <Projects items={items} />,
  },
];

export class Community extends Component {
  web3;

  state = {
    initiatives: initiatives,
  };

  componentDidMount() {
    this.props.getCommunityById(this.props.id);
  }

  componentWillUnmount() {
    this.props.clearActiveCommunity();
  }

  render() {
    const { props, state } = this;
    const { community } = props;

    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Card
        community={community}
        render={() => (
          <div className={styles.CommunityPanels}>
            <span className={styles.CommunityCTA}>
              Talk with Community members on Telegram
            </span>
            <TabPanels panels={state.initiatives} />
          </div>
        )}
      />
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getCommunityById: bindActionCreators(getCommunityById, dispatch),
    clearActiveCommunity: bindActionCreators(clearActiveCommunity, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeCommunity } = state;
    const { community } = activeCommunity;
    const { communityId: id } = ownProps.match.params;

    return {
      community,
      id,
      isLoading: loading > 0,
    };
  },
  mapDispatchToProps,
)(Community);
