import React from 'react';
import { s3Path } from '../../../requests';

function S3Image({ fileName, className, ...props }) {
  const filePath = s3Path(fileName);
  return <img src={filePath} className={className} {...props} />;
}

export default S3Image;
