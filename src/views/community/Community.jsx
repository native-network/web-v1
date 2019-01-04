import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setActiveCommunity,
  unsetActiveCommunity,
} from '../../actions/communitiesActions';
import {
  sendTransactionInEth,
  sendTransactionInNtv,
} from '../../actions/currencyActions';
import { getCommunityTasks } from '../../actions/communityTasksActions';
import { getCommunityProjects } from '../../actions/communityProjectsActions';
import { getCommunityPolls } from '../../actions/communityPollsActions';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';
import TabPanels from '../../components/shared/tab-panels';

import { Votes, Tasks, Projects } from '../../components/initiatives';

import { voteFilters, taskFilters, projectFilters } from '../../utils/filters';

import styles from './Community.css';

export class Community extends Component {
  web3;

  componentDidMount() {
    const { id } = this.props;
    this.props.setActiveCommunity(id);
    this.props.getCommunityPolls(id);
    this.props.getCommunityTasks(id);
    this.props.getCommunityProjects(id);
  }

  componentWillUnmount() {
    this.props.unsetActiveCommunity();
  }

  submitTransaction(symbol, community, amount) {
    if (symbol === 'NTV') {
      this.props.sendTransactionInEth(community, amount);
    } else {
      this.props.sendTransactionInNtv(community, amount);
    }
  }

  render() {
    const { community, polls, tasks, projects } = this.props;
    const initiatives = formatInitiatives(polls, tasks, projects);

    if (this.props.isLoading) {
      return <Loader />;
    }
    return community ? (
      <Card
        community={{
          ...community,
          submitTransaction: this.submitTransaction.bind(this),
        }}
        isCommunityRoute={this.props.isCommunityRoute}
        render={() => (
          <div className={styles.CommunityPanels}>
            <TabPanels community={community} hasFilter panels={initiatives} />
          </div>
        )}
      />
    ) : null;
  }
}

function formatInitiatives(polls, tasks, projects) {
  return [
    {
      name: 'Votes',
      items: polls,
      render: (items) => <Votes items={items} />,
      filters: voteFilters,
    },
    {
      name: 'Tasks',
      items: (tasks || []).filter((item) => item.status !== 'initialized'),
      render: (items) => <Tasks items={items} />,
      filters: taskFilters,
    },
    {
      name: 'Projects',
      items: projects,
      render: (items) => <Projects items={items} />,
      filters: projectFilters,
    },
  ];
}

export function mapDispatchToProps(dispatch) {
  return {
    setActiveCommunity: bindActionCreators(setActiveCommunity, dispatch),
    unsetActiveCommunity: bindActionCreators(unsetActiveCommunity, dispatch),
    getCommunityPolls: bindActionCreators(getCommunityPolls, dispatch),
    getCommunityTasks: bindActionCreators(getCommunityTasks, dispatch),
    getCommunityProjects: bindActionCreators(getCommunityProjects, dispatch),
    sendTransactionInEth: bindActionCreators(sendTransactionInEth, dispatch),
    sendTransactionInNtv: bindActionCreators(sendTransactionInNtv, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { communityId: id } = ownProps.match.params;
    const { loading } = state;
    return {
      id,
      community: state.communities.communities.find((c) => c.id === +id),
      isLoading: loading > 0,
      polls: state.polls.polls,
      tasks: state.tasks.tasks,
      projects: state.projects.projects,
    };
  },
  mapDispatchToProps,
)(Community);
