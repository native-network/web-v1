import React from 'react';

function KYCTesting({ kycApplicantId }) {
  return (
    <span id="kycApplicantId" style={{ display: 'none' }}>
      {kycApplicantId}
    </span>
  );
}

export default KYCTesting;
