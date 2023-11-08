const bcrypt = require('bcryptjs');
const JWT = require('./jwt');

class Crypt {
    /**
     * This function is being used to encrypt the password
     * @author Growexx
     * @param {String} password password
     * @since 08/11/2023
     */
    static async enCryptPassword (password) {
        const salt = await bcrypt.genSalt(CONSTANTS.SALT_ROUNDS);
        return await bcrypt.hash(password, salt);
    }

    /**
     * This function is being used to match the password with encrypted password
     * @author Growexx
     * @param {String} compare compare
     * @param {String} original original
     * @since 08/11/2023
     */
    static async comparePassword (compare, original) {
        return await bcrypt.compare(compare, original);
    }

    /**
     * This function is being used to save user detail before login
     * @author Growexx
     * @param {Object} user user
     * @param {function} callback callback
     * @since 08/11/2023
     */
    static async getUserAccessToken (user) {
        const token = await JWT.generateAccessToken({
            id: user.id,
            email: user.email
        });

        return {
            token
        };
    }

    /**
     * This function is being used to generate refresh token for user
     * @author Growexx
     * @param {Object} user user
     * @param {function} callback callback
     * @since 01/03/2021
     */
    static async getUserRefreshToken (user) {
        const token = await JWT.generateRefreshToken({
            id: user.id,
            email: user.email
        });

        return {
            token
        };
    }
}

module.exports = Crypt;
