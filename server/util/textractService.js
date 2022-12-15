const AWS = require('aws-sdk');

const textract = new AWS.Textract({
    region: process.env.AWS_REGION
});

class TextractService {
    static async getDocumentAsText (file) {
        try {
            const params = {
                Document: {
                    Bytes: file
                },
                FeatureTypes: ['FORMS', 'TABLES']
            };
            return await textract.analyzeDocument(params).promise();
        } catch (error) {
            CONSOLE_LOGGER.error('Error in getDocumentAsText():', error);
            throw error;
        }
    }

    static async getDocumentAsInvoiceFields (file) {
        try {
            const params = {
                Document: {
                    Bytes: file
                }
            };
            return await textract.analyzeExpense(params).promise();
        } catch (error) {
            CONSOLE_LOGGER.error('Error in getDocumentAsInvoiceFields():', error);
            throw error;
        }
    }
}

module.exports = TextractService;
