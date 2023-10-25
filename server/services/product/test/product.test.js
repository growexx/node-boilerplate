const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./productTestCases');
const Stripe = require('../../../util/stripe');
const sinon = require('sinon');
chai.use(chaiHttp);

describe('Checkout Products', () => {
    try {
        let createCheckoutSessionStub;
        before(async () => {
            createCheckoutSessionStub = sinon.stub(Stripe, 'createCheckoutSession');
        });

        after(async ()=> {
            createCheckoutSessionStub.restore();
        });

        TestCase.checkoutProducts.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/product/checkout')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should be able to checkout', (done) => {
            createCheckoutSessionStub.returns({ id: 'id', url: 'https://test.com' });

            request(process.env.BASE_URL)
                .post('/product/checkout')
                .send({ priceId: 'price_1LDSHESCAXtREmcDGtShMw53', quantity: 1, userId: '5f083c352a7908662c334532' })
                .end((err, res) => {
                    console.log(res.body,'hiten')
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Create Payment Intent', () => {
    try {
        let createPaymentIntentStub;
        before(async () => {
            createPaymentIntentStub = sinon.stub(Stripe, 'createPaymentIntent');
        });

        after(async ()=> {
            createPaymentIntentStub.restore();
        });

        TestCase.createPaymentIntent.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/product/create-payment-intent')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should be able to create a payment intent', (done) => {
            createPaymentIntentStub.returns({ paymentIntentId: 'pi_1234', clientSecret: 'secret' });

            request(process.env.BASE_URL)
                .post('/product/create-payment-intent')
                .send({
                    userId: '5f083c352a7908662c334532',
                    items: [{
                        stripePriceId: 'price_1LDRDwSCAXtREmcDIPwi170j',
                        quantity: 2
                    }]
                })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Get Products', () => {
    try {
        let getProductsStub;
        before(async () => {
            getProductsStub = sinon.stub(Stripe, 'getProducts');
        });

        after(async ()=> {
            getProductsStub.restore();
        });

        TestCase.getProducts.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .get('/product')
                    .query(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should be able to get products list', (done) => {
            getProductsStub.returns([]);

            request(process.env.BASE_URL)
                .get('/product')
                .query({ limit: 1 })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Create Product', () => {
    try {
        let createProductStub;
        before(async () => {
            createProductStub = sinon.stub(Stripe, 'createProduct');
        });

        after(async ()=> {
            createProductStub.restore();
        });

        TestCase.createProduct.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/product')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should be able to create a new product', (done)=>{
            createProductStub.returns({
                stripeProductId: 'prod_LvHUTgs5mtKAsH',
                stripePriceId: 'price_1LDSHESCAXtREmcDGtShMw53',
                name: 'test',
                description: 'testing',
                price: 123,
                recurring: false,
                recurringInterval: null
            });

            request(process.env.BASE_URL)
                .post('/product')
                .send({
                    name: 'test',
                    description: 'testing',
                    price: 123,
                    recurring: false
                })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Update Product', () => {
    try {
        let updateProductStub;
        before(async () => {
            updateProductStub = sinon.stub(Stripe, 'updateProduct');
        });

        after(async ()=> {
            updateProductStub.restore();
        });

        TestCase.updateProduct.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/product')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should be able to update an existing product', (done)=>{
            updateProductStub.returns({
                stripeProductId: 'prod_LvHnYRG67LmUPX',
                stripePriceId: 'price_1LDRDwSCAXtREmcDIPwi170j',
                name: 'test',
                description: 'testing',
                price: 123,
                recurring: false,
                recurringInterval: null
            });

            request(process.env.BASE_URL)
                .put('/product')
                .send({
                    productId: 'prod_LvHnYRG67LmUPX',
                    name: 'test',
                    description: 'testing',
                    price: 123,
                    recurring: false
                })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Archive Product', () => {
    try {
        let archiveProductStub;
        before(async () => {
            archiveProductStub = sinon.stub(Stripe, 'archiveProduct');
        });

        after(async ()=> {
            archiveProductStub.restore();
        });

        TestCase.archiveProduct.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/product/archive/' + data.productId)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should be able to archive a product', (done) => {
            archiveProductStub.returns();

            request(process.env.BASE_URL)
                .put('/product/archive/prod_LvHnYRG67LmUPX')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Unarchive Product', () => {
    try {
        let unarchiveProductStub;
        before(async () => {
            unarchiveProductStub = sinon.stub(Stripe, 'unarchiveProduct');
        });

        after(async ()=> {
            unarchiveProductStub.restore();
        });

        TestCase.unarchiveProduct.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/product/unarchive/' + data.productId)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should be able to unarchive a product', (done) => {
            unarchiveProductStub.returns();

            request(process.env.BASE_URL)
                .put('/product/unarchive/prod_LvHnYRG67LmUPX')
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

