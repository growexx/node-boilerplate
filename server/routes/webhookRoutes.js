const router = require('express').Router();
const stripeWebhook = require('../webhooks/stripe');

router.post('/stripe', stripeWebhook);

module.exports = router;
