const fs = require('fs');
const { promisify } = require('util');
const Constants = require('./constants');
const readFileAsync = promisify(fs.readFile);
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
class EmailService {
    static async prepareAndSendEmail (email, subject, template, templateVariables) {
        let htmlMessage = await readFileAsync(template, 'utf8');
        templateVariables.year = MOMENT().year();
        for (const [key, value] of Object.entries(templateVariables)) {
            htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
        }

        const msg = {
            to: email,
            from: Constants.DEVELOPERS_EMAIL,
            html: htmlMessage,
            subject
        };

        return sgMail.send(msg);
    }

    static async prepareAndSendEmailWithAttachment (email, subject, template, templateVariables, attachments) {
        let htmlMessage = await readFileAsync(template, 'utf8');
        templateVariables.year = MOMENT().year();
        for (const [key, value] of Object.entries(templateVariables)) {
            htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
        }

        const msg = {
            to: email,
            from: Constants.DEVELOPERS_EMAIL,
            html: htmlMessage,
            subject
        };

        if (attachments && attachments.length > 0) {
            msg.attachments = attachments;
        }

        return sgMail.send(msg);
    }
}

module.exports = EmailService;
