const validation = require('../../util/validation');
const GeneralError = require('../../util/GeneralError');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';

/**
 * Class represents validations for user Basic Profile.
 */
class ProductValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate request for checkout
     * @author Growexx
     * @since 23/10/2023
     */
    checkoutProductsValidate () {
        this.required(this.body.priceId, 'Price Id');
        this.required(this.body.quantity, 'Quantity');
        this.number(this.body.quantity, 'Quantity');
        this.priceId(this.body.priceId);
        this.required(this.body.userId, 'User Id');
    }

    /**
     * @desc This function is being used to validate request for getting product list
     * @author Growexx
     * @since 23/10/2023
     */
    getProductsValidate () {
        this.required(this.body.limit, 'Limit');
        this.number(this.body.limit, 'Limit');
        this.productId(this.body.startingAfter);
        this.productId(this.body.endingBefore);
    }

    /**
     * @desc This function is being used to validate request for creating a new product
     * @author Growexx
     * @since 23/10/2023
     */
    createProductValidate () {
        this.required(this.body.name, 'Name');
        this.required(this.body.description, 'Description');
        this.required(this.body.price, 'Price');
        this.required(this.body.recurring, 'Recurring');
        this.body.recurring && this.required(this.body.recurringInterval, 'Recurring Interval');
        this.number(this.body.price, 'Price');
        this.name(this.body.name);
        this.description(this.body.description);
        this.recurring(this.body.recurring);
        this.recurringInterval(this.body.recurringInterval);
    }

    /**
     * @desc This function is being used to validate request for creating a new payment intent
     * @author Growexx
     * @since 23/10/2023
     */
    createPaymentIntentValidate () {
        this.required(this.body.userId, 'User Id');
        this.required(this.body.items, 'Items');
        this.items(this.body.items);
    }

    /**
     * @desc This function is being used to validate request for updating a product
     * @author Growexx
     * @since 23/10/2023
     */
    updateProductValidate () {
        this.required(this.body.productId, 'Product Id');
        this.number(this.body.price, 'Price');
        this.productId(this.body.productId);
        this.name(this.body.name);
        this.description(this.body.description);
        this.recurring(this.body.recurring);
        this.recurringInterval(this.body.recurringInterval);
    }

    /**
     * @desc This function is being used to validate request for archiving a product
     * @author Growexx
     * @since 23/10/2023
     */
    archiveProductValidate () {
        this.productId(this.body.productId);
    }

    /**
     * @desc This function is being used to validate request for un-archiving a product
     * @author Growexx
     * @since 23/10/2023
     */
    unarchiveProductValidate () {
        this.productId(this.body.productId);
    }

    /**
     * @desc This function is being used to validate a required field
     * @author Growexx
     * @since 23/10/2023
     */
    required (field, name) {
        if (!field && typeof (field) !== 'boolean') {
            throw new GeneralError(this.__(REQUIRED, name), 400);
        }
    }

    /**
     * @desc This function is being used to validate product name
     * @author Growexx
     * @since 23/10/2023
     */
    name (name) {
        if (name && !CONSTANTS.REGEX.ALPHA_SPECIAL_CHAR.test(name)) {
            throw new GeneralError(this.__(INVALID, 'Name'), 400);
        }
    }

    /**
     * @desc This function is being used to validate product description
     * @author Growexx
     * @since 23/10/2023
     */
    description (description) {
        if (description && !CONSTANTS.REGEX.ALPHA_SPECIAL_CHAR.test(description)) {
            throw new GeneralError(this.__(INVALID, 'Description'), 400);
        }
    }

    /**
     * @desc This function is being used to validate if the product is recurring
     * @author Growexx
     * @since 23/10/2023
     */
    recurring (recurring) {
        if (typeof (recurring) !== 'boolean') {
            throw new GeneralError(this.__(INVALID, 'Recurring'), 400);
        }
    }

    /**
     * @desc This function is being used to validate recurring interval of the product
     * @author Growexx
     * @since 23/10/2023
     */
    recurringInterval (recurringInterval) {
        if (recurringInterval && CONSTANTS.STRIPE_RECURRING_INTERVALS.indexOf(recurringInterval) === -1) {
            throw new GeneralError(this.__(INVALID, 'Recurring Interval'), 400);
        }
    }

    /**
     * @desc This function is being used to validate productId
     * @author Growexx
     * @since 23/10/2023
     */
    productId (productId) {
        if (productId && !CONSTANTS.REGEX.STRIPE_PRODUCT_ID.test(productId)) {
            throw new GeneralError(this.__(INVALID, 'Product Id'), 400);
        }
    }

    /**
     * @desc This function is being used to validate priceId
     * @author Growexx
     * @since 23/10/2023
     */
    priceId (priceId) {
        if (priceId && !CONSTANTS.REGEX.STRIPE_PRICE_ID.test(priceId)) {
            throw new GeneralError(this.__(INVALID, 'Price Id'), 400);
        }
    }

    /**
     * @desc This function is being used to validate numeric value
     * @author Growexx
     * @since 23/10/2023
     */
    number (field, name) {
        if (field && (!CONSTANTS.REGEX.NUMERIC_ONLY.test(field) && typeof (field) !== 'number')) {
            throw new GeneralError(this.__(INVALID, name), 400);
        }
    }

    /**
     * @desc This function is being used to validate items
     * @author Growexx
     * @since 23/10/2023
     */
    items (items) {
        items.forEach(item => {
            if (!(item.stripePriceId && item.quantity)) {
                throw new GeneralError(this.__(INVALID, 'Items'), 400);
            }

            this.priceId(item.stripePriceId);
            this.number(item.quantity, 'Quantity');
        });
    }
}

module.exports = ProductValidator;
