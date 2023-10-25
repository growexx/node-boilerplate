const chai = require('chai');
const assert = chai.assert;
const User = require('../server/models/user.model');
const Product = require('../server/models/product.model');
describe('Delete records after testcase executed', () => {

    it('Delete user records after test comeplete', (done) => {
        Promise.all([
            User.deleteMany(),
            Product.deleteMany()
        ]).then(() => {
            done();
        }).catch(() => {
            assert(true, false);
        });
    });
});
