const fs = require('fs');
const { promisify } = require('util');
const Constants = require('./constants');
const readFileAsync = promisify(fs.readFile);
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class EmailService {
    static async prepareAndSendEmail (email, subject, template, templateVariables) {
        if (process.env.NODE_ENV !== 'testing') {
            let htmlMessage = await readFileAsync(template, 'utf8');
            templateVariables.year = MOMENT().year();
            for (const [key, value] of Object.entries(templateVariables)) {
                htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
            }

            const msg = {
                to: email,
                from: Constants.DEVELOPERS_EMAIL,
                subject,
                html: htmlMessage
            };

            return sgMail.send(msg);
        }
        return Promise.resolve();
    }

    static async prepareAndSendEmailWithAttachment (email, subject, template, templateVariables, attachments) {
        if (process.env.NODE_ENV !== 'testing') {
            let htmlMessage = await readFileAsync(template, 'utf8');
            templateVariables.year = MOMENT().year();
            for (const [key, value] of Object.entries(templateVariables)) {
                htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
            }

            const msg = {
                to: email,
                from: Constants.DEVELOPERS_EMAIL,
                subject,
                html: htmlMessage
            };

            if (attachments && attachments.length > 0) {
                msg.attachments = attachments;
            }

            return sgMail.send(msg);

        }
        return Promise.resolve();

    }
}

module.exports = EmailService;
