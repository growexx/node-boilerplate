#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });
const app = require('./server/server');

if (process.env.SERVERLESS === 'false') {
    module.exports = app.listen(process.env.PORT, () => {
        CONSOLE_LOGGER.info('Server is started at : %s', process.env.PORT);
    });
} else {
    const serverless = require('serverless-http');
    module.exports.handler = serverless(app);
    CONSOLE_LOGGER.info('Serverless project is started');
}
