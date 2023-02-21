const EditProductValidator = require('./editProductValidator');
const Product = require('../../models/product.model');
const mongoose = require('mongoose');

/**
 * Class represents services for Edit Product.
 */
class EditProductService {
  /**
   * @desc This function is being used to edit product
   * @author Growexx
   * @since 14/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async editProduct(req, locale) {
    const Validator = new EditProductValidator(req.body, locale);
    Validator.validate();

    const isProduct = await Product.findOne({
      _id: mongoose.Types.ObjectId(req.body.id),
    });

    if (!isProduct) {
      throw {
        message: MESSAGES.PRODUCT_NOT_FOUND,
        statusCode: 400,
      };
    } else {
      await Product.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.id) },
        {
          $set: {
            foodName: req.body.foodName,
            foodType: req.body.foodType,
            price: req.body.price,
            quantity: req.body.quantity,
            extras: req.body.extras,
            isEnabled: req.body.isEnabled,
          },
        }
      );
      return {
        id: req.body.id,
        foodName: req.body.foodName,
        foodType: req.body.foodType,
        price: req.body.price,
        quantity: req.body.quantity,
        extras: req.body.extras,
        isEnabled: req.body.isEnabled,
      };
    }
  }
}

module.exports = EditProductService;
