const chai = require('chai');
const sinon = require('sinon');
const Stripe = require('../stripe');
const expect = chai.expect;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

describe('Stripe', () => {
    it('I should be able to create checkout session', async () => {
        const stripeCheckoutMock = { url: 'url' };
        const stripeCheckoutStub = sinon.stub(stripe.checkout.sessions, 'create');
        stripeCheckoutStub.resolves(stripeCheckoutMock);

        const sessionData = await Stripe.createCheckoutSession(
            { productId: 'id', quantity: 1 },
            stripe
        );
        expect(sessionData).to.deep.equal({
            url: stripeCheckoutMock.url
        });
        stripeCheckoutStub.restore();
    });

    it('I should be able to create payment intent', async () => {
        const stripePaymentIntentMock = { id: 'id', client_secret: 'secret' };
        const stripePaymentIntentStub = sinon.stub(stripe.paymentIntents, 'create');
        stripePaymentIntentStub.resolves(stripePaymentIntentMock);

        const sessionData = await Stripe.createPaymentIntent(100, stripe);
        expect(sessionData).to.deep.equal({
            paymentIntentId: stripePaymentIntentMock.id,
            clientSecret: stripePaymentIntentMock.client_secret
        });
        stripePaymentIntentStub.restore();
    });

    it('I should be able to get products', async () => {
        const stripeGetProductMock = { data: { id: 'id' } };
        const stripeGetProductStub = sinon.stub(stripe.products, 'list');
        stripeGetProductStub.resolves(stripeGetProductMock);

        const sessionData = await Stripe.getProducts(
            { limit: 1, startingAfter: '1', endingBefore: '2' },
            stripe
        );
        expect(sessionData).to.deep.equal({
            id: 'id'
        });
        stripeGetProductStub.restore();
    });

    it('I should be able to create products', async () => {
        const stripeProductMock = { id: 'product-id' };
        const stripeProductStub = sinon.stub(stripe.products, 'create');
        const stripePriceStub = sinon.stub(stripe.prices, 'create');
        const stripeProductUpdateStub = sinon.stub(stripe.products, 'update');
        stripeProductStub.resolves(stripeProductMock);
        stripePriceStub.resolves({ id: 'price-id' });
        stripeProductUpdateStub.resolves({ id: 'product-id' });
        const sessionData = await Stripe.createProduct(
            {
                name: 'test',
                description: 'test',
                price: '100'

            },
            stripe
        );
        expect(sessionData).to.deep.equal({
            stripeProductId: 'product-id',
            stripePriceId: 'price-id',
            name: 'test',
            description: 'test',
            price: '100',
            recurring: false,
            recurringInterval: null
        });
        stripeProductStub.restore();
        stripePriceStub.restore();
        stripeProductUpdateStub.restore();
    });

    it('I should be able to create products for recurring payment', async () => {
        const stripeProductMock = { id: 'product-id' };
        const stripeProductStub = sinon.stub(stripe.products, 'create');
        const stripePriceStub = sinon.stub(stripe.prices, 'create');
        const stripeProductUpdateStub = sinon.stub(stripe.products, 'update');
        stripeProductStub.resolves(stripeProductMock);
        stripePriceStub.resolves({ id: 'price-id' });
        stripeProductUpdateStub.resolves({ id: 'product-id' });
        const sessionData = await Stripe.createProduct(
            {
                name: 'test',
                description: 'test',
                price: '100',
                recurring: true,
                recurringInterval: 'monthly'
            },
            stripe
        );
        expect(sessionData).to.deep.equal({
            stripeProductId: 'product-id',
            stripePriceId: 'price-id',
            name: 'test',
            description: 'test',
            price: '100',
            recurring: true,
            recurringInterval: 'monthly'
        });
        stripeProductStub.restore();
        stripePriceStub.restore();
        stripeProductUpdateStub.restore();
    });

    it('I should be able to update products', async () => {
        const stripeProductMock = { id: 'product-id' };
        const stripeProductStub = sinon.stub(stripe.products, 'create');
        const stripePriceStub = sinon.stub(stripe.prices, 'create');
        const stripePriceRetrieveStub = sinon.stub(stripe.prices, 'retrieve');
        const stripeProductUpdateStub = sinon.stub(stripe.products, 'update');
        stripeProductStub.resolves(stripeProductMock);
        stripePriceStub.resolves({ id: 'price-id', unit_amount_decimal: '10000', recurring: { interval: 'monthly' } });
        stripePriceRetrieveStub.resolves({ id: 'price-id', recurring: true });
        stripeProductUpdateStub.resolves({ id: 'product-id', name: 'test', description: 'test', unit_amount_decimal: '10000' });
        const sessionData = await Stripe.updateProduct(
            {
                name: 'test',
                description: 'test',
                price: '100',
                recurring: true,
                recurringInterval: 'monthly'
            },
            stripe
        );
        expect(sessionData).to.deep.equal({
            stripeProductId: 'product-id',
            stripePriceId: 'price-id',
            name: 'test',
            description: 'test',
            price: '100',
            recurring: true,
            recurringInterval: 'monthly'
        });
        stripeProductStub.restore();
        stripePriceStub.restore();
        stripePriceRetrieveStub.restore();
        stripeProductUpdateStub.restore();
    });

    it('I should be able to update products without price', async () => {
        const stripeProductMock = { id: 'product-id' };
        const stripeProductStub = sinon.stub(stripe.products, 'create');
        const stripePriceStub = sinon.stub(stripe.prices, 'create');
        const stripePriceRetrieveStub = sinon.stub(stripe.prices, 'retrieve');
        const stripeProductUpdateStub = sinon.stub(stripe.products, 'update');
        stripeProductStub.resolves(stripeProductMock);
        stripePriceStub.resolves({ id: 'price-id', unit_amount_decimal: '10000', recurring: { interval: 'monthly' } });
        stripePriceRetrieveStub.resolves({ id: 'price-id', recurring: true });
        stripeProductUpdateStub.resolves({ id: 'product-id', name: 'test', description: 'test', unit_amount_decimal: '10000' });
        const sessionData = await Stripe.updateProduct(
            {
                name: 'test',
                description: 'test',
                recurring: true
            },
            stripe
        );
        expect(sessionData).to.deep.equal({
            stripeProductId: 'product-id',
            stripePriceId: 'price-id',
            name: 'test',
            description: 'test',
            price: '100',
            recurring: true,
            recurringInterval: 'monthly'
        });
        stripeProductStub.restore();
        stripePriceStub.restore();
        stripePriceRetrieveStub.restore();
        stripeProductUpdateStub.restore();
    });

    it('I should be able to update products without recurring', async () => {
        const stripeProductMock = { id: 'product-id' };
        const stripeProductStub = sinon.stub(stripe.products, 'create');
        const stripePriceStub = sinon.stub(stripe.prices, 'create');
        const stripePriceRetrieveStub = sinon.stub(stripe.prices, 'retrieve');
        const stripeProductUpdateStub = sinon.stub(stripe.products, 'update');
        stripeProductStub.resolves(stripeProductMock);
        stripePriceStub.resolves({ id: 'price-id', unit_amount_decimal: '10000', recurring: { interval: 'monthly' } });
        stripePriceRetrieveStub.resolves({ id: 'price-id', recurring: true });
        stripeProductUpdateStub.resolves({ id: 'product-id', name: 'test', description: 'test', unit_amount_decimal: '10000' });
        const sessionData = await Stripe.updateProduct(
            {
                name: 'test',
                description: 'test',
                price: '100'
            },
            stripe
        );
        expect(sessionData).to.deep.equal({
            stripeProductId: 'product-id',
            stripePriceId: 'price-id',
            name: 'test',
            description: 'test',
            price: '100',
            recurring: true,
            recurringInterval: 'monthly'
        });
        stripeProductStub.restore();
        stripePriceStub.restore();
        stripePriceRetrieveStub.restore();
        stripeProductUpdateStub.restore();
    });

    it('I should be able to update products without recurring and price', async () => {
        const stripeProductMock = { id: 'product-id' };
        const stripeProductStub = sinon.stub(stripe.products, 'create');
        const stripePriceStub = sinon.stub(stripe.prices, 'create');
        const stripePriceRetrieveStub = sinon.stub(stripe.prices, 'retrieve');
        const stripeProductUpdateStub = sinon.stub(stripe.products, 'update');
        stripeProductStub.resolves(stripeProductMock);
        stripePriceStub.resolves({ id: 'price-id', unit_amount_decimal: '10000', recurring: { interval: 'monthly' } });
        stripePriceRetrieveStub.resolves({ id: 'price-id', recurring: true, unit_amount_decimal: '10000' });
        stripeProductUpdateStub.resolves({ id: 'product-id', name: 'test', description: 'test', unit_amount_decimal: '10000' });
        const sessionData = await Stripe.updateProduct(
            {
                name: 'test',
                description: 'test'
            },
            stripe
        );
        expect(sessionData).to.deep.equal({
            stripeProductId: 'product-id',
            stripePriceId: 'price-id',
            name: 'test',
            description: 'test',
            price: '100',
            recurring: true,
            recurringInterval: null
        });
        stripeProductStub.restore();
        stripePriceStub.restore();
        stripePriceRetrieveStub.restore();
        stripeProductUpdateStub.restore();
    });

    it('I should be able to archive products', async () => {
        const stripeUpdateProductMock = { id: 'id' };
        const stripeUpdateProductStub = sinon.stub(stripe.products, 'update');
        stripeUpdateProductStub.resolves(stripeUpdateProductMock);

        await Stripe.archiveProduct(
            'product-id',
            stripe
        );
        expect(stripeUpdateProductStub.calledOnce).to.be.true;
        stripeUpdateProductStub.restore();
    });

    it('I should be able to unarchive products', async () => {
        const stripeUpdateProductMock = { data: { id: 'id' } };
        const stripeUpdateProductStub = sinon.stub(stripe.products, 'update');
        stripeUpdateProductStub.resolves(stripeUpdateProductMock);

        await Stripe.unarchiveProduct(
            'product-id',
            stripe
        );
        expect(stripeUpdateProductStub.calledOnce).to.be.true;
        stripeUpdateProductStub.restore();
    });

    it('I should be able to construct Webhook Event', async () => {
        const stripeConstructWebhookMock = { id: 'id' };
        const stripeConstructWebhookStub = sinon.stub(stripe.webhooks, 'constructEvent');
        stripeConstructWebhookStub.resolves(stripeConstructWebhookMock);

        const sessionData = await Stripe.constructWebhookEvent(
            { body: {} },
            { signature: {} },
            stripe
        );
        expect(sessionData).to.deep.equal({
            id: 'id'
        });
        stripeConstructWebhookStub.restore();
    });
});
