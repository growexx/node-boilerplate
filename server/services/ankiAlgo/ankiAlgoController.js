
const AnkiAlgoService = require('./ankiAlgoService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for anki Algo.
 */
class AnkiAlgoController {
    /**
     * @desc This function is being used to get flashcards
     * @author Growexx
     * @since 04/09/2023
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async review (req, res) {
        try {
            const data = await AnkiAlgoService.review(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async listReview (req, res) {
        try {
            const data = await AnkiAlgoService.listConnectionsByPriority(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to provide feedback on a reviewed flashcard
     * @author Growexx
     * @since 04/09/2023
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async flashcards (req, res) {
        try {
            const data = await AnkiAlgoService.interaction(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async addFlashcards (req, res) {
        try {
            const data = await AnkiAlgoService.addConnections(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AnkiAlgoController;
