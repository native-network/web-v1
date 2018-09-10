import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCommunityById,
  clearActiveCommunity,
} from '../../actions/communityActions';

import { getCommunityTasks } from '../../actions/communityTasksActions';
import { getCommunityProjects } from '../../actions/communityProjectsActions';
import { getCommunityPolls } from '../../actions/communityPollsActions';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';
import TabPanels from '../../components/shared/tab-panels';

import { Votes, Tasks, Projects } from '../../components/initiatives';

import styles from './Community.css';

export class Community extends Component {
  web3;

  componentDidMount() {
    const { id } = this.props;
    this.props.getCommunityById(this.props.id);
    this.props.getCommunityPolls(id);
    this.props.getCommunityTasks(id);
    this.props.getCommunityProjects(id);
  }

  componentWillUnmount() {
    this.props.clearActiveCommunity();
  }

  render() {
    const { community, polls, tasks, projects } = this.props;
    const initiatives = formatInitiatives(polls, tasks, projects);

    if (this.props.isLoading) {
      return <Loader />;
    }

    return (
      <Card
        community={community}
        render={() => (
          <div className={styles.CommunityPanels}>
            <span className={styles.CommunityCTA}>
              Talk with Community members on Telegram
            </span>
            <TabPanels panels={initiatives} />
          </div>
        )}
      />
    );
  }
}

function formatInitiatives(polls, tasks, projects) {
  return [
    {
      name: 'Votes',
      items: polls,
      render: (polls) => <Votes items={polls} />,
    },
    {
      name: 'Tasks',
      items: tasks,
      render: (tasks) => <Tasks items={tasks} />,
    },
    {
      name: 'Projects',
      items: projects,
      render: (projects) => <Projects items={projects} />,
    },
  ];
}

export function mapDispatchToProps(dispatch) {
  return {
    getCommunityById: bindActionCreators(getCommunityById, dispatch),
    clearActiveCommunity: bindActionCreators(clearActiveCommunity, dispatch),
    getCommunityPolls: bindActionCreators(getCommunityPolls, dispatch),
    getCommunityTasks: bindActionCreators(getCommunityTasks, dispatch),
    getCommunityProjects: bindActionCreators(getCommunityProjects, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeCommunity } = state;
    const { community } = activeCommunity;
    const { communityId: id } = ownProps.match.params;
    const currency = state.currencies.currencies.find(
      (cur) => cur.communityId === community.id,
    );
    return {
      community: { ...community, currency },
      id,
      isLoading: loading > 0,
      polls: state.polls.polls,
      tasks: state.tasks.tasks,
      projects: state.projects.projects,
    };
  },
  mapDispatchToProps,
)(Community);
