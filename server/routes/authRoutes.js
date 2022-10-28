/**
 * This file is used to signin API's routes.
 * Created by Growexx on 19/04/2018.
 * @name authRoutes
 */
const router = require('express').Router();

const SignUpController = require('../services/signup/signUpController');
const SignInController = require('../services/signin/signInController');
const ForgotPasswordController = require('../services/forgotPassword/forgotPasswordController');
const StripePaymentController = require('../services/stripePayment/stripePaymentController');

// Auth Routes
router.post('/signup', SignUpController.signUp);
router.post('/verify-account', SignUpController.verifyAccount);
router.post('/resend-otp', SignUpController.resendOTP);
router.post('/signin', SignInController.login);
router.post('/forgot-password', ForgotPasswordController.forgotPassword);
router.post('/verify-token', ForgotPasswordController.verifyToken);
router.post('/reset-password', ForgotPasswordController.resetPassword);
router.post('/payment-sheet', StripePaymentController.stripePaymentDetails);

module.exports = router;
