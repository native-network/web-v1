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
          By checking private community, only whitelisted members can join.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label>
              Whitelist all current members{' '}
              <Tooltip
                message="(Recommended) Afterwords you may want to 
              Blacklist certain members in the community table"
              />
            </label>
            <input name="whitelist" type="radio" value="whitelist" />
          </div>
          <div className={styles.fieldGroup}>
            <label>
              Blacklist all current members{' '}
              <Tooltip message="Afterwords you may want to whitelist individual members" />
            </label>
            <input name="blacklist" type="radio" value="blacklist" />
          </div>
          <p>
            Warning, you cannot change a private community to public at this
            time.
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
