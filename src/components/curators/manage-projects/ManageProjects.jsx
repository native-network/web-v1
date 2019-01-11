import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import ReactTable from 'react-table';

import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManageProjectForm from '../../forms/manage-project';

import WalletAddress from '../../shared/wallet-address';

import {
  addNewProject,
  rewardProjectCompletion,
  cancelProject,
} from '../../../actions/communityProjectsActions';

import styles from './ManageProjects.css';
import { capitalizeFirstLetter } from '../../../utils/helpers';

export class ManageProjects extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleSubmit = (values) => {
    const { community, addNewProject } = this.props;
    const { endDate } = values;

    addNewProject({
      ...values,
      communityId: community.id,
      startDate: moment().toISOString(),
      endDate: moment(endDate).toISOString(),
    });
  };

  render() {
    const { community, cancelProject, rewardProjectCompletion } = this.props;
    return (
      <div>
        <div className={styles.Header}>
          <h2>Projects</h2>
          <Button
            theme="secondary"
            content="Add Project"
            clickHandler={this.openModal}
          />
        </div>
        <Modal
          hasCloseButton
          closeModal={this.closeModal}
          renderHeader={() => <h1>Add Project</h1>}
          label="Add Project"
          isOpen={this.state.isModalOpen}
        >
          <ManageProjectForm submitForm={this.handleSubmit.bind(this)} />
        </Modal>
        <ReactTable
          columns={[
            {
              Header: 'Title',
              accessor: 'title',
            },
            {
              Header: 'Start Date',
              accessor: 'startDate',
              Cell: ({ value }) => moment(value).format('MM/DD/YYYY'),
            },
            {
              Header: 'End Date',
              accessor: 'endDate',
              Cell: ({ value }) => moment(value).format('MM/DD/YYYY'),
            },
            {
              Header: 'Total Cost',
              accessor: 'totalCost',
              Cell: ({ value }) => (value ? `${value} NTV` : null),
            },
            {
              Header: 'Payment Address',
              accessor: 'address',
              Cell: ({ value }) => <WalletAddress address={value} />,
            },
            {
              Header: 'Status',
              accessor: 'status',
              Cell: ({ value }) =>
                value ? capitalizeFirstLetter(value) : null,
            },
            {
              Header: 'Actions',
              accessor: 'actions',
              width: 200,
              Cell: ({ value }) => {
                const { id, status, contractId, hasVotes } = value;
                let listOfButtons = [];
                switch (status) {
                  case 'escrowed':
                    if (!hasVotes) {
                      listOfButtons.push({
                        content: 'Cancel Project',
                        action: () => {
                          cancelProject(
                            {
                              projectId: id,
                              contractId,
                              status: 'pendingCompletion',
                            },
                            community,
                          );
                        },
                        theme: 'tertiary',
                      });
                    }
                    break;
                  case 'denied':
                    listOfButtons.push({
                      content: 'Distribute Funds',
                      action: () => {
                        cancelProject(
                          {
                            projectId: id,
                            contractId,
                            status: 'pendingCompletion',
                          },
                          community,
                        );
                      },
                      theme: 'tertiary',
                    });
                    break;
                  case 'passed':
                    listOfButtons.push({
                      content: 'Distribute Funds',
                      action: () => {
                        rewardProjectCompletion(
                          {
                            projectId: id,
                            contractId,
                            status: 'pendingCompletion',
                          },
                          community,
                        );
                      },
                      theme: 'tertiary',
                    });
                    break;
                }
                const formatedListOfActionbuttons = listOfButtons.map(
                  ({ action, content, theme }, ind) => {
                    return (
                      <Button
                        key={ind}
                        theme={theme}
                        clickHandler={action}
                        content={content}
                      />
                    );
                  },
                );
                return (
                  <div className={styles.actionButtonsContainer}>
                    {formatedListOfActionbuttons}
                  </div>
                );
              },
            },
          ]}
          data={(this.props.items || []).map(
            ({
              id,
              pollHasVotes,
              contractId,
              title,
              startDate,
              endDate,
              totalCost,
              address,
              status,
            }) => {
              return {
                actions: {
                  id,
                  contractId,
                  status,
                  hasVotes: pollHasVotes,
                },
                title,
                startDate,
                endDate,
                totalCost,
                status,
                address,
              };
            },
          )}
        />
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewProject: bindActionCreators(addNewProject, dispatch),
    rewardProjectCompletion: bindActionCreators(
      rewardProjectCompletion,
      dispatch,
    ),
    cancelProject: bindActionCreators(cancelProject, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ManageProjects);
