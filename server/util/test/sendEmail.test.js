const { expect } = require('chai');
const sinon = require('sinon');
const {
    SESClient, SendEmailCommand, SendRawEmailCommand
} = require('@aws-sdk/client-ses');
const EmailService = require('../sendEmail');


describe('AWS SES Email service', () => {
    it('should able to sent an email', async () => {
        const sendStub = sinon.stub(SESClient.prototype, 'send');
        const mockResponse = {
        };
        sendStub.returns(mockResponse);
        const email = 'test@example.com';
        const subject = 'Test Email';
        const template = 'emailTemplates/abc.html';
        const templateVariables = { name: 'John', age: 30 };
        const fsReadFileStub = sinon.stub(require('fs').promises, 'readFile');
        fsReadFileStub.resolves('<html>Mocked HTML Content</html>');

        await EmailService.prepareAndSendEmail(
            email,
            subject,
            template,
            templateVariables);

        expect(sendStub.calledOnce).to.be.true;
        const sendArgs = sendStub.firstCall.args[0];
        expect(sendArgs).to.be.an.instanceOf(SendEmailCommand);
        sendStub.restore();
        fsReadFileStub.restore();
    });

    it('should send an email with attachments', async () => {
        const sesClientStub = sinon.stub(SESClient.prototype, 'send');

        const mockResponse = {
        };
        sesClientStub.returns(mockResponse);

        const fsReadFileStub = sinon.stub(require('fs').promises, 'readFile');
        fsReadFileStub.resolves('<html>Mocked HTML Content</html>');

        const email = 'test@example.com';
        const subject = 'Test Email';
        const template = 'emailTemplates/abc.html';
        const templateVariables = { name: 'John', age: 30 };
        const attachments = [
            {
                filename: 'attachment.txt',
                content: 'Attachment content'
            }
        ];

        await EmailService.prepareAndSendEmailWithAttachment(
            email,
            subject,
            template,
            templateVariables,
            attachments
        );

        expect(sesClientStub.calledOnce).to.be.true;
        const sendArgs = sesClientStub.firstCall.args[0];
        expect(sendArgs).to.be.an.instanceOf(SendRawEmailCommand);
        sesClientStub.restore();
        fsReadFileStub.restore();
    });
});
