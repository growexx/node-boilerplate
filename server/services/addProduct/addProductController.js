const Utils = require('../../util/utilFunctions');
const AddProductService = require('./addProductService');

/**
 * Class represents controller for Add Product.
 */
class AddProductController {
  /**
   * @desc This function is being used to add product
   * @author Growexx
   * @since 14/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async addProduct(req, res) {
    try {
      const data = await AddProductService.addProduct(req, res.__);
      Utils.sendResponse(null, data, res, MESSAGES.ADD_PRODUCT_SUCCESS);
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }
}

module.exports = AddProductController;
