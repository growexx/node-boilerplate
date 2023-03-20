const validation = require('../../util/validation');
const GeneralError = require('../../util/GeneralError');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';

/**
 * Class represents validations for user feedback.
 */
class UserFeedbackValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate user feedback
     * @author Growexx
     * @since 16/03/2023
     */
    async validateFeedback () {
        await this.feedbackContent(this.body.title, 'Title');
        await this.feedbackContent(this.body.description, 'Description');
    }

    async feedbackContent (content, field) {
        if (!content) {
            throw new GeneralError(this.__(REQUIRED, field), 400);
        }

        if (!CONSTANTS.REGEX.ALPHA_SPECIAL_CHAR.test(content)) {
            throw new GeneralError(this.__(INVALID, field), 400);
        }
    }
}

module.exports = UserFeedbackValidator;
