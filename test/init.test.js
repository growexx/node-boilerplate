
const request = require('supertest');
const app = require('../server/server');
request(app);
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../server/models/user.model');
const Feedback = require('../server/models/feedback.model');
const UserSeed = require('./seed/user.seed');
const FeedbackSeed = require('./seed/feedback.seed');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);

describe('Data seeding', () => {
    it('Add user data', async () => {
        try {
            await Promise.all([
                User.insertMany(UserSeed.users),
                Feedback.insertMany(FeedbackSeed.feedback)
            ]);
        } catch (error) {
            assert.equal(null, error);
        }
    });

    it('Check server root url', async () => {
        try {
            request(process.env.BASE_URL)
                .get('/')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 'ok');
                });
        } catch (error) {
            assert.equal(null, error);
        }
    });
});
