'use strict';

const fs = require('fs');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

const dotenvFile = path.resolve(__dirname, '..', '.env');

if (fs.existsSync(dotenvFile)) {
  require('dotenv-expand')(
    require('dotenv').config({
      path: dotenvFile,
    }),
  );
}
