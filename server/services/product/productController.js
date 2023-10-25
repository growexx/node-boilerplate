
const ProductService = require('./productService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for product.
 */
class ProductController {
    /**
     * @desc This function is being used to create a checkout session
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Number} req.body.productId productId
     * @param {String} req.body.quantity quantity
     * @param {function} res Response
     */
    static async checkoutProducts (req, res) {
        try {
            const data = await ProductService.checkoutProducts(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            console.error(error,'hiten>')
            Utils.sendResponse(error, null, res, error.message);
        }
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
    static async createPaymentIntent (req, res) {
        try {
            const data = await ProductService.createPaymentIntent(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to get products list
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Number} req.body.limit limit
     * @param {String} req.body.startingAfter startingAfter
     * @param {String} req.body.endingBefore endingBefore
     * @param {function} res Response
     */
    static async getProducts (req, res) {
        try {
            const data = await ProductService.getProducts(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
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
    static async createProduct (req, res) {
        try {
            const data = await ProductService.createProduct(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.PRODUCT_CREATE_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to update a product
     * @author Growexx
     * @since 23/10/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.productId productId
     * @param {String} req.body.name name
     * @param {String} req.body.description description
     * @param {Number} req.body.price price
     * @param {Boolean} req.body.recurring recurring
     * @param {String} req.body.recurringInterval recurringInterval
     * @param {function} res Response
     */
    static async updateProduct (req, res) {
        try {
            const data = await ProductService.updateProduct(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.PRODUCT_UPDATE_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
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
    static async archiveProduct (req, res) {
        try {
            const data = await ProductService.archiveProduct(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
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
    static async unarchiveProduct (req, res) {
        try {
            const data = await ProductService.unarchiveProduct(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = ProductController;
