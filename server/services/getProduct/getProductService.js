const mongoose = require('mongoose');
const GetProductValidator = require('./getProductValidator');
const Product = require('../../models/product.model');

/**
 * Class represents services for Get Product.
 */
class GetProductService {
  /**
   * @desc This function is being used to get product
   * @author Growexx
   * @since 20/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async getProduct(req) {
    const { sort, sortBy, search } = req.query;
    const sortObj = {};
    if (sort && sortBy) {
      sortObj[sortBy] = sort;
    }
    const filter = search
      ? {
          $or: [
            { foodName: { $regex: search, $options: 'i' } },
            { foddType: { $regex: search, $options: 'i' } },
          ],
        }
      : {};
    const options = {
      page: req.query.pageNumber ? req.query.pageNumber : 1,
      limit: req.query.limit ? req.query.limit : 10,
      sort: sort && sortBy ? sortObj : { foodName: 1 },
    };
    return await Product.paginate(filter, options);
  }
  /**
   * @desc This function is being used to get details of a product
   * @author Growexx
   * @since 20/02/2023
   * @param {Object} req Request
   * @param {Object} res Response
   */
  static async getProductDetails(req, locale) {
    const Validator = new GetProductValidator(req.query, locale);
    Validator.validate();
    const { id } = req.query;
    const product = await Product.findOne({ _id: mongoose.Types.ObjectId(id) });
    if (!product) {
      throw {
        message: MESSAGES.PRODUCT_NOT_FOUND,
        statusCode: 400,
      };
    } else {
      return product;
    }
  }
}

module.exports = GetProductService;
