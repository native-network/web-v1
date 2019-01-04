import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {
  getCommunityPollById,
  voteOnProject,
} from '../../../actions/communityProjectsActions';

import WalletAddress from '../../../components/shared/wallet-address';
import ProjectPollResults from '../../../components/shared/project-poll-results';
import VoteForm from '../../forms/vote';

import styles from './Projects.css';

export class ProjectItem extends Component {
  componentDidMount() {
    if (!this.props.project.poll) {
      this.props.getCommunityPollById(
        this.props.project.id,
        this.props.project.polls[0].id,
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.project !== this.props.project) {
      if (!this.props.project.poll) {
        this.props.getCommunityPollById(
          this.props.project.id,
          this.props.project.polls[0].id,
        );
      }
    }
  }

  submitForm = (optionId) => {
    const { project } = this.props;
    const { poll } = project;
    this.props.voteOnProject(project.id, poll.id, optionId);
  };

  render() {
    const { project, memberCount, support } = this.props;
    const { title, subtitle, description, poll, community } = project;
    const { quorum } = community;

    const now = moment();
    const endDate = moment(poll && poll.endDate);
    const isPollOpen = now.isBefore(endDate);

    return (
      <li className={styles.ProjectItem}>
        {project.imageUrl && (
          <div className={styles.ProjectImage}>
            <img src="http://placehold.it/400x400" alt="" />
          </div>
        )}
        <div className={styles.ProjectDescription}>
          <h2 className={styles.ProjectTitle}>{title}</h2>
          <h3 className={styles.ProjectSubtitle}>{subtitle}</h3>
          <div className={styles.ProjectDescription}>
            <p>{description}</p>
          </div>
        </div>
        {poll && isPollOpen ? (
          <div className={styles.ProjectMeta}>
            <dl className={styles.ProjectDetails}>
              <div className={styles.ListItem}>
                <dt>Total Cost:</dt>
                <dd>{project.totalCost} NTV</dd>
              </div>
              <div className={styles.ListItem}>
                <dt>Project Closes:</dt>
                <dd> {moment(project.endDate).fromNow()}</dd>
              </div>
              <div className={styles.ListItem}>
                <dt>Cost Breakdown:</dt>
                <dd>
                  <a
                    href={project.costBreakdownUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cost Breakdown Link
                  </a>
                </dd>
              </div>
              <div className={styles.ListItem}>
                <dt>Roadmap Details:</dt>
                <dd>
                  <a
                    href={project.roadmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Roadmap Link
                  </a>
                </dd>
              </div>
              {project.additionalInfo && (
                <div className={styles.ListItem}>
                  <dt>Additional Information:</dt>
                  <dd>{project.additionalInfo}</dd>
                </div>
              )}
              <div className={styles.ListItem}>
                <dt>Payment Address:</dt>
                <dd>
                  <WalletAddress address={project.address} />
                </dd>
              </div>
            </dl>
            <ProjectPollResults
              votes={poll.votes}
              memberCount={memberCount}
              quorum={quorum}
              support={support}
              options={poll.options}
            />
            {poll && poll.hasVoted ? (
              <p>You have already voted for this project.</p>
            ) : (
              <VoteForm submitForm={this.submitForm} options={poll.options} />
            )}
          </div>
        ) : (
          <div className={styles.ProjectMeta}>
            <p>
              This project is closed and no longer accepting votes at this time.
            </p>
          </div>
        )}
      </li>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    voteOnProject: bindActionCreators(voteOnProject, dispatch),
    getCommunityPollById: bindActionCreators(getCommunityPollById, dispatch),
  };
}

export default connect(
  (state) => {
    const community = (state.communities.communities || []).find(
      (c) => c.active,
    );
    return {
      support: community.support,
      memberCount: community.memberCount,
    };
  },
  mapDispatchToProps,
)(ProjectItem);
