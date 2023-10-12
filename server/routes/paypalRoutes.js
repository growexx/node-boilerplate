const PaypalController = require('../services/paypal/paypalController');

/**
 * This file is used to paypal API's routes.
 * Created by Growexx on 27/04/2022.
 * @name paypalRoutes
 */
const router = require('express').Router();

router.post('/create', PaypalController.createOrder );
router.post('/capture', PaypalController.captureOrder);

module.exports = router;
