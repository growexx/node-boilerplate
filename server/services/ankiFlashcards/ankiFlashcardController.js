
const AnkiFlashcardService = require('./ankiFlashcardService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for anki Flashcard.
 */
class AnkiFlashcardController {
    /**
     * @desc This function is being used to get flashcards
     * @author Growexx
     * @since 04/09/2023
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async createFlashcard (req, res) {
        try {
            const data = await AnkiFlashcardService.createFlashcard(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async getNextDueFlashcard (req, res) {
        try {
            const data = await AnkiFlashcardService.getNextDueFlashcard(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async updateFlashcardInterval (req, res) {
        try {
            const data = await AnkiFlashcardService.updateFlashcardInterval(req, res.__);
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
    static async processReview (req, res) {
        try {
            const data = await AnkiFlashcardService.processReview(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    static async getFlashcardsByNextReview (req, res) {
        try {
            const data = await AnkiFlashcardService.getFlashcardsByNextReview(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AnkiFlashcardController;
