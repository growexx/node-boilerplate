const Utils = require('../../util/utilFunctions');
const GetProductService = require('./getProductService');

/**
 * Class represents controller for Get Product.
 */
class GetProductController {
  /**
   * @desc This function is being used to get list of all product
   * @author Growexx
   * @since 20/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async getProduct(req, res) {
    const data = await GetProductService.getProduct(req, res.__);
    Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
  }

  /**
   * @desc This function is being used to get details of a product
   * @author Growexx
   * @since 20/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async getProductDetails(req, res) {
    try {
      const data = await GetProductService.getProductDetails(req, res.__);
      Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }
}

module.exports = GetProductController;
