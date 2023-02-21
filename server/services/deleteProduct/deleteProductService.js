const DeleteProductValidator = require('./deleteProductValidator');
const mongoose = require('mongoose');
const Product = require('../../models/product.model');

/**
 * Class represents services for Delete Product.
 */
class DeleteProductService {
  /**
   * @desc This function is being used to delete product
   * @author Growexx
   * @since 14/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async deleteProduct(req, locale) {
    const Validator = new DeleteProductValidator(req.body, locale);
    Validator.validate();
    const product = await DeleteProductService.isAvailable(req.body);

    if (product) {
      return await Product.deleteOne({
        _id: mongoose.Types.ObjectId(req.body.id),
      });
    } else {
      throw {
        message: MESSAGES.PRODUCT_NOT_FOUND,
        statusCode: 400,
      };
    }
  }

  /**
   * @desc This function is being used to check product is available
   * @author Growexx
   * @since 16/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async isAvailable(reqObj) {
    const where = { _id: mongoose.Types.ObjectId(reqObj.id) };
    return await Product.findOne(where).lean();
  }
}

module.exports = DeleteProductService;
