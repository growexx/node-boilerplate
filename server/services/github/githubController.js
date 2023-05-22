const Utils = require('../../util/utilFunctions');
const { Octokit } = require('octokit');
const octokit = new Octokit({
    auth: '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'
});
class GetGithubController {
    /**
   * @desc This function is being used to get all the repositories
   * @author Growexx
   * @since 11/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getRepositories (req, res) {
        try {
            const repoList = await octokit.request('GET /orgs/{org}/repos', {
                org: 'growexx',
                per_page: 100,
                page: req.query.page,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const allRepositories = [];
            let count = 1;
            for (const repo of repoList.data) {
                let repoPrivateORPublic = 'Public';
                if (repo.private === 'true') {
                    repoPrivateORPublic = 'Private';
                }
                allRepositories.push({
                    cnt: count,
                    id: repo.id,
                    repoName: repo.name,
                    repoFullName: repo.full_name,
                    privateORPublic: repoPrivateORPublic
                });
                count++;
            }
            Utils.sendResponse(null, allRepositories, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to get all the Pull Request of specific repository
   * @author Growexx
   * @since 12/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getRepositoryPR (req, res) {
        try {
            const pullRequests = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
                owner: 'growexx',
                repo: req.query.repo,
                sort: 'created',
                direction: 'desc',
                state: 'all',
                page: req.query.page,
                per_page: 100,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const allPRs = [];
            for (const pr of pullRequests.data) {
                allPRs.push({
                    id: pr.id,
                    nodeId: pr.node_id,
                    prRaisedBy: pr.user.login,
                    prTitle: pr.title
                });
            }
            Utils.sendResponse(null, allPRs, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to get all the Pull Request from Rejected state
   * @author Growexx
   * @since 12/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getRejectedPR (req, res) {
        try {
            const pullRequests = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
                owner: 'growexx',
                repo: req.query.repo,
                sort: 'created',
                direction: 'desc',
                state: 'open',
                page: req.query.page,
                per_page: 100,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const allRejectedPRs = [];
            for (const pr of pullRequests.data) {
                allRejectedPRs.push({
                    id: pr.id,
                    nodeId: pr.node_id,
                    prRaisedBy: pr.user.login,
                    prTitle: pr.title
                });
            }
            Utils.sendResponse(null, allRejectedPRs, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to get all the comments of a Particular Pull Request
   * @author Growexx
   * @since 12/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getParticularPRComments (req, res) {
        try {
            const prComments = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/comments', {
                owner: 'growexx',
                repo: req.query.repo,
                pull_number: req.query.pullnumber,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const allComments = [];
            if (prComments.status) {
                for (const comment of prComments.data) {
                    allComments.push({
                        id: comment.id,
                        nodeId: comment.node_id,
                        commentBy: comment.user.login,
                        comment: comment.body,
                        createdAt: comment.created_at,
                        prLink: comment.pull_request_url,
                        commitId: comment.commit_id
                    });
                }
            }
            Utils.sendResponse(null, allComments, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to get all the comments of a repository
   * @author Growexx
   * @since 12/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getCommentsFromRepository (req, res) {
        try {
            const prComments = await octokit.request('GET /repos/{owner}/{repo}/pulls/comments', {
                owner: 'growexx',
                repo: req.query.repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const allComments = [];
            if (prComments.status) {
                for (const comment of prComments.data) {
                    allComments.push({
                        id: comment.id,
                        nodeId: comment.node_id,
                        commentBy: comment.user.login,
                        comment: comment.body,
                        createdAt: comment.created_at,
                        prLink: comment.pull_request_url,
                        commitId: comment.commit_id
                    });
                }
            }
            Utils.sendResponse(null, allComments, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to search a Pull Request from date range
   * @author Growexx
   * @since 11/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getSearchPRBetweenDate (req, res) {
        try {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const repo = req.query.repo;
            const author = req.query.author;
            const page = req.query.page;
            const queryString = encodeURIComponent(`repo:growexx/${repo} is:pr is:closed closed:${startDate}..${endDate} 
            author:${author}`);
            const searchRecords = await octokit.request(`GET /search/issues?q=${queryString}&per_page=100&page=${page}`);
            const allDetails = [];
            for (const detail of searchRecords.data.items) {
                allDetails.push({
                    id: detail.id,
                    nodeId: detail.node_id,
                    title: detail.title,
                    createdBy: detail.user.login
                });
            }
            Utils.sendResponse(null, allDetails, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to get repository details
   * @author Growexx
   * @since 12/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getRepositoryDetails (req, res) {
        try {
            const allRepos = await octokit.request('GET /repos/{owner}/{repo}', {
                owner: 'growexx',
                repo: req.query.repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            });
            const allDetails = [];
            allDetails.push({
                id: allRepos.data.id,
                nodeId: allRepos.data.node_id,
                name: allRepos.data.name,
                full_name: allRepos.data.full_name
            });
            Utils.sendResponse(null, allDetails, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}
module.exports = GetGithubController;
