const router = require('express').Router();
const sonarController = require('../services/sonar/sonarController');

router.get('/codesmells', sonarController.getCodesmells);

module.exports = router;
