const Template = require('../../models/template.model');
const Bill = require('../../models/bill.model');
const OCRExtraction = require('../../util/ocrExtraction');

/**
 * Class represents services for OCR.
 */
class OcrService {
    /**
     * @desc This function is being used to sign in user
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {Object} res Response
     */
    static async analyseOCRExpense (req ) {
        const ocrImageBuffer = req.file.buffer;

        const ocrJson = await OCRExtraction.getExpenseOCR({ buffer: ocrImageBuffer });
        const ocrFields = OCRExtraction.getExpenseOCRFields(ocrJson);


        // check for existing vendor name, else save to db
        // check summaryFields for existing vendor and match fields else match with constant fields
        // save the matched fields in template collection
        const template = await Template.findOne({ vendorName: ocrFields.vendor.name }).lean();
        const mappedFields = [];
        const mappedData = {};

        if (!template) {
            Object.keys(ocrFields.summaryFields).forEach(field=>{
                if (CONSTANTS.AVAILABLE_FIELD_NAMES.includes(field.toLowerCase())) {
                    mappedFields.push(field.toLowerCase());
                    mappedData[field.toLowerCase()] = ocrFields.summaryFields[field];
                }
            });
            await Template.create({ mappedFields, vendorName: ocrFields.vendor.name });
        }
        else {
            Object.keys(ocrFields.summaryFields).forEach(field=>{
                if (template.mappedFields.includes(field.toLowerCase())) {
                    mappedFields.push(field.toLowerCase());
                    mappedData[field.toLowerCase()] = ocrFields.summaryFields[field];
                }
            });
        }

        const billData = {
            vendorName: ocrFields.vendor.name,
            vendorAddress: ocrFields.vendor.address,
            merchantId: mappedData['merchant id'],
            amount: mappedData.amount || mappedData.total,
            subTotal: mappedData.subtotal,
            tax: mappedData['total tax'] || mappedData.tax,
            itemsSold: mappedData['total number of items sold'],
            operatorNumber: mappedData['op#'],
            operatorName: mappedData.name,
            purchasedItems: { ...ocrFields.lineItems }
        };
        await Bill.create(billData);

        return ocrJson;
    }

}

module.exports = OcrService;
