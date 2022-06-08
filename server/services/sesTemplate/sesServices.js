const UploadService = require('../../util/uploadService');
const AWS = require('aws-sdk');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const ses = new AWS.SES({ region: 'us-east-1', apiVersion: '2010-12-01' });
const SesValidator = require('./sesValidator');

AWS.config.region = process.env.AWS_API_REGION;
AWS.config.accessKeyId = process.env.AWS_API_KEY;
AWS.config.secretAccessKey = process.env.AWS_SECRET_KEY;
AWS.config.credentials.accessKeyId = process.env.AWS_API_KEY;
AWS.config.credentials.secretAccessKey = process.env.AWS_SECRET_KEY;

/**
 * Class represents services for Ses template.
 */
class SesTemplateService {
    /**
     * @desc This function is being used to create template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */

    static getData (err, data) {
        if (err) {
            return err;
        }
        return data;
    }

    static async createTemplate (req, locale) {
        try {
            const Validator = new SesValidator(req.body, locale);
            Validator.validateTemplateName();
            Validator.validateSubject();
            let htmlMessage;

            if (req.file !== undefined) {
                htmlMessage = req.file.buffer.toString('utf8');
            } else {
                htmlMessage = await readFileAsync(
                    `emailTemplates/${_.camelCase(req.body.templateName)}`,
                    'utf8'
                );
            }

            const subject = req.body.subject;
            const templateName = _.camelCase(req.body.templateName);

            var params = {
                Template: {
                    templateName,
                    HtmlPart: htmlMessage,
                    SubjectPart: subject,
                },
            };


            ses.createTemplate(params, function (err, data) {
                SesTemplateService.getData(err, data);
            });
        } catch (err) {
            if (err.code === 'ENOENT') {
                throw {
                    message: MESSAGES.FILE_NOT_FOUND,
                    statusCode: 400,
                };
            } else {
                throw err;
            }
        }
    }

    /**
     * @desc This function is being used to retrieving template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */

    static async getTemplate (req, res) {
        const Validator = new SesValidator(req.body, res);
        Validator.validateTemplateName();

        const templateName = _.camelCase(req.body.templateName);

        var params = {
            templateName,
        };

        ses.getTemplate(params, function (err, data) {
            SesTemplateService.getData(err, data);
        });
    }
    /**
     * @desc This function is being used to delete template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */
    static async deleteTemplate (req, res) {
        const Validator = new SesValidator(req.body, res);
        Validator.validateTemplateName();

        const templateName = _.camelCase(req.body.templateName);

        var params = {
            templateName,
        };

        ses.deleteTemplate(params, function (err, data) {
            SesTemplateService.getData(err, data);
        });
    }

    /**
     * @desc This function is being used to update template
     * @author Growexx
     * @since 26/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.templateName templateName
     */

    static async updateTemplate (req, res) {
        const Validator = new SesValidator(req.body, res);
        Validator.validateTemplateName();
        Validator.validateSubject();
        let htmlMessage, subject;

        if (req.file !== undefined) {
            htmlMessage = req.file.buffer.toString('utf8');
        }
        const templateName = req.body.templateName;

        var params = {
            Template: {
                templateName,
                HtmlPart: htmlMessage,
                SubjectPart: subject,
            },
        };

        ses.updateTemplate(params, function (err, data) {
            SesTemplateService.getData(err, data);
        });
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            throw {
                message: MESSAGES.FILE_NOT_FOUND,
                statusCode: 400,
            };
        } else {
            throw err;
        }
    }
}
module.exports = SesTemplateService;


