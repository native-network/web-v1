/* eslint-disable */
import React, { Fragment } from 'react';
import { Field } from 'react-final-form';

import Modal from '../../shared/modal';
import Button from '../../shared/button';
import Tooltip from '../../shared/tooltip';
import styles from './ManageCommunityPrivacyModal.css';

const ManageCommunityPrivacy = (props) => {
  const { isOpen, closeModal, form } = props;

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

        <Field name="blacklistAll" type="radio">
          {({ input }) => (
            <div className={styles.radioItem}>
              <label>
                <input
                  type="radio"
                  {...input}
                  checked={!input.value}
                  onChange={() => false}
                />
                Whitelist all current members
              </label>
              <Tooltip message="(Recommended) Afterwords you may want to Blacklist certain members in the community table" />
            </div>
          )}
        </Field>

        <Field name="blacklistAll" type="radio">
          {({ input }) => (
            <div className={styles.radioItem}>
              <label>
                <input
                  type="radio"
                  {...input}
                  checked={input.value}
                  onChange={() => true}
                />
                Blacklist all current members
              </label>
              <Tooltip message="Afterwards you may want to whitelist individual members in the community table" />
            </div>
          )}
        </Field>

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
          <Field name="isPrivate">
            {({ input }) => (
              <Button
                theme="secondary"
                clickHandler={() => toggleIsPrivate(input)}
                content="Continue"
              />
            )}
          </Field>
        </div>
      </div>
    </Modal>
  );
};

export default ManageCommunityPrivacy;
