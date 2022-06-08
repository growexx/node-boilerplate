const AWS = require('aws-sdk');
const fs = require('fs');
const { reject } = require('lodash');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const ses = new AWS.SES({ region: 'us-east-1', apiVersion: '2010-12-01' });
const SesValidator = require('./sesValidator');

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
            const params = {
                Template: {
                    TemplateName: req.body.templateName,
                    HtmlPart: htmlMessage,
                    SubjectPart: req.body.subject,
                },
            };

            return new Promise((resolve, reject) => {
                ses.createTemplate(params, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
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
        const params = {
            TemplateName:req.body.templateName,
        };
        return new Promise((resolve, reject) => {
            ses.createTemplate(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ template: data.Template });
                }
            });
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
        const params = {
            TemplateName: req.body.templateName,
        };
        return new Promise((resolve, reject) => {
            ses.createTemplate(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
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
        let htmlMessage;
        if (req.file !== undefined) {
            htmlMessage = req.file.buffer.toString('utf8');
        }
        const params = {
            Template: {
                TemplateName:req.body.templateName,
                HtmlPart: htmlMessage,
                SubjectPart: req.body.subject,
            },
        };
        return new Promise((resolve, reject) => {
            ses.createTemplate(params, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
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


