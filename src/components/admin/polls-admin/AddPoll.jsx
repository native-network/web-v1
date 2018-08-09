import React, { Component } from 'react';

import Button from '../../shared/button';
import Modal from '../../shared/modal';

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

  render() {
    return (
      <div>
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
            Add Poll Form
            <Button
              clickHandler={this.closeModal.bind(this)}
              theme="secondary"
              content="Close"
              centered
            >
              Close Modal
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddPoll;
