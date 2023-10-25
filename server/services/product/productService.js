const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Stripe = require('../../util/stripe');
const ProductValidator = require('./productValidator');
const Product = require('../../models/product.model');
const Payment = require('../../models/payment.model');
/**
 * Class represents services for product.
*/
class ProductService {
    /**
     * @desc This function is being used to create a checkout session
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Number} req.body.priceId priceId
     * @param {String} req.body.quantity quantity
     * @param {function} res Response
     */
    static async checkoutProducts (req, locale) {
        const Validator = new ProductValidator(req.body, locale);
        Validator.checkoutProductsValidate();

        const product = await Product.findOne({ stripePriceId: req.body.priceId });
        const session = await Stripe.createCheckoutSession(req.body, stripe);

        await Payment.create({
            userId: req.body.userId,
            stripeProductId: product.stripeProductId,
            stripePriceId: product.stripePriceId,
            price: product.price,
            quantity: req.body.quantity,
            amount: Number(product.price) * Number(req.body.quantity),
            recurring: product.recurring,
            recurringInterval: product.recurringInterval,
            paymentIntentId: session.id
        });

        return { url: session.url };
    }

    /**
     * @desc This function is being used to create a payment intent
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.userId userId
     * @param {Object[]} req.body.items items
     * @param {String} req.body.items.stripePriceId stripePriceId
     * @param {Number} req.body.items.quantity quantity
     * @param {function} res Response
     */
    static async createPaymentIntent (req, locale) {
        const Validator = new ProductValidator(req.body, locale);
        Validator.createPaymentIntentValidate();

        const priceData = {};
        let totalAmount = 0;
        req.body.items.forEach(item => priceData[item.stripePriceId] = item.quantity);

        const productData = await Product.find({ stripePriceId: { '$in': Object.keys(priceData) } });

        const paymentData = productData.map(product=>{
            totalAmount += product.price * priceData[product.stripePriceId];

            return {
                userId: req.body.userId,
                stripeProductId: product.stripeProductId,
                stripePriceId: product.stripePriceId,
                price: product.price,
                quantity: priceData[product.stripePriceId],
                amount: product.price * priceData[product.stripePriceId],
                recurring: product.recurring,
                recurringInterval: product.recurringInterval
            };
        });

        const paymentIntentData = await Stripe.createPaymentIntent(totalAmount, stripe);

        paymentData.forEach(data => data.paymentIntentId = paymentIntentData.paymentIntentId );

        await Payment.insertMany(paymentData);

        return { secret: paymentIntentData.clientSecret };
    }

    /**
     * @desc This function is being used to get products list
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.query RequestQuery
     * @param {Number} req.query.limit limit
     * @param {String} req.query.startingAfter startingAfter
     * @param {String} req.query.endingBefore endingBefore
     * @param {function} res Response
     */
    static async getProducts (req, locale) {
        const Validator = new ProductValidator(req.query, locale);
        Validator.getProductsValidate();

        const products = await Stripe.getProducts(req.query, stripe);

        return { products };
    }

    /**
     * @desc This function is being used to create a new product
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.name name
     * @param {String} req.body.description description
     * @param {Number} req.body.price price
     * @param {Boolean} req.body.recurring recurring
     * @param {String} req.body.recurringInterval recurringInterval
     * @param {function} res Response
     */
    static async createProduct (req, locale) {
        const Validator = new ProductValidator(req.body, locale);
        Validator.createProductValidate();

        const productData = await Stripe.createProduct(req.body, stripe);

        await Product.create({
            stripeProductId: productData.stripeProductId,
            stripePriceId: productData.stripePriceId,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            recurring: productData.recurring,
            recurringInterval: productData.recurringInterval,
            active: true
        });
    }

    /**
     * @desc This function is being used to update a product
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.productId productId
     * @param {String} [req.body.name] name
     * @param {String} [req.body.description] description
     * @param {Number} [req.body.price] price
     * @param {Boolean} [req.body.recurring] recurring
     * @param {String} [req.body.recurringInterval] recurringInterval
     * @param {function} res Response
     */
    static async updateProduct (req, locale) {
        const Validator = new ProductValidator(req.body, locale);
        Validator.updateProductValidate();

        const productData = await Stripe.updateProduct(req.body, stripe);

        await Product.updateOne({ stripeProductId: productData.stripeProductId },{
            stripePriceId: productData.stripePriceId,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            recurring: productData.recurring,
            recurringInterval: productData.recurringInterval
        });
    }

    /**
     * @desc This function is being used to archive a product
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.params RequestParams
     * @param {String} req.params.productId productId
     * @param {function} res Response
     */
    static async archiveProduct (req, locale) {
        const Validator = new ProductValidator(req.params, locale);
        Validator.archiveProductValidate();

        await Stripe.archiveProduct(req.params.productId, stripe);
        await Product.updateOne({ stripeProductId: req.params.productId });
    }

    /**
     * @desc This function is being used to unarchive a product
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.params RequestParams
     * @param {String} req.params.productId productId
     * @param {function} res Response
     */
    static async unarchiveProduct (req, locale) {
        const Validator = new ProductValidator(req.params, locale);
        Validator.unarchiveProductValidate();

        await Stripe.unarchiveProduct(req.params.productId, stripe);
        await Product.updateOne({ stripeProductId: req.params.productId },{ active: true });
    }
}

module.exports = ProductService;
