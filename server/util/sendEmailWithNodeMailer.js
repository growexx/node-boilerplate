const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

class EmailService {

    /**
     * This function is being used to send the email
     * @author Growexx
     * @since 17/10/2023
     */
    static async prepareAndSendEmail (email, subject, template, templateVariables) {
        let html = await readFileAsync(template, 'utf8');
        templateVariables.year = MOMENT().year();
        for (const [key, value] of Object.entries(templateVariables)) {
            html = html.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.IS_SECURE,
            auth: {
                user: process.env.SENDERS_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.SENDERS_EMAIL,
            to: email.join(','),
            subject,
            html
        });
    }

    /**
     * This function is being used to send the email with given attachments
     * @author Growexx
     * @since 17/10/2023
     */
    static async prepareAndSendEmailWithAttachment (email, subject, template, templateVariables, attachments) {
        let html = await readFileAsync(template, 'utf8');
        templateVariables.year = MOMENT().year();
        for (const [key, value] of Object.entries(templateVariables)) {
            html = html.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure:  process.env.IS_SECURE,
            auth: {
                user: process.env.SENDERS_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.SENDERS_EMAIL,
            to: email.join(','),
            attachments,
            subject,
            html
        });
    }
}

module.exports = EmailService;
