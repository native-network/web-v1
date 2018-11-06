import React, { Component } from 'react';

import Modal from '../../../../shared/modal';
import styles from './PreApproveUserModal';

class PreApproveUserModal extends Component {
  render() {
    const { closeModal, isOpen } = this.props;
    return (
      <Modal
        hasCloseButton
        closeModal={closeModal}
        isOpen={isOpen}
        renderHeader={() => <h1>Pre Approve membership</h1>}
        label="Pre Approve User"
      >
        <div className={styles.modalBody}>Body</div>
      </Modal>
    );
  }
}

export default PreApproveUserModal;
