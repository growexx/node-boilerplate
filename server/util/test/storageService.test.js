const { expect } = require('chai');
const sinon = require('sinon');
const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const Presigner = require('../presign.internal');
const StorageService = require('../storageService');

describe('Storage service', () => {
    it('should able to upload file in s3 bucket', async () => {
        const sendStub = sinon.stub(S3Client.prototype, 'send');
        const mockResponse = {
            success: true
        };
        sendStub.returns(mockResponse);
        const filePath = 'test-path';
        const file = Buffer.from([
            0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x2C, 0x20, 0x57,
            0x6F, 0x72, 0x6C, 0x64, 0x21
        ]);
        const data = await StorageService.uploadFile(file, filePath);

        expect(sendStub.calledOnce).to.be.true;
        const sendArgs = sendStub.firstCall.args[0];
        expect(sendArgs).to.be.an.instanceOf(PutObjectCommand);
        expect(data).to.deep.equal(mockResponse);

        sendStub.restore();
    });

    it('should able to delete file from s3 bucket', async () => {
        const sendStub = sinon.stub(S3Client.prototype, 'send');
        const mockResponse = {
            success: true
        };
        sendStub.returns(mockResponse);
        const filePath = 'test-path';
        const data = await StorageService.deleteFile(filePath);

        expect(sendStub.calledOnce).to.be.true;
        const sendArgs = sendStub.firstCall.args[0];
        expect(sendArgs).to.be.an.instanceOf(DeleteObjectCommand);
        expect(data).to.deep.equal(mockResponse);

        sendStub.restore();
    });

    it('should able to get file from s3 bucket', async () => {
        const sendStub = sinon.stub(S3Client.prototype, 'send');
        const mockResponse = {
            success: true
        };
        sendStub.returns(mockResponse);
        const filePath = 'test-path';
        const data = await StorageService.getFile(filePath);

        expect(sendStub.calledOnce).to.be.true;
        const sendArgs = sendStub.firstCall.args[0];
        expect(sendArgs).to.be.an.instanceOf(GetObjectCommand);
        expect(data).to.deep.equal(mockResponse);

        sendStub.restore();
    });

    it('should generate a signed URL using a mocked getSignedUrl', async () => {
        const getSignedUrlMock = sinon.stub(Presigner, 'getSignedUrl');
        const mockURL = {
            url: 'test-url'
        };
        getSignedUrlMock.resolves(mockURL.url);

        const fileName = 'example-file.txt';
        const url = await StorageService.generateDownloadUrl(fileName);

        expect(url).to.equal(mockURL.url);
        getSignedUrlMock.restore();
    });
});
