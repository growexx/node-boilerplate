const router = require('express').Router();
const githubController = require('../services/github/githubController');

router.get('/repositories', githubController.getRepositories);
router.get('/repositorypr', githubController.getRepositoryPR);
router.get('/particularprcomments', githubController.getParticularPRComments);
router.get('/commentsfromrepository', githubController.getCommentsFromRepository);

router.get('/searchprbetweendate', githubController.getSearchPRBetweenDate);
router.get('/repositorydetails', githubController.getRepositoryDetails);

module.exports = router;
