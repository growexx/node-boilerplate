const Utils = require('../../util/utilFunctions');
const axios = require('axios');

class GetSonarController {
    /**
   * @desc This function is being used to get all the code smells from sonarqube
   * @author Growexx
   * @since 19/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getCodesmells (req, res) {
        try {
            const response = await axios.get('https://quality.growexx.com/api/issues/search', {
                auth: {
                    username: req.query.username,
                    password: ''
                },
                params: {
                    'componentKeys': req.query.componentKeys,
                    's': 'FILE_LINE',
                    'resolved': false,
                    'ps': 100,
                    'facets': 'owaspTop10,sansTop25,severities,sonarsourceSecurity,types',
                    'additionalFields': '_all',
                    'types': 'CODE_SMELL'
                }
            });
            const allCodeSmells = [];
            for (const cs of response.data.issues) {
                allCodeSmells.push({
                    severity: cs.severity,
                    status: cs.status,
                    message: cs.message,
                    type: cs.type
                });
            }
            Utils.sendResponse(null, allCodeSmells, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
   * @desc This function is being used to get all the Vulnerabilities from sonarqube
   * @author Growexx
   * @since 19/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getVulnerabilities (req, res) {
        try {
            const response = await axios.get('https://quality.growexx.com/api/issues/search', {
                auth: {
                    username: req.query.username,
                    password: ''
                },
                params: {
                    'componentKeys': req.query.componentKeys,
                    's': 'FILE_LINE',
                    'resolved': false,
                    'ps': 100,
                    'facets': 'owaspTop10,sansTop25,severities,sonarsourceSecurity,types',
                    'additionalFields': '_all',
                    'types': 'VULNERABILITY'
                }
            });
            const allVulnerabilities = [];
            for (const vl of response.data.issues) {
                allVulnerabilities.push({
                    severity: vl.severity,
                    status: vl.status,
                    message: vl.message,
                    type: vl.type
                });
            }
            Utils.sendResponse(null, allVulnerabilities, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}
module.exports = GetSonarController;
