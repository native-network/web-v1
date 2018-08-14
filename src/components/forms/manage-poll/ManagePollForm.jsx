import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

import styles from './ManagePollForm.css';

import Button from '../../shared/button';
// import FilePicker from '../../shared/file-picker/FilePicker';

export default function ManagePollForm({ submitForm }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  // Validations
  // const required = (value) => (value ? undefined : 'Required');
  const charLength = (value) =>
    value && value.length >= 400 ? `400 Character limit` : undefined;
  const validateTitle = (value) =>
    value === 'test' ? 'must not be test' : undefined;

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { push },
        },
        pristine,
        invalid,
        values,
      }) => (
        <form className={styles.ManagePollForm} onSubmit={handleSubmit}>
          <div className={styles.ManagePollFields}>
            <Field name="title" validate={validateTitle}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Poll Title</label>
                  <input {...input} type="text" placeholder="Poll Title" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="description">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Poll Description</label>
                  <textarea
                    rows="6"
                    {...input}
                    placeholder="Poll Description"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="question" validate={charLength}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Poll Question</label>
                  <input {...input} type="text" placeholder="Poll Question" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <div className={styles.GroupedFieldGroup}>
              <h2>Options</h2>

              <FieldArray name="options">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <div key={name}>
                      <Field name={`options[${index}].name`} key={index}>
                        {({ input, meta }) => (
                          <div className={styles.FieldGroup}>
                            <label>Option {index + 1}</label>
                            <input {...input} type="text" />
                            {meta.error &&
                              meta.touched &&
                              renderError(meta.error)}
                          </div>
                        )}
                      </Field>
                    </div>
                  ))
                }
              </FieldArray>

              <Button
                centered
                type="button"
                theme="secondary"
                content="Add Option"
                clickHandler={() => push('options', undefined)}
              />
            </div>
            {/* <Field name="pollImage" component={FilePicker} type="file" /> */}
          </div>
          <code>{JSON.stringify(values)}</code>
          <Button
            centered
            type="submit"
            theme="secondary"
            disabled={pristine || invalid}
            content="Save"
          />
        </form>
      )}
    />
  );
}
