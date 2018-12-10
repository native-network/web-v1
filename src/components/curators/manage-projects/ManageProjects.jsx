import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
// import ManageProjectsList from './ManageProjectsList';

import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManageProjectForm from '../../forms/manage-project';

import { addNewProject } from '../../../actions/communityProjectsActions';

import styles from './ManageProjects.css';

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
    const { communityId, addNewProject } = this.props;
    const { endDate } = values;

    addNewProject({
      ...values,
      communityId,
      startDate: moment().toISOString(),
      endDate: moment(endDate).toISOString(),
    });
  };

  render() {
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
  null,
  mapDispatchToProps,
)(ManageProjects);
