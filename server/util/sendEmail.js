const { SESClient, SendEmailCommand, SendRawEmailCommand } = require('@aws-sdk/client-ses');
const MailComposer = require('nodemailer/lib/mail-composer');
const fs = require('fs').promises;
const CONSTANTS = require('./constants');

/**
 * This class represents common utilities for application
 */
class EmailService {

    /**
     * @desc This function is being used to send an email with html template
     * @author Growexx
     * @since 26/10/2023
     */
    static async prepareAndSendEmail (email, subject, template, templateVariables) {
        let htmlMessage = await fs.readFile(template, 'utf8');
        templateVariables.year = MOMENT().year();
        for (const [key, value] of Object.entries(templateVariables)) {
            htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
        }

        const params = {
            Destination: {
                ToAddresses: email
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: htmlMessage
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: subject
                }
            },
            ReturnPath: CONSTANTS.DEVELOPERS_EMAIL,
            Source: CONSTANTS.DEVELOPERS_EMAIL
        };
        const sesClient = new SESClient();
        await sesClient.send(new SendEmailCommand(params));
    }

    /**
     * @desc This function is being used to send an email with attachment data
     * For attachment format visit https://nodemailer.com/message/attachments/
     * @author Growexx
     * @since 26/10/2023
     */
    static async prepareAndSendEmailWithAttachment (email, subject, template, templateVariables, attachments) {
        let htmlMessage = await fs.readFile(template, 'utf8');
        templateVariables.year = MOMENT().year();
        for (const [key, value] of Object.entries(templateVariables)) {
            htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
        }

        const mailOptions = {
            from: CONSTANTS.DEVELOPERS_EMAIL,
            sender: CONSTANTS.DEVELOPERS_EMAIL,
            to: email,
            replyTo: CONSTANTS.DEVELOPERS_EMAIL,
            html: htmlMessage,
            subject,
            attachments
        };

        const mail = new MailComposer(mailOptions);
        const message = await new Promise((resolve, reject) => {
            mail.compile().build((err, message) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(message);
                }
            });
        });
        const params = {
            RawMessage: {
                Data: message
            },
            Source: CONSTANTS.DEVELOPERS_EMAIL
        };
        const sesClient = new SESClient();
        await sesClient.send(new SendRawEmailCommand(params));
    }
}

module.exports = EmailService;
