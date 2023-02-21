const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAddProduct');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
  algorithm: 'HS256',
  expiresIn: 86400,
};
const admin = {
  id: '5f5f2cd2f1472c3303b6b861',
  email: 'super@mailinator.com',
};
const requestPayloadUser = {
  token: jwt.sign(admin, process.env.JWT_SECRET, tokenOptionalInfo),
};

describe('Add Product', () => {
  try {
    TestCase.addProduct.forEach((data) => {
      it(data.it, (done) => {
        request(process.env.BASE_URL)
          .post('/product')
          .set({ Authorization: requestPayloadUser.token })
          .send(data.options)
          .end((err, res) => {
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, data.status);
            done();
          });
      });
    });
  } catch (exception) {
    CONSOLE_LOGGER.error(exception);
  }
});
