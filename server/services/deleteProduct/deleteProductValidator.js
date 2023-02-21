const GeneralError = require('../../util/GeneralError');
const validation = require('../../util/validation');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';
/**
 * Class represents validations for delete product validation.
 */
class DeleteProductValidator extends validation {
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
    const { id } = this.body;
    super.id(id, 'id');
  }
}

module.exports = DeleteProductValidator;
