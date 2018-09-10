import React from 'react';
import { Form, Field } from 'react-final-form';

import Button from '../../shared/button';

export default function VoteForm({ submitForm, options }) {
  const grabValues = ({ voteOption }) => {
    const option = options.find((o) => o.name === voteOption);
    return option ? submitForm(option.id) : null;
  };

  function renderOption(option) {
    return (
      <div key={option.index}>
        {option.name}{' '}
        <Field
          name="voteOption"
          value={option.name}
          type="radio"
          component="input"
        />
      </div>
    );
  }

  return (
    <Form
      onSubmit={grabValues}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          {(options || []).map((option, i) =>
            renderOption({ index: i, ...option }),
          )}
          <Button centered theme="secondary" content="Submit Vote" />
        </form>
      )}
    />
  );
}
