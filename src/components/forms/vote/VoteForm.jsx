import React from 'react';
import { Form, Field } from 'react-final-form';
import shortid from 'shortid';

import Button from '../../shared/button';

import styles from './VoteForm.css';

export default function VoteForm({ displayTitle, submitForm, options }) {
  const grabValues = (values) => {
    const option = options.find((o) => o.name === values.voteOption);
    return option ? submitForm(option.id) : null;
  };

  function renderOption(option) {
    const id = shortid.generate();
    return (
      <div style={{ width: '100%' }} key={option.index}>
        <Field
          name="voteOption"
          value={option.name}
          type="radio"
          render={({ input }) => {
            return (
              <div className={styles.Vote}>
                <input
                  id={`${id}-${option.index}`}
                  className={styles.VoteRadio}
                  {...input}
                  type="radio"
                />
                <label
                  htmlFor={`${id}-${option.index}`}
                  className={styles.VoteLabel}
                >
                  {option.name}
                </label>
              </div>
            );
          }}
        />
      </div>
    );
  }

  return (
    <Form
      onSubmit={grabValues}
      render={({ handleSubmit, form, pristine, invalid }) => (
        <form className={styles.VoteForm} onSubmit={handleSubmit}>
          {displayTitle && <h3>Please select one option:</h3>}
          {(options || []).map((option, index) =>
            renderOption({ index, ...option }),
          )}
          <Button
            disabled={pristine || invalid}
            className={styles.VoteSubmit}
            block
            theme="primary"
            content="Submit Vote"
          />
        </form>
      )}
    />
  );
}
