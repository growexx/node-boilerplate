module.exports = {
    checkoutProducts: [{
        it: 'As a user, I should check priceId',
        options: {
            quantity: 1
        },
        status: 0
    },
    {
        it: 'As a user, I should check invalid priceId',
        options: {
            priceId: '123',
            quantity: 1
        },
        status: 0
    },
    {
        it: 'As a user, I should check quantity',
        options: {
            priceId: '123'
        },
        status: 0
    },
    {
        it: 'As a user, I should check invalid quantity',
        options: {
            priceId: 'price_1LDSHESCAXtREmcDGtShMw53',
            quantity: 'abc'
        },
        status: 0
    },
    {
        it: 'As a user, I should check invalid userId',
        options: {
            priceId: 'price_1LDSHESCAXtREmcDGtShMw53',
            quantity: 'abc',
            userId: ''
        },
        status: 0
    }],
    createPaymentIntent: [{
        it: 'As a user, I should check user id',
        options: {
            items: [{
                priceId: 'price_1LDSHESCAXtREmcDGtShMw53',
                quantity: 1
            }]
        },
        status: 0
    }, {
        it: 'As a user, I should check items',
        options: {
            userId: '123'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid price id in items',
        options: {
            userId: '123',
            items: [{
                stripePriceId: 'abc'
            }]
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid quantity in items',
        options: {
            userId: '123',
            items: [{
                stripePriceId: 'price_1LDSHESCAXtREmcDGtShMw53',
                quantity: 'abc'
            }]
        },
        status: 0
    }],
    getProducts: [{
        it: 'As a user, I should check limit',
        options: {
            startingAfter: 'prod_LvHUTgs5mtKAsH'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid limit',
        options: {
            limit: 'abc',
            startingAfter: 'prod_LvHUTgs5mtKAsH'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid startingAfter',
        options: {
            limit: 1,
            startingAfter: 'abc'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid endingBefore',
        options: {
            limit: 1,
            endingBefore: 'abc'
        },
        status: 0
    }],
    createProduct: [{
        it: 'As a user, I should check name',
        options: {
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid name',
        options: {
            name: 'abc*',
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check description',
        options: {
            name: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid description',
        options: {
            name: 'abc',
            description: 'abc*',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check price',
        options: {
            name: 'abc',
            description: 'abc',
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid price',
        options: {
            name: 'abc',
            description: 'abc',
            price: 'abc',
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check recurring',
        options: {
            name: 'abc',
            description: 'abc',
            price: 123,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid recurring',
        options: {
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: 'abc',
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check recurringInterval',
        options: {
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: true
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid recurringInterval',
        options: {
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'abc'
        },
        status: 0
    }],
    updateProduct: [{
        it: 'As a user, I should check productId',
        options: {
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid productId',
        options: {
            productId: 'abc',
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid name',
        options: {
            productId: 'prod_LvHUTgs5mtKAsH',
            name: 'abc*',
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid description',
        options: {
            productId: 'prod_LvHUTgs5mtKAsH',
            name: 'abc',
            description: 'abc*',
            price: 123,
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid price',
        options: {
            productId: 'prod_LvHUTgs5mtKAsH',
            name: 'abc',
            description: 'abc',
            price: 'abc',
            recurring: true,
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid recurring',
        options: {
            productId: 'prod_LvHUTgs5mtKAsH',
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: 'abc',
            recurringInterval: 'month'
        },
        status: 0
    }, {
        it: 'As a user, I should check invalid recurringInterval',
        options: {
            productId: 'prod_LvHUTgs5mtKAsH',
            name: 'abc',
            description: 'abc',
            price: 123,
            recurring: true,
            recurringInterval: 'abc'
        },
        status: 0
    }],
    archiveProduct: [{
        it: 'As a user, I should check invalid productId',
        productId: 'abc',
        status: 0
    }],
    unarchiveProduct: [{
        it: 'As a user, I should check invalid productId',
        productId: 'abc',
        status: 0
    }]
};
