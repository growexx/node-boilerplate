const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const accountSid = 'AC12345678123456781234567812345678';
const authToken = '12345678123456781234567812345678';
const twilio = require('twilio');
const client = twilio(accountSid, authToken);
const SMSService = require('../sendSMS');
const to = '+111234567890';
describe('SMSService', () => {
    let createMessageStub;
    before(() => {
        createMessageStub = sinon.stub(client.messages, 'create');
    });
    after(() => {
        createMessageStub.restore();
    });
    it('I should able to send an SMS message', async () => {
        const expectedMessage = {
            sid: 'SM1234567890'
        };
        createMessageStub.resolves(expectedMessage);

        const result = await SMSService.sendSMS(to, 'Hello user', client );

        expect(result).to.deep.equal(expectedMessage);
        expect(createMessageStub.callCount).to.equal(1);
    });

    it('I should handle errors when sending an SMS message', async () => {
        const expectedError = new Error('Could not send SMS message');
        createMessageStub.rejects(expectedError);
        try {
            await SMSService.sendSMS(to, 'Hello user', client );
        } catch (error) {
            expect(error).to.equal(expectedError);
        }
    });
});
