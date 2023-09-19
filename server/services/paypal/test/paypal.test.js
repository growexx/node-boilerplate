const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const axios = require('axios');
const sinon = require('sinon');

describe('Paypal create payment', () => {
    try {
        let axiosStub;
        beforeEach(() => {
            axiosStub = sinon.stub(axios, 'post');
        });

        afterEach(() => {
            axiosStub.restore();
        });

        it('As a user, I should not able to create payment order if access token is invalid.', (done) => {
            const INVALID_TOKEN = 'Invalid access token';
            axiosStub.onFirstCall().rejects(new Error(INVALID_TOKEN));
            axiosStub.onSecondCall().resolves({ data: { data: 'token' } });
            request(process.env.BASE_URL)
                .post('/paypal/create')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    assert.equal(res.body.message, INVALID_TOKEN);
                    done();
                });
        });

        it('As a user, I should able to create payment order in paypal.', (done) => {
            axiosStub.onFirstCall().resolves({ data: { access_token: 'token' } });
            axiosStub.onSecondCall().resolves({ data: { data: 'token' } });
            request(process.env.BASE_URL)
                .post('/paypal/create')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Paypal capture payment', () => {
    try {
        let axiosStub;
        beforeEach(() => {
            axiosStub = sinon.stub(axios, 'post');
        });

        afterEach(() => {
            axiosStub.restore();
        });

        it('As a user, I should validate if orderId is not passed', async () => {
            request(process.env.BASE_URL)
                .post('/paypal/capture')
                .send({ orderId: '' })
                .end((err, res)=>{
                    assert.equal(res.statusCode, 400);
                })
        });

        it('As a user, I should not able to capture payment order if access token is invalid.', (done) => {
            const INVALID_TOKEN = 'Invalid access token';
            axiosStub.onFirstCall().rejects(new Error(INVALID_TOKEN));
            axiosStub.onSecondCall().resolves({ data: { data: 'token' } });
            request(process.env.BASE_URL)
                .post('/paypal/capture')
                .send({ orderId: 'id' })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    assert.equal(res.body.message, INVALID_TOKEN);
                    done();
                });
        });

        it('As a user, I should able to capture the payment', async () => {
            axiosStub.onFirstCall().resolves({ data: { access_token: 'token' } });
            axiosStub.onSecondCall().resolves({ data: { data: 'token' } });
            const res = await request(process.env.BASE_URL)
                .post('/paypal/capture')
                .send({ orderId: '123456' });
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
