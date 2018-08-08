import React from 'react';
import Modal from 'react-modal';

import styles from './Modal.css';

function NativeModal({ label, renderHeader, isOpen, children }) {
  Modal.setAppElement('#root');
  return (
    <Modal isOpen={isOpen} contentLabel={label}>
      {renderHeader && renderHeader()}
      <div className={styles.ModalBody}>{children}</div>
    </Modal>
  );
}

export default NativeModal;
