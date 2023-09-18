/**
 * This file is used to signin API's routes.
 * Created by Growexx on 19/04/2018.
 * @name authRoutes
 */
const router = require('express').Router();


const DbMiddleware = require('../middleware/serverless');
const SignUpController = require('../services/signup/signUpController');
const SignInController = require('../services/signin/signInController');
const ForgotPasswordController = require('../services/forgotPassword/forgotPasswordController');
const OpenaiController = require('../services/openai/openaiController');

// Auth Routes
router.post('/signup',DbMiddleware, SignUpController.signUp);
router.post('/verify-account',DbMiddleware, SignUpController.verifyAccount);
router.post('/resend-otp',DbMiddleware, SignUpController.resendOTP);
router.post('/signin',DbMiddleware, SignInController.login);
router.post('/forgot-password',DbMiddleware, ForgotPasswordController.forgotPassword);
router.post('/verify-token',DbMiddleware, ForgotPasswordController.verifyToken);
router.post('/reset-password',DbMiddleware, ForgotPasswordController.resetPassword);
router.post('/text-generator',DbMiddleware, OpenaiController.openai);

module.exports = router;
