import React from 'react';
import Modal from 'react-modal';

import styles from './Modal.css';

function NativeModal({
  title,
  isModalOpen,
  closeModal,
  render,
  hasCloseButton,
}) {
  Modal.setAppElement('#root');
  return (
    <Modal isOpen={isModalOpen} contentLabel={title}>
      <div className={styles.ModalHeader}>
        <h1>{title}</h1>
        {hasCloseButton && (
          <button className={styles.CloseButton} onClick={closeModal}>
            x
          </button>
        )}
      </div>
      <div className={styles.ModalBody}>{render && render()}</div>
    </Modal>
  );
}

export default NativeModal;
