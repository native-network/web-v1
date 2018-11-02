/* eslint-disable */
import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import Modal from '../../shared/modal';
import Button from '../../shared/button';
import Tooltip from '../../shared/tooltip';
import styles from './ManageCommunityPrivacyModal.css';

const ManageCommunityPrivacy = (props) => {
  const { isOpen, closeModal, input } = props;

  const toggleIsPrivate = ({ onChange }) => {
    onChange(true);
    closeModal();
  };

  return (
    <Modal
      hasCloseButton
      closeModal={closeModal}
      isOpen={isOpen}
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

        <div className={styles.radioItem}>
          <label>
            <Field
              name="blacklistAll"
              value="whitelist"
              type="radio"
              component="input"
            />
            Whitelist all current members
          </label>
          <Tooltip message="(Recommended) Afterwards you may want to Blacklist certain members in the community table" />
        </div>


        <div className={styles.radioItem}>
          <label>
            <Field
              name="blacklistAll"
              value="blacklist"
              type="radio"
              component="input"
            />
            Blacklist all current members
          </label>
          <Tooltip message="Afterwards you may want to whitelist individual members in the community table" />
        </div>

        <p className={styles.warning}>
          Warning, you cannot change a private community back to public at this
          time.
        </p>

        <div className={styles.buttonWrapper}>
          <Button
            theme="tertiary"
            content="Undo"
            type="button"
            clickHandler={() => closeModal()}
          />
          <Button
            {...input}
            theme="secondary"
            clickHandler={() => toggleIsPrivate(input)}
            content="Continue"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ManageCommunityPrivacy;
