const File = require('./file');
const TextractService = require('./textractService');

module.exports = class OCRExtraction {
    static async getOCR (filepath) {
        try {
            const file = await File.readFile(filepath);
            return await TextractService.getDocumentAsText(file);
        } catch (e) {
            CONSOLE_LOGGER.error(e);
            throw {
                message: 'OCR Failed',
                error: e
            };
        }
    }

    static async getExpenseOCR ({ filepath = null, buffer }) {
        try {
            if (filepath) {
                const file = await File.readFile(filepath);
                return await TextractService.getDocumentAsInvoiceFields(file);
            } else {
                return await TextractService.getDocumentAsInvoiceFields(buffer);
            }
        } catch (e) {
            CONSOLE_LOGGER.error(e);
            throw {
                message: 'OCR Failed',
                error: e
            };
        }
    }

    static getExpenseOCRFields (data) {
        const extractedFields = { vendor: {}, summaryFields: {}, lineItems: {} };
        data.ExpenseDocuments[0].SummaryFields.forEach(field => {
            switch (field.Type.Text) {
                case 'VENDOR_NAME':
                    extractedFields.vendor.name = field.ValueDetection.Text.replace(/[\r\n]+/g, ' ');
                    break;
                case 'VENDOR_ADDRESS':
                    extractedFields.vendor.address = field.ValueDetection.Text;
                    break;
                case 'RECEIVER_NAME': {
                    let label = field?.LabelDetection?.Text.trim().toUpperCase();
                    const value = field?.ValueDetection?.Text.trim();

                    if (label.slice(-1) === ':' || label.slice(-1) === '-' || label.slice(-1) === '=') {
                        label = label.slice(0, -1).trim();
                    }

                    extractedFields.summaryFields[label] = value;
                    break;
                }
                case 'TOTAL':
                    extractedFields.summaryFields[field?.LabelDetection?.Text] = field?.ValueDetection?.Text;
                    break;
                case 'SUBTOTAL':
                    extractedFields.summaryFields[field.LabelDetection.Text] = field.ValueDetection.Text;
                    break;
                case 'TAX':
                    if (field.LabelDetection.Text === 'TOTAL TAX') {
                        extractedFields.summaryFields[field.LabelDetection.Text] = field.ValueDetection.Text;
                    }
                    break;
                case 'OTHER': {
                    let label = field.LabelDetection.Text.trim();
                    let value = field.ValueDetection.Text.trim();

                    if (label.slice(-1) === ':' || label.slice(-1) === '-' || label.slice(-1) === '=') {
                        label = label.slice(0, -1).trim();
                    }
                    // sometimes op# also contains name field, so we split on ' ' to only get the op#
                    if (label.toLowerCase() === 'op#' ) {
                        value = value.split(' ')[0];
                    }

                    extractedFields.summaryFields[label] = value;
                    break;
                }
                default:
                    break;
            }
        });

        data.ExpenseDocuments[0].LineItemGroups[0].LineItems.forEach(lineItem => {
            let product = '';
            let price = '';
            lineItem.LineItemExpenseFields.forEach(item=>{
                if (item.Type.Text === 'ITEM') {
                    product = item.ValueDetection.Text;
                }
                if (item.Type.Text === 'PRICE') {
                    price = item.ValueDetection.Text;
                }

            });

            extractedFields.lineItems = { ...extractedFields.lineItems, [product]: price };
        });

        return extractedFields;
    }
};
