const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'testing';
dotenv.config({ path: process.env.PWD + '/' + env + '.env' });
global.logger = require('../server/util/logger');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
const request = require('supertest');
request(app);

// Start testing
require('./init.test');

// Auth
require('../server/services/signup/test/signup.test');
require('../server/services/signin/test/signin.test');
require('../server/services/forgotPassword/test/forgotPassword.test');

// User
require('../server/services/userProfile/test/userProfile.test');
require('../server/services/pushNotification/test/pushNotification.test');

// End Testing
require('./end.test');

describe('Stop server in end', () => {
    it('Server should stop manually to get code coverage', done => {
        app.close();
        done();
    });
});
