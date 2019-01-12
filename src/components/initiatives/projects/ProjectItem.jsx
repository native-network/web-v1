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
import S3Image from '../../../components/shared/s3-image';
import VoteForm from '../../forms/vote';

import { uploadableField } from '../../../utils/helpers';

import styles from './Projects.css';

export class ProjectItem extends Component {
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
        {project.imageUrl &&
          project.imageUrl !== 'null' && (
            <div className={styles.ProjectImage}>
              <S3Image filePath={project.imageUrl} />
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
              {project.costBreakdownUrl && (
                <div className={styles.ListItem}>
                  <dt>Cost Breakdown:</dt>
                  <dd>
                    <a
                      className="link"
                      href={uploadableField(project.costBreakdownUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cost Breakdown Link
                    </a>
                  </dd>
                </div>
              )}
              {project.roadmapUrl && (
                <div className={styles.ListItem}>
                  <dt>Roadmap Details:</dt>
                  <dd>
                    <a
                      className="link"
                      href={uploadableField(project.roadmapUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Roadmap Link
                    </a>
                  </dd>
                </div>
              )}
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
