const mongoose = require('mongoose');
const User = require('../../models/user.model');
const UserBasicProfileValidator = require('./userProfileValidator');
const UploadService = require('../../util/uploadService');
const crypt = require('../../util/crypt');
const GeneralError = require('../../util/GeneralError');
var SftpUpload = require('sftp-upload');
const message = require('../../locales/en');
var Client = require('ftp');
var fs = require('fs');
var c = new Client();

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
     * @desc This function is being used to upload file to ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async ftpFileUpload (req, user) {
        try {
            await UserProfileService.ftpConnection();
            c.on('ready', function () {
                c.put(req.body.localFilePath, req.body.remoteFilePath, function (err) {
                    if (err) throw err;
                    c.end();
                });
            });
        } catch(err) {
            throw {
                message: message.ERROR_MSG,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to download file from ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async ftpFileDownload (req, user) {
        try {
            await UserProfileService.ftpConnection();
            c.on('ready', function () {
                c.get(req.body.remoteFilePath, function (err, stream) {
                    if (err) throw err;
                    stream.once('close', function () { c.end(); });
                    stream.pipe(fs.createWriteStream(req.body.localFilePath));
                });
            });
        } catch(err) {
            throw {
                message: message.ERROR_MSG,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to connect ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async ftpConnection () {
        c.connect({
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD
        });
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
