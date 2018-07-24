import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';
import TabPanels from '../../components/shared/tab-panels';

import { Votes, Tasks, Projects } from '../../components/initiatives';

import styles from './Tribe.css';

const initiatives = [
  {
    name: 'Votes',
    items: [
      {
        name: 'Support First thing',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
        open: false
      },
      {
        name: 'Support Second Thing',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
        open: true
      },
      {
        name: 'Support Third thing',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp',
        open: true
      }
    ],
    render: (items) => <Votes items={items} />
  },
  {
    name: 'Tasks',
    items: [
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp'
      },
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp'
      },
      {
        name: 'Support something',
        description: 'Cast a vote to support something',
        voteCount: 0,
        voteDeadline: 'timestamp'
      }
    ],
    render: (items) => <Tasks items={items} />
  },
  {
    name: 'Projects',
    render: () => <Projects />
  }
];

export class Tribe extends Component {

  state = {
    initiatives: initiatives
  }

  componentDidMount() {
    this.props.getTribeById(this.props.id);
  }

  componentWillUnmount() {
    this.props.clearActiveTribe();
  }

  render() {
    const { props, state } = this;
    const { tribe } = props;

    return this.props.isLoading ?
      <Loader /> :
      <Card
        tribe={tribe}
        render={() => (
          <div className={styles.TribePanels}>
            <span className={styles.TribeCTA}>Talk with Tribe members on Telegram</span>
            <TabPanels panels={state.initiatives} />
          </div>
        )} />;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribeById: bindActionCreators(getTribeById, dispatch),
    clearActiveTribe: bindActionCreators(clearActiveTribe, dispatch)
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeTribe } = state;
    const { tribe } = activeTribe;
    const { tribeId: id } = ownProps.match.params;

    return { tribe, id, isLoading: loading > 0 };
  },
  mapDispatchToProps
)(Tribe);
