import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewPoll } from '../../../actions/tribePollsActions';

import Loader from '../../shared/loader';
import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManagePollForm from '../../forms/manage-poll';

import styles from './PollsAdmin.css';

export class AddPoll extends Component {
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
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className={styles.PollButton}>
        <Button
          theme="secondary"
          content="Add Poll"
          clickHandler={this.openModal.bind(this)}
        />
        <Modal
          renderHeader={() => <h1 style={{ textAlign: 'center' }}>Add Poll</h1>}
          label="Add Poll"
          isOpen={this.state.isModalOpen}
        >
          <div>
            <Button
              clickHandler={this.closeModal.bind(this)}
              theme="secondary"
              content="Close"
              centered
            >
              Close Modal
            </Button>
            <ManagePollForm submitForm={this.handleSubmit.bind(this)} />
          </div>
        </Modal>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewPoll: bindActionCreators(addNewPoll, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(AddPoll);
