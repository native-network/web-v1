import React from 'react';
import Modal from 'react-modal';
import Icon from '../icon';

import styles from './Modal.css';

function NativeModal({
  label,
  hasCloseButton,
  closeModal,
  renderHeader,
  isOpen,
  children,
  maxWidth = '720px',
}) {
  if (process.env.NODE_ENV !== 'test') {
    // prevent enzyme bug in tests around full render
    Modal.setAppElement('#root');
  }
  const style = {
    content: {
      maxWidth: maxWidth,
      margin: '0 auto',
    },
  };
  return (
    <Modal isOpen={isOpen} style={style} contentLabel={label}>
      <div className={styles.ModalHeader}>
        {renderHeader && renderHeader()}
        {hasCloseButton && (
          <button className={styles.Dismiss} onClick={() => closeModal()}>
            <Icon icon="close" />
          </button>
        )}
      </div>
      <div className={styles.ModalBody}>{children}</div>
    </Modal>
  );
}

export default NativeModal;
