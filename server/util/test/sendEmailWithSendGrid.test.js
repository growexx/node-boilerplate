const sgMail = require('@sendgrid/mail');
const { expect } = require('chai');
const sinon = require('sinon');
const EmailService = require('../sendEmailWithSendGrid');

describe('EmailService', () => {
    it('should send an email', async () => {
        const email = 'test@example.com';
        const subject = 'Test Email';
        const template = 'emailTemplates/forgotPasswordMail.html';
        const templateVariables = { name: 'John', age: 30 };

        const sendStub = sinon
            .stub(sgMail, 'send')
            .resolves('Email sent successfully');
        const result = await EmailService.prepareAndSendEmail(
            email,
            subject,
            template,
            templateVariables
        );

        expect(result).to.equal('Email sent successfully');
        expect(sendStub.calledOnce).to.be.true;
        sinon.restore();
    });

    it('should send an email with attachments', async () => {
        const email = 'test@example.com';
        const subject = 'Test Email';
        const template = 'emailTemplates/forgotPasswordMail.html';
        const templateVariables = { name: 'John', age: 30 };
        const attachments = [{ path: '/path/to/attachment.pdf' }];

        const sendStub = sinon
            .stub(sgMail, 'send')
            .resolves('Email sent successfully');
        const result = await EmailService.prepareAndSendEmailWithAttachment(
            email,
            subject,
            template,
            templateVariables,
            attachments
        );

        expect(result).to.equal('Email sent successfully');
        expect(sendStub.calledOnce).to.be.true;
        sinon.restore();
    });

    it('should send an email without attachments', async () => {
        const email = 'test@example.com';
        const subject = 'Test Email';
        const template = 'emailTemplates/forgotPasswordMail.html';
        const templateVariables = { name: 'John', age: 30 };
        const attachments = [];

        const sendStub = sinon
            .stub(sgMail, 'send')
            .resolves('Email sent successfully');
        const result = await EmailService.prepareAndSendEmailWithAttachment(
            email,
            subject,
            template,
            templateVariables,
            attachments
        );

        expect(result).to.equal('Email sent successfully');
        expect(sendStub.calledOnce).to.be.true;
        sinon.restore();
    });
});
