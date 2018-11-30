import React from 'react';

import styles from './KYCTesting.css';

function KYCTesting({ kycApplicantId }) {
  return (
    <span id="kycApplicantId" className={styles.KYCApplicantId}>
      {kycApplicantId}
    </span>
  );
}

export default KYCTesting;
