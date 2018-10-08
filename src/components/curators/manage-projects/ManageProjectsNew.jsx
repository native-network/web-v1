import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { addNewProject } from '../../../actions/communityProjectsActions';

import Loader from '../../shared/loader';
import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManageProjectForm from '../../forms/manage-project';

import styles from './ManageProjects.css';

export class ManageProjectsNew extends Component {
  state = {
    isModalOpen: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  handleSubmit(vals) {
    const newVals = {
      ...vals,
      communityId: this.props.communityId,
    };

    newVals.startDate = moment().toISOString();
    newVals.endDate = moment(vals.endDate, 'MM/DD/YYYY').toISOString();
    newVals.totalCost = +vals.totalCost;

    this.props.addNewProject(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className={styles.ProjectButton}>
        <Button
          theme="secondary"
          content="Add Project"
          clickHandler={this.openModal.bind(this)}
        />
        <Modal
          renderHeader={() => (
            <div className={styles.ModalHeader}>
              <h1>Add Project</h1>
              <button
                style={{ color: 'black' }}
                onClick={this.closeModal.bind(this)}
              >
                x
              </button>
            </div>
          )}
          label="Add Project"
          isOpen={this.state.isModalOpen}
        >
          <div>
            <ManageProjectForm submitForm={this.handleSubmit.bind(this)} />
          </div>
        </Modal>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewProject: bindActionCreators(addNewProject, dispatch),
  };
};

export default connect(
  (state) => {
    const community = state.communities.communities.find((c) => c.active);
    return {
      communityId: community.id,
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(ManageProjectsNew);
