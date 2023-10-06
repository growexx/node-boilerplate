const { Types } = require('mongoose');
const User = require('../../models/user.model');
const UserBasicProfileValidator = require('./userProfileValidator');
const UploadService = require('../../util/uploadService');
const GeneralError = require('../../util/GeneralError');
const Cognito = require('../../util/cognito');
const Client = require('ftp');
const fs = require('fs');

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
            _id: new Types.ObjectId(user._id)
        }, {
            $set: updateData
        });

        return updateData;
    }

    /**
     * @desc This function is being used to connect ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} res Response
     */
    static async ftpConnection () {
        const config = {
            host: process.env.FTP_HOST,
            port: parseInt(process.env.FTP_PORT),
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD
        };
        const c = new Client();
        return new Promise((resolve, reject) => {
            try {
                c.connect(config);
                c.on('error', (err) => {
                    reject(err);
                });
                c.on('ready', () => {
                    const isConnected = c.connected;
                    if (isConnected) {
                        resolve(c);
                    } else {
                        reject(false);
                    }
                });
            } catch (err) {
                reject(err.message);
            }
        });
    }

    /**
     * @desc This function is being used to upload file to ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     */
    static async ftpFileUpload (req) {
        const clientConn = await UserProfileService.ftpConnection();
        return new Promise((resolve, reject) => {
            clientConn.put(req.body.localFilePath, req.body.remoteFilePath, (err) => {
                if (err) {
                    reject(err.message);
                }
                resolve(clientConn.end());
            });
        });
    }

    /**
     * @desc This function is being used to download file from ftp server
     * @author Growexx
     * @since 07/06/2022
     * @param {Object} req Request
     */
    static async ftpFileDownload (req) {
        const clientConn = await UserProfileService.ftpConnection();
        return new Promise((resolve, reject) => {
            clientConn.get(req.body.remoteFilePath, (err, stream) => {
                if (err) {
                    reject(err.message);
                } else {
                    stream.once('close', () => { clientConn.end(); });
                    stream.pipe(fs.createWriteStream(req.body.localFilePath));
                    resolve('Download successful');
                }
            });
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
