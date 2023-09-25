/**
 * This file is used to signin API's routes.
 * Created by Growexx on 19/04/2018.
 * @name authRoutes
 */
const router = require('express').Router();

const SignUpController = require('../services/signup/signUpController');
const SignInController = require('../services/signin/signInController');
const ForgotPasswordController = require('../services/forgotPassword/forgotPasswordController');
const AnkiAlgoController = require('../services/ankiAlgo/ankiAlgoController');
const AnkiFlashcardController = require('../services/ankiFlashcards/ankiFlashcardController');

// Auth Routes
router.post('/signup', SignUpController.signUp);
router.post('/verify-account', SignUpController.verifyAccount);
router.post('/resend-otp', SignUpController.resendOTP);
router.post('/signin', SignInController.login);
router.post('/forgot-password', ForgotPasswordController.forgotPassword);
router.post('/verify-token', ForgotPasswordController.verifyToken);
router.post('/reset-password', ForgotPasswordController.resetPassword);
router.get('/next', AnkiAlgoController.review);
router.get('/list-all', AnkiAlgoController.listReview);
router.get('/list', AnkiAlgoController.getUsersByInteractionType);
router.post('/review', AnkiAlgoController.flashcards);
router.post('/addFlashcards', AnkiAlgoController.addFlashcards);

//flashcards
router.post('/createFlashcard', AnkiFlashcardController.createFlashcard);
router.post('/updateInterval', AnkiFlashcardController.updateFlashcardInterval);
router.post('/processReview', AnkiFlashcardController.processReview);
router.get('/getNext', AnkiFlashcardController.getNextDueFlashcard);
router.get('/getList', AnkiFlashcardController.getFlashcardsByNextReview);


module.exports = router;
