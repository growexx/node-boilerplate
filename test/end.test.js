const chai = require('chai');
const assert = chai.assert;
const User = require('../server/models/user.model');
const Feedback = require('../server/models/feedback.model');

describe('Delete records after testcase executed', () => {

    it('Delete user records after test comeplete', (done) => {
        Promise.all([
            User.deleteMany(),
            Feedback.deleteMany()
        ]).then(() => {
            done();
        }).catch(() => {
            assert(true, false);
        });
    });
});
