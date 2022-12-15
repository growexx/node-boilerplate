const OcrService = require('./ocrService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for ocr.
 */
class OcrController {
    /**
     * @desc This function is being used to do get text from an image
     * @author Growexx
     * @since 01/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async getText (req, res) {
        try {
            const data = await OcrService.analyseOCRExpense(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = OcrController;
