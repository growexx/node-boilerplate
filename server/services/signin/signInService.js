const crypt = require('../../util/crypt');
const signInValidator = require('./signInValidator');
const User = require('../../models/user.model');

/**
 * Class represents services for signin.
 */
class SignInService {
    /**
     * @desc This function is being used to sign in user
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {Object} locale Locale passed from request
     * @param {Object} res Response
     */
    static async signIn (req, locale) {
        const Validator = new signInValidator(req.body, locale);
        Validator.validate();
        const email = req.body.email.toLowerCase();
        return await SignInService.userLogin(email, req.body.password, locale);
    }

    /**
     * @desc This function is being used to end user login
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} userEmail userEmail
     * @param {Object} password password
     * @param {Object} res Response
     * @param {function} callback callback Handles Response data/error messages
     * @param {function} next exceptionHandler Calls exceptionHandler
     */
    static async userLogin (userEmail, password, locale) {
        let user = await User.findOne({ email: userEmail }).lean();

        // Wrong username
        if (!user) {
            throw {
                message: MESSAGES.LOGIN_FAILED,
                statusCode: 401
            };
        } else if (user.isActive) {
            // Wrong Password
            const isMatch = await crypt.comparePassword(password, user.password);

            if (!isMatch) {
                const failedLoginAttempts = user.failedLoginAttempts + 1;

                if (failedLoginAttempts >= CONSTANTS.MAX_FAILED_LOGIN_ATTEMPTS ) {
                    const blockEndsAt = MOMENT(Date.now()).isBefore(MOMENT(user.blockEndsAt))
                        ? user.blockEndsAt
                        : new Date(MOMENT().add(CONSTANTS.BLOCK_DURATION_DAYS, 'day').utc());

                    await User.updateOne({
                        email: userEmail
                    }, {
                        $set: {
                            failedLoginAttempts,
                            blockEndsAt
                        }
                    });

                    throw {
                        message: locale(MESSAGES.BLOCKED_USER, MOMENT(blockEndsAt).format('MM/DD/YYYY HH:mm')),
                        statusCode: 401
                    };
                } else {
                    await User.updateOne({
                        email: userEmail
                    }, {
                        $set: {
                            failedLoginAttempts
                        }
                    });

                    throw {
                        message: MESSAGES.LOGIN_FAILED,
                        statusCode: 401
                    };
                }
            } else if (MOMENT(Date.now()).isBefore(MOMENT(user.blockEndsAt))) {
                throw {
                    message: locale(MESSAGES.BLOCKED_USER, MOMENT(user.blockEndsAt).format('MM/DD/YYYY HH:mm')),
                    statusCode: 401
                };
            } else {
                await User.updateOne({
                    email: userEmail
                }, {
                    $set: {
                        failedLoginAttempts: 0,
                        blockEndsAt: null
                    }
                });

                const token = await crypt.getUserToken(user);
                delete user.password;
                delete user.__v;
                user = _.merge(user, token);
                return user;
            }
        } else {
            throw {
                data: { email: user.email, role: user.role },
                message: MESSAGES.INACTIVE_USER,
                statusCode: 423
            };
        }
    }
}

module.exports = SignInService;
