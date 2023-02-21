const AddProductValidator = require('./addProductValidator');
const Product = require('../../models/product.model');

/**
 * Class represents services for Add Product.
 */
class AddProductService {
  /**
   * @desc This function is being used to add product
   * @author Growexx
   * @since 14/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async addProduct(req, locale) {
    const Validator = new AddProductValidator(req.body, locale);
    Validator.validate();

    const product = await AddProductService.isAlreadyProduct(req.body);

    if (!product) {
      return await Product.create(req.body);
    } else {
      throw {
        message: MESSAGES.PRODUCT_ALREADY_EXISTS,
        statusCode: 400,
      };
    }
  }

  /**
   * @desc This function is being used to add product
   * @author Growexx
   * @since 16/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async isAlreadyProduct(reqObj) {
    const where = { foodName: reqObj.foodName };
    return await Product.findOne(where).lean();
  }
}

module.exports = AddProductService;
