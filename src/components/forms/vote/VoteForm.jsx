import React from 'react';
import { Form, Field } from 'react-final-form';

import Button from '../../shared/button';

import styles from './VoteForm.css';

export default function VoteForm({ submitForm, options }) {
  const grabValues = (values) => {
    console.log(values) // eslint-disable-line
    const option = options.find((o) => o.name === values.voteOption);
    return option ? submitForm(option.id) : null;
  };

  function renderOption(option) {
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
                  id={`foo-${option.index}`}
                  className={styles.VoteRadio}
                  {...input}
                  type="radio"
                />
                <label
                  htmlFor={`foo-${option.index}`}
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
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <h3>Please select one option:</h3>
          {(options || []).map((option, index) =>
            renderOption({ index, ...option }),
          )}
          <Button centered block theme="secondary" content="Submit Vote" />
        </form>
      )}
    />
  );
}
