const Utils = require('../../util/utilFunctions');
const EditProductService = require('./editProductService');

/**
 * Class represents controller for Edit Product.
 */
class EditProductController {
  /**
   * @desc This function is being used to edit product
   * @author Growexx
   * @since 14/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async editProduct(req, res) {
    try {
      const data = await EditProductService.editProduct(req, res.__);
      Utils.sendResponse(null, data, res, MESSAGES.EDIT_PRODUCT_SUCCESS);
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }
}

module.exports = EditProductController;
