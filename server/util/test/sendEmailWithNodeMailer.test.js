const { expect } = require('chai');
const sinon = require('sinon');
const EmailService = require('../sendEmailWithNodeMailer');
const nodemailer = require('nodemailer');

describe('EmailService', () => {
    it('should send an email', async () => {
        const email = ['recipient@example.com'];
        const subject = 'Test Email';
        const template = 'emailTemplates/forgotPasswordMail.html';
        const templateVariables = { name: 'John', age: 30 };

        const createTransportStub = sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().resolves('Email sent successfully')
        });

        await EmailService.prepareAndSendEmail(email, subject, template, templateVariables);

        expect(createTransportStub.calledWith({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.IS_SECURE,
            auth: {
                user: process.env.SENDERS_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })).to.be.true;

        sinon.restore();
    });

    it('should send an email with attachments', async () => {
        const email = ['recipient@example.com'];
        const subject = 'Test Email';
        const template = 'emailTemplates/forgotPasswordMail.html';
        const templateVariables = { name: 'John', age: 30 };
        const attachments = [{ filename: 'attachment.txt', path: '/path/to/attachment.txt' }];

        const createTransportStub = sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().resolves('Email sent successfully')
        });

        await EmailService.prepareAndSendEmailWithAttachment(email, subject, template, templateVariables, attachments);

        expect(createTransportStub.calledWith({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.IS_SECURE,
            auth: {
                user: process.env.SENDERS_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        })).to.be.true;

        sinon.restore();
    });
});
