const mongoose = require('mongoose');
const User = require('../../models/user.model');
const UserBasicProfileValidator = require('./userProfileValidator');
const UploadService = require('../../util/uploadService');
const GeneralError = require('../../util/GeneralError');
const Cognito = require('../../util/cognito');

/**
 * Class represents services for user Basic Profile.
 */
class UserProfileService {

    /**
     * @desc This function is being used to get user details
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     * @param {function} next exceptionHandler
     */
    static async getUserDetails (user) {
        return user;
    }

    /**
     * @desc This function is being used to update user profile picture
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updateProfilePicture (req, user) {
        const fileName = `${process.env.NODE_ENV}-proflie-pictures/${user._id}`;
        const Validator = new UserBasicProfileValidator(req.file);
        await Validator.validationProfilePicture();
        await UploadService.uploadFile(req.file, fileName);
        const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
        const updateData = {
            profilePicture: filePath
        };
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        });

        return updateData;
    }

    /**
     * @desc This function is being used to delete user profile picture
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async deleteProfilePicture (user) {
        const fileName = `${process.env.NODE_ENV}-proflie-pictures/${user._id}`;
        await UploadService.deleteObject(fileName);
        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                profilePicture: ''
            }
        });
    }

    /**
     * @desc This function is being used to change user password
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async changePassword (data, user, locale) {
        const Validator = new UserBasicProfileValidator(null, locale);
        Validator.password(data.oldPassword);
        Validator.password(data.newPassword);

        try {
            await Cognito.changeCognitoUserPassword(
                user.accessToken,
                data.oldPassword,
                data.newPassword
            );
        } catch (err) {
            if (err.code === 'NotAuthorizedException') {
                throw new GeneralError(locale('PASSWORD_NOT_MATCH'), 400);
            } else {
                throw {
                    message: err.message,
                    statusCode: 403
                };
            }
        }

        const updatedToken = await Cognito.generateRefreshToken(user.refreshToken);
        await User.updateOne({ _id: user._id }, {
            $set: {
                accessToken: updatedToken.AuthenticationResult.AccessToken
            }
        });

        return { 'token': updatedToken.AuthenticationResult.IdToken };
    }
}

module.exports = UserProfileService;
