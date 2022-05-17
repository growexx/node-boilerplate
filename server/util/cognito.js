const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.CognitoIdentityCredentials({ 'IdentityPoolId': 'us-east-1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
AWS.config.region = process.env.AWS_API_REGION;
AWS.config.accessKeyId = process.env.AWS_API_KEY;
AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;
AWS.config.credentials.accessKeyId = process.env.AWS_API_KEY;
AWS.config.credentials.secretAccessKey = process.env.AWS_SECRET_KEY;
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { COGNITO_CUSTOM_ATTRIBUTES } = require('./constants');
const { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } = AmazonCognitoIdentity;

let UserPoolId;
let ClientId;
let poolData;
let UserPool;
let cognitoIdentityServiceProvider;

if (process.env.NODE_ENV !== 'testing') {
    UserPoolId = process.env.AWS_COGNITO_USER_POOL_ID;
    ClientId = process.env.AWS_COGNITO_CLIENT_ID;

    poolData = {
        UserPoolId,
        ClientId
    };

    UserPool = new CognitoUserPool(poolData);

    cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
}

/**
 * Class represents Utilities function for AWS Cognito in App.
 */
class AwsCognitoService {
    /**
     * @desc This function is used to validate email on cognito
     * @author Growexx
     * @param {Object} params params
     * @param {Object} params.UserPoolId params.UserPoolId
     * @param {Object} params.Username params.Username
     * @since 12/01/2022
     */
    static checkEmailExistsOnCognito (params) {
        if (process.env.NODE_ENV !== 'testing') {
            return new Promise((resolve) => {
                cognitoIdentityServiceProvider.adminGetUser(params, (err, data)=> {
                    if (err) {
                        resolve(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        } else {
            return {};
        }
    }
    /**
     * @desc This function is used to recover password on cognito
     * @author Growexx
     * @param {Object} cognitoUser cognitoUser
     * @since 11/01/2022
     */
    static cognitoForgotPassword (cognitoUser) {
        if (process.env.NODE_ENV !== 'testing') {
            return new Promise((resolve) => {
                cognitoUser.forgotPassword({
                    onSuccess: resolve,
                    onFailure: resolve,
                    inputVerificationCode: resolve
                });
            });
        } else {
            return {};
        }
    }
    /**
     * @desc This function is used to reset user password on cognito
     * @author Growexx
     * @param {Object} cognitoUser cognitoUser
     * @param {Object} payload payload
     * @param {Object} payload.verificationCode verificationCode
     * @param {Object} payload.newPassword newPassword
     * @since 11/01/2022
     */
    static cognitoConfirmPassword (cognitoUser, payload) {
        if (process.env.NODE_ENV !== 'testing') {
            return new Promise((resolve) => {
                cognitoUser.confirmPassword(payload.verificationCode, payload.newPassword, {
                    onSuccess: resolve,
                    onFailure: resolve
                });
            });
        } else {
            return {};
        }
    }

    /**
     * @desc This function is used to authenticate user on cognito
     * @author Growexx
     * @param {Object} cognitoUser
     * @param {Object} cognitoAuthenticationDetails
     * @since 11/01/2022
     */
    static cognitoAuthenticateUser (cognitoUser, cognitoAuthenticationDetails) {
        if (process.env.NODE_ENV !== 'testing') {
            return new Promise((resolve) => {
                cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
                    onSuccess: resolve,
                    onFailure: resolve,
                    newPasswordRequired: resolve
                });
            });
        } else {
            return {};
        }
    }

    /**
     * @desc This function is used to sign up on cognito
     * @author Growexx
     * @param {Object} UserPool awsUserPool
     * @param {Object} dataEmail email
     * @param {Object} dataPassword password
     * @param {Object} attributeList userSignupAttributes
     * @since 11/01/2022
     */
    static cognitoSignupUser (UserPool, dataEmail, dataPassword, attributeList) {
        if (process.env.NODE_ENV !== 'testing') {
            return new Promise((resolve) => {
                UserPool.signUp(dataEmail, dataPassword, attributeList, null, (err, result) => {
                    if (err) {
                        resolve(err);
                        return;
                    }
                    resolve(result.user);
                });
            });
        } else {
            return {};
        }

    }

    /**
     * @desc This function is used to fill user attribute
     * @author Growexx
     * @param {Object} payload
     * @param {Object} payload.email email
     * @param {Object} payload.password password
     * @param {Object} payload.name name (optional)
     * @param {Object} payload.phone_number phone_number (optional)
     * @param {Object} payload.username username (optional)
     * @since 01/03/2021
     */
    static fillAttributeList (payload) {
        const attributeList = [];
        if (payload.name) {
            const dataName = {
                Name: 'name',
                Value: payload.name
            };
            const attributeName = new CognitoUserAttribute(dataName);
            attributeList.push(attributeName);
        }
        if (payload.phone_number) {
            const dataPhone = {
                Name: 'phone_number',
                Value: payload.phone_number
            };
            const attributePhone = new CognitoUserAttribute(dataPhone);
            attributeList.push(attributePhone);
        }
        if (payload.preferred_username) {
            const dataUserName = {
                Name: 'preferred_username',
                Value: payload.username
            };
            const attributeUserName = new CognitoUserAttribute(dataUserName);
            attributeList.push(attributeUserName);
        }
        if (payload.password) {
            const dataPassword = {
                Name: 'password',
                Value: payload.password
            };
            const attributePassword = new CognitoUserAttribute(dataPassword);
            attributeList.push(attributePassword);
        }
        return attributeList;
    }


    /**
     * @desc This function is being used to sign in user
     * @author Growexx
     * @since 11/01/2021
     * @param {Object} payload
     * @param {Object} payload.email email
     * @param {Object} payload.password password
     */
    static async login ({ email, password }) {
        if (process.env.NODE_ENV !== 'testing') {
            const cognitoUser = new CognitoUser({
                Username: email,
                Pool: UserPool
            });
            const cognitoAuthenticationDetails = new AuthenticationDetails({
                Username: email,
                Password: password
            });
            const cognitoResponse = await AwsCognitoService.cognitoAuthenticateUser(cognitoUser, cognitoAuthenticationDetails);
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }

    }

    /**
     * @desc This function is being used to sign up user
     * @author Growexx
     * @since 11/01/2021
     * @param {Object} payload
     * @param {Object} payload.email email
     * @param {Object} payload.password password
     * @param {Object} payload.name name (optional)
     * @param {Object} payload.phone_number phone_number (optional)
     * @param {Object} payload.username username (optional)
     */
    static async signup (payload) {
        if (process.env.NODE_ENV !== 'testing') {
            const attributeList = AwsCognitoService.fillAttributeList(payload);

            const cognitoResponse = await AwsCognitoService.cognitoSignupUser(UserPool, payload.email, payload.password, attributeList);
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to sign up user
     * @author Growexx
     * @since 11/01/2021
     * @param {Object} payload
     * @param {Object} payload.email email
     */
    static async forgotPassword (payload) {
        if (process.env.NODE_ENV !== 'testing') {
            const cognitoUser = new CognitoUser({
                Username: payload.email,
                Pool: UserPool
            });

            const cognitoResponse = await AwsCognitoService.cognitoForgotPassword(cognitoUser);
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to sign up user
     * @author Growexx
     * @since 11/01/2021
     * @param {Object} payload
     * @param {Object} payload.email email
     * @param {Object} payload.verificationCode verificationCode
     * @param {Object} payload.newPassword newPassword
     */
    static async confirmPassword (payload) {
        if (process.env.NODE_ENV !== 'testing') {
            const cognitoUser = new CognitoUser({
                Username: payload.email,
                Pool: UserPool
            });

            const cognitoResponse = await AwsCognitoService.cognitoConfirmPassword(cognitoUser, payload);
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to validate email on cognito
     * @author Growexx
     * @since 11/01/2021
     * @param {Object} payload
     * @param {Object} payload.email email
     */
    static async validateEmailExists (userEmail) {
        if (process.env.NODE_ENV !== 'testing') {
            const params = {
                Username: userEmail,
                UserPoolId
            };

            const cognitoResponse = await AwsCognitoService.checkEmailExistsOnCognito(params);
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to add email/user on cognito
     * @author Growexx
     * @since 18/01/2021
     * @param {Object} payload
     * @param {Object} payload.email email
     */
    static async addCognitoUser (Username) {
        if (process.env.NODE_ENV !== 'testing') {
            var params = {
                UserPoolId,
                Username,
                TemporaryPassword: 'Test@1234',
                MessageAction: 'SUPPRESS'
            };

            const cognitoResponse = await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to set cognito user's Password and Enable the User
     * @author Growexx
     * @since 18/01/2021
     * @param dataEmail email
     * @param dataPassword password
     */
    static async setCognitoUserPassword (dataEmail, dataPassword) {
        if (process.env.NODE_ENV !== 'testing') {
            var params = {
                UserPoolId,
                Password: dataPassword,
                Username: dataEmail,
                Permanent: true
            };

            const cognitoResponse = await cognitoIdentityServiceProvider.adminSetUserPassword(params).promise();
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to generate Refreshed token
     * @author Growexx
     * @since 18/01/2021
     * @param refreshToken refreshToken
     */
    static async generateRefreshToken (refreshToken) {
        if (process.env.NODE_ENV !== 'testing') {
            var params = {
                ClientId,
                AuthFlow: 'REFRESH_TOKEN_AUTH',
                AuthParameters: {
                    'REFRESH_TOKEN': refreshToken
                }
            };
            const cognitoResponse = await cognitoIdentityServiceProvider.initiateAuth(params).promise();
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to remove token /logout from Cognito
     * @author Growexx
     * @since 18/01/2021
     * @param refreshToken refreshToken
     */
    static async revokeToken (refreshToken) {
        if (process.env.NODE_ENV !== 'testing') {
            var params = {
                ClientId,
                Token: refreshToken
            };

            const cognitoResponse = await cognitoIdentityServiceProvider.revokeToken(params).promise();
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }

    /**
     * @desc This function is being used to user profile on Cognito
     * @author Growexx
     * @since 20/01/2021
     * @param email email
     * @param userProfileAttributes userProfileAttributes
     * @param userProfileAttributes.first_name first_name
     * @param userProfileAttributes.last_name last_name
     * @param userProfileAttributes.user_name user_name
     * @param userProfileAttributes.profile_image_url profile_image_url
     * @param userProfileAttributes.first_name first_name
     */
    static async adminUpdateUserAttributes (email, userProfileAttributes) {
        if (process.env.NODE_ENV !== 'testing') {
            const userAttributesItems = COGNITO_CUSTOM_ATTRIBUTES;
            const userAttributes = [];
            for (const [key, value] of Object.entries(userProfileAttributes)) {
                let item = key.toLowerCase();
                if (item.indexOf('custom:') === -1) {
                    item = 'custom:' + item;
                }
                if (userAttributesItems.indexOf(item) !== -1) {
                    userAttributes.push({ 'Name': item, 'Value': value });
                }
            }
            var params = {
                UserPoolId,
                UserAttributes: userAttributes,
                Username: email
            };
            const cognitoResponse = await cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }

    }

    /**
     * @desc This function is being used to change user password
     * @author Growexx
     * @since 17/05/2022
     * @param accessToken accessToken
     * @param oldPassword oldPassword
     * @param newPassword newPassword
     */
    static async changeCognitoUserPassword (accessToken, oldPassword, newPassword) {
        if (process.env.NODE_ENV !== 'testing') {
            var params = {
                AccessToken: accessToken,
                PreviousPassword: oldPassword,
                ProposedPassword: newPassword
            };

            const cognitoResponse = await cognitoIdentityServiceProvider.changePassword(params).promise();
            if (cognitoResponse.code) {
                return null;
            }
            return cognitoResponse;
        } else {
            return {};
        }
    }
}
module.exports = AwsCognitoService;
