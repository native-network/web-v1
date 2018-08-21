/* eslint-disable */
import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import styles from './ManagePollForm.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import Button from '../../shared/button';
// import FilePicker from '../../shared/file-picker/FilePicker';

export default function ManagePollForm({ submitForm }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  const required = (value) => (value ? undefined : 'Required');
  const validateTitle = (value) =>
    value.length > 9 ? undefined : 'Must be atleast 10 characters';
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      mutators={{
        ...arrayMutators,
      }}
      initialValues={{
        options: [{}, {}],
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { push },
        },
        pristine,
        invalid,
      }) => (
        <form className={styles.ManagePollForm} onSubmit={handleSubmit}>
          <div className={styles.ManagePollFields}>
            <div className={styles.GroupedFieldGroup}>
              <Field
                name="title"
                validate={composeValidators(required, validateTitle)}
              >
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
              <Field name="question" validate={required}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Poll Question</label>
                    <input {...input} type="text" placeholder="Poll Question" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="endDate" validate={required}>
                {({ input }) => (
                  <div className={styles.FieldGroup}>
                    <label>End date</label>
                    <DatePicker
                      {...input}
                      minDate={moment().add(1, 'days')}
                      selected={
                        input.value ? moment(input.value, 'MM/DD/YYYY') : null
                      }
                      onChange={(date) =>
                        input.onChange(moment(date).format('MM/DD/YYYY'))
                      }
                    />
                  </div>
                )}
              </Field>
              <p>Poll will start today: {moment().format('MM/DD/YYYY')}</p>
            </div>

            <div className={styles.GroupedFieldGroup}>
              <FieldArray name="options">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <div key={name}>
                      <Field
                        name={`options[${index}].name`}
                        key={index}
                        validate={index < 2 ? required : ''}
                      >
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
