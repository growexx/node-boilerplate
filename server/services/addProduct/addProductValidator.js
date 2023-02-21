const GeneralError = require('../../util/GeneralError');
const validation = require('../../util/validation');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';
/**
 * Class represents validations for add product validation.
 */
class AddProductValidator extends validation {
  constructor(body, locale) {
    super(locale);
    this.body = body;
  }

  /**
   * @desc This function is being used to validate request
   * @author Growexx
   * @since 15/02/2023
   */
  validate() {
    const { foodName, foodType, quantity, price, extras } = this.body;
    super.field(foodName, 'foodName');
    super.field(foodType, 'foodType');
    this.isQuantity(quantity, 'quantity');
    this.isPrice(price, 'price');
    super.arrayField(extras, 'extras');
  }

  /**
   * @desc This function is being used to validate quantity
   * @author Growexx
   * @since 15/02/2023
   */
  isQuantity(field) {
    if (field > 10 || field < 1) {
      throw new GeneralError(this.__('INVALID_QUANTITY', 400));
    }
    if (!field) {
      throw new GeneralError(this.__(REQUIRED, 'quantity'), 400);
    }
    if (isNaN(field)) {
      throw new GeneralError(this.__(INVALID, 'quantity'), 400);
    }
  }

  /**
   * @desc This function is being used to validate price
   * @author Growexx
   * @since 16/02/2023
   */
  isPrice(field) {
    if (field < 0.01) {
      throw new GeneralError(this.__('INVALID_PRICE', 400));
    }
    if (!field) {
      throw new GeneralError(this.__(REQUIRED, 'price'), 400);
    }
    if (isNaN(field)) {
      throw new GeneralError(this.__(INVALID, 'price'), 400);
    }
  }
}

module.exports = AddProductValidator;
