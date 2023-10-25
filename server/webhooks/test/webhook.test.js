const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const sinon = require('sinon');
const Stripe = require('../../util/stripe');
chai.use(chaiHttp);

describe('Stripe Webhook', () => {
    try {
        let constructWebhookEventStub;
        before(async () => {
            constructWebhookEventStub = sinon.stub(Stripe, 'constructWebhookEvent');
        });

        after(async ()=> {
            constructWebhookEventStub.restore();
        });

        it('should handle error during payment-intent event', (done) => {
            constructWebhookEventStub.throws();

            request(process.env.BASE_URL)
                .post('/webhook/stripe')
                .set({ 'stripe-signature': 'signature' })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });

        it('should handle canceled payment-intent event', (done) => {
            constructWebhookEventStub.returns({ type: 'payment_intent.canceled', data: { object: { id: 'id' } } });

            request(process.env.BASE_URL)
                .post('/webhook/stripe')
                .set({ 'stripe-signature': 'signature' })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('should handle failed payment-intent event', (done) => {
            constructWebhookEventStub.returns({ type: 'payment_intent.payment_failed', data: { object: { id: 'id' } } });

            request(process.env.BASE_URL)
                .post('/webhook/stripe')
                .set({ 'stripe-signature': 'signature' })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('should handle succeeded payment-intent event', (done) => {
            constructWebhookEventStub.returns({ type: 'payment_intent.succeeded', data: { object: { id: 'id' } } });

            request(process.env.BASE_URL)
                .post('/webhook/stripe')
                .set({ 'stripe-signature': 'signature' })
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
