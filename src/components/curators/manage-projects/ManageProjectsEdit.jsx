import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewProject } from '../../../actions/tribeProjectsActions';

import Loader from '../../shared/loader';
import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManageProjectForm from '../../forms/manage-project';

import styles from './ManageProjects.css';

export class ManageProjectsEdit extends Component {
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
    console.log(vals) // eslint-disable-line

    const newVals = {
      costBreakdownUrl: vals.costBreakdownUrl,
      roadmapUrl: vals.roadmapUrl,
      imageUrl: vals.imageUrl,
      additionalInfo: vals.additionalInfo,
    };

    console.log(newVals) // eslint-disable-line

    // this.props.addNewProject(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className={styles.ProjectButton}>
        <Button
          theme="secondary"
          content="Edit"
          clickHandler={this.openModal.bind(this)}
        />
        <Modal
          renderHeader={() => (
            <div className={styles.ModalHeader}>
              <h1>Edit Project</h1>
              <button
                style={{ color: 'black' }}
                onClick={this.closeModal.bind(this)}
              >
                x
              </button>
            </div>
          )}
          label="Edit Project"
          isOpen={this.state.isModalOpen}
        >
          <div>
            <ManageProjectForm
              submitForm={this.handleSubmit.bind(this)}
              project={this.props.project}
            />
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
    return {
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(ManageProjectsEdit);
