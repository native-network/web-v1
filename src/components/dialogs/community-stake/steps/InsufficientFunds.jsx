import React, { Fragment } from 'react';
import Button from '../../../shared/button';

function InsufficientFunds() {
  return (
    <Fragment>
      <h1>Purchase Native Community Currency</h1>
      <p>
        <strong>
          In order to join a tribe, you must first purchase Native Community
          Currency (NTV). Once you have Native Currency, you can use that to
          purchase the community currency of your choice and join that
          community.
        </strong>
      </p>
      <p>Please visit the dashboard and purchase Native Community Currency.</p>

      <Button centered theme="primary" content="Go To Dashboard" />
    </Fragment>
  );
}

export default InsufficientFunds;
