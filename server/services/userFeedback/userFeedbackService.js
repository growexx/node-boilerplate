const mongoose = require('mongoose');
const Feedback = require('../../models/feedback.model');
const UserFeedbackValidator = require('./userFeedbackValidator');
const GeneralError = require('../../util/GeneralError');

/**
 * Class represents services for user feedback.
 */
class UserFeedbackService {
    /**
     * @desc This function is being used to add feedback
     * @author Growexx
     * @since 16/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async addUserFeedback (data, user, locale) {
        const Validator = new UserFeedbackValidator(data, locale);
        await Validator.validateFeedback();
        data.userId = user._id;
        return await Feedback.create(data);
    }

    /**
     * @desc This function is being used to get feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async getUserFeedback (data, user, locale) {
        const Validator = new UserFeedbackValidator(data, locale);
        await Validator.checkValidMongoId(data.id, 'id');
        data.userId = user._id;
        const queryObj = { _id: mongoose.Types.ObjectId(data.id), userId: mongoose.Types.ObjectId(user._id), isActive: 1 };
        const feedback = await Feedback.findOne(queryObj).lean();
        if (!feedback) {
            throw new GeneralError(MESSAGES.FEEDBACK_NOT_FOUND, 404);
        }
        return feedback;
    }

    /**
     * @desc This function is being used to list feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async listUserFeedback (req, user) {
        const query = { userId: mongoose.Types.ObjectId(user._id), isActive: 1 };

        const isPaginate = req.query.isPaginate || 'true';
        const sortQuery = this.getSortingParams(req);
        const options = {
            page: (req.query.page) ? req.query.page : 1,
            limit: (req.query.limit) ? req.query.limit : 10,
            sort: req.query.sortBy ? sortQuery : { createdAt: -1 }
        };
        if (isPaginate === 'true') {
            return await Feedback.paginate(query, options);
        } else {
            return await Feedback.find(query).sort(sortQuery).lean();
        }
    }

    static getSortingParams (req) {
        const sortQuery = {};

        if (req.query.sortBy && req.query.sortBy === 'createdAt') {
            sortQuery.createdAt = parseInt(req.query.sort);
        }
        return sortQuery;
    }

    /**
     * @desc This function is being used to delete feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async deleteUserFeedback (data, user, locale) {
        const Validator = new UserFeedbackValidator(data, locale);
        await Validator.checkValidMongoId(data.id, 'id');
        data.userId = user._id;
        const queryObj = { _id: mongoose.Types.ObjectId(data.id), userId: mongoose.Types.ObjectId(user._id), isActive: 1 };
        const feedback = await Feedback.updateOne(queryObj, { $set: { isActive: 2 } });
        if (!feedback.nModified) {
            throw new GeneralError(MESSAGES.FEEDBACK_NOT_FOUND, 404);
        }
        return;
    }

    /**
     * @desc This function is being used to add feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async inActiveUserFeedback (data, user, locale) {
        const Validator = new UserFeedbackValidator(data, locale);
        await Validator.checkValidMongoId(data.id, 'id');
        data.userId = user._id;
        const queryObj = { _id: mongoose.Types.ObjectId(data.id), userId: mongoose.Types.ObjectId(user._id), isActive: 1 };
        const feedback = await Feedback.updateOne(queryObj, { $set: { isActive: 0 } });
        if (!feedback.nModified) {
            throw new GeneralError(MESSAGES.FEEDBACK_NOT_FOUND, 404);
        }
        return;
    }
}

module.exports = UserFeedbackService;
