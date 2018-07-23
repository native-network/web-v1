import React from 'react';
import Modal from 'react-modal';

import Button from '../button';

import styles from './Modal.css';

function NativeModal ({
  title,
  isModalOpen,
  closeModal,
  render
}) {
  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel={title}
    >
      <div className={styles.ModalHeader}>
        <h1>{title}</h1>
        <button className={styles.CloseButton} onClick={closeModal}>x</button>
      </div>
      <div className={styles.ModalBody}>
        {render && render()}
      </div>
      <div className={styles.ModalFooter}>
        <Button
          centered
          theme="secondary"
          clickHandler={closeModal}
          content="Close"
        />
      </div>
    </Modal>
  );
}


export default NativeModal;
