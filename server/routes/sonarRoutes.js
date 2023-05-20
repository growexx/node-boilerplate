const router = require('express').Router();
const sonarController = require('../services/sonar/sonarController');

router.get('/codesmells', sonarController.getCodesmells);
router.get('/vulnerabilities', sonarController.getVulnerabilities);

module.exports = router;
