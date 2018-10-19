import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../actions/userSessionActions';
import Button from '../../../components/shared/button';
import DropDown from '../../../components/shared/drop-down';

import countries from '../../../utils/countries.json';
import regions from '../../../utils/regions.json';

import styles from './EditProfile.css';

function EditProfile({ user, updateUser }) {
  const activeCountry = countries.find((c) => c.alpha2 === user.country);
  const activeState = regions
    .filter((r) => r.country === user.country)
    .find((r) => r.name === user.state);

  return user.address ? (
    <Form
      initialValues={{
        address: user.address,
        alias: user.alias,
        country: activeCountry || {},
        state: activeState || '',
        city: user.city,
        email: user.email,
        telegram: user.telegram,
        preferredContact: user.preferredContact,
      }}
      onSubmit={(values) => {
        const { country, state } = values;
        const updatedCountry =
          typeof country === 'object' ? country.alpha2 : country;
        const updatedState = typeof state === 'object' ? state.name : state;

        return updateUser(user, {
          ...values,
          country: updatedCountry,
          state: updatedState,
        });
      }}
    >
      {({ handleSubmit, values, form }) => {
        const formState = form.getState();
        const { country } = formState.values;

        return (
          <form className={styles.EditProfile} onSubmit={handleSubmit}>
            <Field name="address">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>Address</label>
                  <input disabled readOnly type="text" {...input} />
                </div>
              )}
            </Field>
            <Field name="alias">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>Alias</label>
                  <input type="text" {...input} />
                </div>
              )}
            </Field>
            <Field name="country">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>Country</label>
                  <DropDown
                    {...input}
                    itemToString={(item) => (item ? item.label : '')}
                    items={countries}
                    activeItem={activeCountry}
                  />
                </div>
              )}
            </Field>
            {country &&
            !!regions.filter(
              (region) =>
                typeof country === 'object' &&
                region.country === country.alpha2,
            ).length ? (
              <Field name="state">
                {({ input }) => (
                  <div className={styles.FieldGroup}>
                    <label>State/Province/Region</label>
                    <DropDown
                      {...input}
                      itemToString={(item) => (item ? item.name : '')}
                      activeItem={activeState}
                      items={
                        country
                          ? regions.filter(
                              (region) => region.country === country.alpha2,
                            )
                          : []
                      }
                    />
                  </div>
                )}
              </Field>
            ) : null}
            <Field name="city">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>City</label>
                  <input type="text" {...input} />
                </div>
              )}
            </Field>
            <div className={styles.FieldGroup}>
              <label>Preferred Contact Method:</label>
              <ul className={styles.RadioList}>
                <li>
                  <Field
                    id="radioEmail"
                    className={styles.RadioInput}
                    name="preferredContact"
                    value="email"
                    type="radio"
                    component="input"
                  />
                  <label htmlFor="radioEmail" className={styles.RadioLabel}>
                    Email
                  </label>
                </li>
                <li>
                  <Field
                    id="radioTelegram"
                    className={styles.RadioInput}
                    name="preferredContact"
                    value="telegram"
                    type="radio"
                    component="input"
                  />
                  <label htmlFor="radioTelegram" className={styles.RadioLabel}>
                    Telegram
                  </label>
                </li>
              </ul>
            </div>
            <Field name="email">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>
                    Email
                    {values.preferredContact === 'email' ? `*` : null}
                  </label>
                  <input
                    type="email"
                    {...input}
                    required={values.preferredContact === 'email'}
                  />
                </div>
              )}
            </Field>
            <Field name="telegram">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>
                    Telegram
                    {values.preferredContact === 'telegram' ? `*` : null}
                  </label>
                  <input
                    type="text"
                    {...input}
                    required={values.preferredContact === 'telegram'}
                  />
                </div>
              )}
            </Field>

            <Button
              type="submit"
              theme="secondary"
              centered
              content="Update your profile"
            />
          </form>
        );
      }}
    </Form>
  ) : null;
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(EditProfile);
