const Utils = require('../../util/utilFunctions');
const axios = require('axios');

class GetSonarController {
    /**
   * @desc This function is being used to get all the code smells from sonarqube
   * @author Growexx
   * @since 17/05/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
    static async getCodesmells (req, res) {
        try {
            // const url = 'https://quality.growexx.com/api/issues/search';
            // const config = {
            //     headers: {
            //         'Authorization': 'Bearer 6da6fb66652e7bbc4a70cf853fbdcd42f768ac6d'
            //     },
            //     params: JSON.stringify({
            //         's': 'FILE_LINE',
            //         'componentKeys': '75-Product-Management-NodeJS-MongoDB',
            //         'resolved': false
            //     })
            // };
            // axios.get(url, config)
            //     .then(response => {
            //         Utils.sendResponse(null, response, res, res.__('SUCCESS'));
            //     })
            //     .catch(error => {
            //         Utils.sendResponse(error, null, res, '');
            //     });
            // const repoList = await axios({
            //     method: 'get',
            //     url: 'https://quality.growexx.com/api/issues/search',
            //     params: JSON.stringify({ 'componentKeys': '75-Product-Management-NodeJS-MongoDB' }),
            //     headers: { 'Authorization': 'Bearer 6da6fb66652e7bbc4a70cf853fbdcd42f768ac6d' }
            // });
            // Utils.sendResponse(null, repoList, res, res.__('SUCCESS'));
            // const config = {
            //     headers: {
            //         'Authorization': 'Bearer 6da6fb66652e7bbc4a70cf853fbdcd42f768ac6d'
            //     }
            // };
            // axios.get('https://quality.growexx.com/api/issues/search', JSON.stringify({
            //     'componentKeys': '75-Product-Management-NodeJS-MongoDB'
            // }), config)
            //     .then((response) => {
            //         console.log(response.data);
            //         // res.send(response.data);
            //         Utils.sendResponse(null, response.data, res, res.__('SUCCESS'));
            //     })
            //     .catch((error) => {
            //         res.send({
            //             status: '500',
            //             message: error
            //         });
            //     });
            axios({
                method: 'get',
                url: 'https://quality.growexx.com/api/issues/search',
                headers: {
                    'Authorization': 'Bearer 6da6fb66652e7bbc4a70cf853fbdcd42f768ac6d'
                },
                params: {
                    'componentKeys': '75-Product-Management-NodeJS-MongoDB',
                    's': 'FILE_LINE',
                    'resolved': false,
                    'ps': 100,
                    'facets': 'owaspTop10,sansTop25,severities,sonarsourceSecurity,types',
                    'additionalFields': '_all'
                }
            })
                .then((response) => {
                    Utils.sendResponse(null, response.data, res, res.__('SUCCESS'));
                });
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}
module.exports = GetSonarController;
