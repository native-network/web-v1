import React, { Component } from 'react';

import Button from '../../shared/button';
import Modal from '../../shared/modal';

export class AddVote extends Component {
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
          content="Add Vote"
          clickHandler={this.openModal.bind(this)}
        />
        <Modal
          title="Add Vote"
          hasCloseButton
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal.bind(this)}
          render={() => {
            return <div>Add Vote Form</div>;
          }}
        />
      </div>
    );
  }
}

export default AddVote;
