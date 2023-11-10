const { expect } = require('chai');
const sinon = require('sinon');
const {
    SecretsManagerClient,
    GetSecretValueCommand
} = require('@aws-sdk/client-secrets-manager');
const { AWS_SECRET_NAME } = require('../constants');
const getSecrets = require('../retrieveSecrets');

describe('Secrets Manager', () => {
    it('should fetch secrets successfully', async () => {
        const sendStub = sinon.stub(SecretsManagerClient.prototype, 'send');
        const mockResponse = {
            SecretString: JSON.stringify({
                secret_key: 'secret_value'
            })
        };
        sendStub.returns(mockResponse);

        const result = await getSecrets();

        expect(sendStub.calledOnce).to.be.true;
        const sendArgs = sendStub.firstCall.args[0];
        expect(sendArgs).to.be.an.instanceOf(GetSecretValueCommand);
        expect(sendArgs.input.SecretId).to.equal(
            `${process.env.NODE_ENV}-${AWS_SECRET_NAME}`
        );
        expect(result).to.equal('secret_key=secret_value\n');

        sendStub.restore();
    });

    it('should handle an error gracefully', async () => {
        const sendStub = sinon.stub(SecretsManagerClient.prototype, 'send');

        sendStub.throws(new Error('Unable to fetch secret'));
        try {
            await getSecrets();
        } catch (error) {
            expect(error.message).to.equal('Unable to fetch secret');
        }
        sendStub.restore();
    });
});
