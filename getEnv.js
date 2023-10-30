#!/usr/bin/env node
'use strict';

const fs = require('fs').promises;
const env = process.env.NODE_ENV || 'local';
const retrieveSecrets = require('./server/util/retrieveSecrets');

module.exports = new Promise((resolve, reject) => {
    retrieveSecrets().then(async (secretsString) => {
        await fs.writeFile(`${env}.env`, secretsString);
        resolve();
    }).catch((error) => {
        reject(error);
    });
});
