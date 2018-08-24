import React from 'react';
import Modal from 'react-modal';

import styles from './Modal.css';

function NativeModal({
  label,
  hasCloseButton,
  closeModal,
  renderHeader,
  isOpen,
  children,
}) {
  if (process.env.NODE_ENV !== 'test') {
    // prevent enzyme bug in tests around full render
    Modal.setAppElement('#root');
  }
  return (
    <Modal isOpen={isOpen} contentLabel={label}>
      <div className={styles.ModalHeader}>
        {renderHeader && renderHeader()}
        {hasCloseButton && (
          <button style={{ color: 'black' }} onClick={() => closeModal()}>
            x
          </button>
        )}
      </div>
      <div className={styles.ModalBody}>{children}</div>
    </Modal>
  );
}

export default NativeModal;
