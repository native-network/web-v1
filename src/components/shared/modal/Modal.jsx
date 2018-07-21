import React from 'react';
import Modal from 'react-modal';

import styles from './Modal.css';

function NativeModal ({
  title,
  isModalOpen,
  closeModal,
  render
}) {
  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel={title}
    >
      <div className={styles.ModalHeader}>
        <h1>{title}</h1>
        <button style={{background: 'green'}} onClick={closeModal}>X</button>
      </div>
      {render && render()}
    </Modal>
  );
}

Modal.setAppElement('#root');

export default NativeModal;
