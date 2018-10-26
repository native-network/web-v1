import React from 'react';

import Modal from '../../shared/modal';
import Button from '../../shared/button';
import Tooltip from '../../shared/tooltip';
import styles from './ManageCommunityPrivacyModal.css';

const ManageCommunityPrivacy = (props) => {
  const { isModalOpen, closeModal, handleSubmit } = props;
  return (
    <Modal
      hasCloseButton
      closeModal={closeModal}
      isOpen={isModalOpen}
      renderHeader={() => <h1>Set community to private</h1>}
      label="Add Poll"
    >
      <div className={styles.modalContent}>
        <p className={styles.prompt}>
          Are you sure you want to set the community to private?
        </p>
        <p className={styles.description}>
          By checking private community, only approved users can join. And you
          must choose to whitelist or blacklist all current users.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.radioItem}>
            <label>
              <input name="list" type="radio" value="whitelist" />
              Whitelist all current members
            </label>
            <Tooltip message="(Recommended) Afterwords you may want to Blacklist certain members in the community table" />
          </div>
          <div className={styles.radioItem}>
            <label>
              <input name="list" type="radio" value="blacklist" />
              Blacklist all current members
            </label>
            <Tooltip message="Afterwords you may want to whitelist individual members in the community table" />
          </div>
          <p className={styles.warning}>
            Warning, you cannot change a private community back to public at
            this time.
          </p>

          <div className={styles.buttonWrapper}>
            <Button theme="tertiary" content="Undo" type="button" />
            <Button theme="secondary" type="submit" content="Continue" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ManageCommunityPrivacy;
