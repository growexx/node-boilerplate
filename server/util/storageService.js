const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const Presigner = require('./presign.internal');
const CONSTANTS = require('./constants');
const s3Client = new S3Client();

/**
 * This class represents common s3 services
 */
class StorageService {

    /**
     * This function is being used to upload a file into s3 bucket.
     * @author Growexx
     * @since 27/10/2023
     */
    static async uploadFile (file, filename) {
        const params = {
            Key: filename,
            Bucket:  process.env.AWS_S3_PUBLIC_BUCKET,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const command = new PutObjectCommand(params);
        return await s3Client.send(command);
    }

    /**
     * This function is being used to delete the file from S3 bucket
     * @author Growexx
     * @since 27/10/2023
     */
    static async deleteFile (filename) {
        const params = {
            Key: filename,
            Bucket:  process.env.AWS_S3_PUBLIC_BUCKET
        };
        const command = new DeleteObjectCommand(params);
        return await s3Client.send(command);
    }

    /**
     * This function is being used to generate download url of file from S3 bucket
     * @author Growexx
     * @since 27/10/2023
     */
    static async generateDownloadUrl (fileName) {
        const params = {
            Bucket: process.env.AWS_S3_PUBLIC_BUCKET,
            Key: fileName
        };
        const command = new GetObjectCommand(params);
        return await Presigner.getSignedUrl(s3Client, command, { expiresIn: CONSTANTS.S3_PRESIGNED_URL_EXPIRY });
    }

    /**
     * This function is being used to get the file from S3 bucket
     * @author Growexx
     * @since 27/10/2023
     */
    static async getFile (fileName) {
        const params = {
            Bucket: process.env.AWS_S3_PUBLIC_BUCKET,
            Key: fileName
        };
        const command = new GetObjectCommand(params);
        return await s3Client.send(command);
    }
}

module.exports = StorageService;
