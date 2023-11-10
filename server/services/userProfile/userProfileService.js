const { Types } = require('mongoose');
const User = require('../../models/user.model');
const UserBasicProfileValidator = require('./userProfileValidator');
const StorageService = require('../../util/storageService');
const crypt = require('../../util/crypt');
const GeneralError = require('../../util/GeneralError');
var Client = require('ftp');
var fs = require('fs');

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
        const Validator = new UserBasicProfileValidator(req.file);
        await Validator.validationProfilePicture();

        const fileName = `${user._id}.${req.file.originalname.substring(
            req.file.originalname.lastIndexOf('.') + 1
        )}`;
        const filePath = `${process.env.NODE_ENV}-${CONSTANTS.PROFILE_PICTURE_DIRECTORY}/${fileName}`;
        await StorageService.uploadFile(req.file, filePath);

        const updateData = {
            profilePicture: filePath
        };
        await User.updateOne({
            _id: new Types.ObjectId(user._id)
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
        const fileName = user.profilePicture;
        await StorageService.deleteFile(fileName);
        await User.updateOne({
            _id: new Types.ObjectId(user._id)
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
        const userPassword = await User.findOne({ _id: user._id }, { _id: 0, password: 1 }).lean();

        const isMatch = await crypt.comparePassword(data.oldPassword, userPassword.password);
        if (!isMatch) {
            throw new GeneralError(locale('PASSWORD_NOT_MATCH'), 400);
        } else {
            const hash = await crypt.enCryptPassword(data.newPassword);
            await User.updateOne({ _id: user._id }, { $set: { password: hash } });
        }
    }
}

module.exports = UserProfileService;
