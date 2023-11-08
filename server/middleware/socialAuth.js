const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');
const { google } = require('googleapis');
const axios = require('axios');
const oauth2Client = new google.auth.OAuth2();
const constant = require('../util/constants');
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
/**
 * @desc This function is being used to authenticate each private request
 * @author Growexx
 * @since 05/04/2023
 * @param {Object} req Request req.headers RequestBody req.headers.accessToken accessToken
 * @param {Object} res Response
 * @param {function} next exceptionHandler Calls exceptionHandler
 */
const facebookVerify = (req, res, next) =>{
    const token = req.body.token;
    const url = `${constant.FACEBOOK_AUTH_URL}${token}`;
    axios.get(url)
        .then(()=>{
            next();
        })
        .catch(err=>{
            handleError(err, res);
            return;
        });
};
const googleVerify = (req, res, next) => {
    if (process.env.NODE_ENV !== 'testing') {
        oauth2Client.setCredentials({ access_token: req.body.token });
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });
        oauth2.userinfo.get(
            (err) => {
                if (err) {
                    const responseObject = Utils.errorResponse();
                    responseObject.message = res.__('ACCESS_DENIED');
                    res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
                    return;
                } else {
                    next();
                }
            });
    } else {
        next();
    }
};

const appleVerify = async (req, res, next)=>{
    if (process.env.NODE_ENV !== 'testing') {
        const { header } = jwt.decode(req.body.token, {
            complete: true
        });
        const kid = header.kid;
        const client = jwksClient({
            jwksUri: constant.APPLE_AUTH_URL,
            timeout: 30000
        });
        client.getSigningKey(kid).then(key=>{
            const publicKey = key.getPublicKey();
            jwt.verify(req.body.token, publicKey);
            next();
        }).catch(err=>{
            handleError(err, res);
            return;
        });
    } else {
        next();
    }
};

const handleError = (err, res) => {
    const responseObject = Utils.errorResponse();
    responseObject.message = err.message;
    res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
    return;
};
module.exports = function (req, res, next) {
    switch (req.body.platform) {
        case CONSTANTS.SOCIAL_ACCOUNT.FACEBOOK:{
            facebookVerify(req, res, next);
            break;
        }
        case CONSTANTS.SOCIAL_ACCOUNT.GOOGLE:{
            googleVerify(req, res, next);
            break;
        }
        case CONSTANTS.SOCIAL_ACCOUNT.APPLE:{
            appleVerify(req, res, next);
            break;
        }
        default:{
            const responseObject = Utils.errorResponse();
            responseObject.message = res.__('INVALID_SOCIAL_ACCOUNT');
            res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
        }
    }
};
