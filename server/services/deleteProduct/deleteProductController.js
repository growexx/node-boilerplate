const Utils = require('../../util/utilFunctions');
const DeleteProductService = require('./deleteProductService');

/**
 * Class represents controller for Delete Product.
 */
class DeleteProductController {
  /**
   * @desc This function is being used to delete product
   * @author Growexx
   * @since 14/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async deleteProduct(req, res) {
    try {
      const data = await DeleteProductService.deleteProduct(req, res.__);
      Utils.sendResponse(null, data, res, MESSAGES.DELETE_PRODUCT_SUCCESS);
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }
}

module.exports = DeleteProductController;
