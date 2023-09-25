const Flashcard = require("../../models/anki.model");

class FlashcardService {
  static async createFlashcard(req, res) {
    const { question, answer } = req.body;
    const flashcard = new Flashcard({
      question,
      answer,
      dueDate: new Date(),
    });
    await flashcard.save();
    return flashcard;
  }

  static async getNextDueFlashcard(req, res) {
    const now = new Date();
    const flashcard = await Flashcard.findOne({ dueDate: { $lte: now } });
    return flashcard;
  }

  static async updateFlashcardInterval(req, res) {
    const { flashcardId, newInterval } = req.body;
    const flashcard = await Flashcard.findByIdAndUpdate(
      flashcardId,
      { interval: newInterval },
      { new: true }
    );
    return flashcard;
  }

  static async processReview(req, res) {
    const { flashcardId, grade } = req.body;
    const flashcard = await Flashcard.findById(flashcardId);
    flashcard.history.push({
      reviewedAt: new Date(),
      grade,
    });
    let easeFactor = flashcard.easeFactor || 2.5;
    const history = flashcard.history;
    let prevInterval = flashcard.interval || 1;

    if (history.length >= 3) {
      if (grade >= 3) {
        easeFactor += 0.15;
      } else {
        easeFactor -= 0.15;
      }
      easeFactor = Math.min(Math.max(easeFactor, 1.3), 2.5);
      const newInterval = prevInterval * easeFactor;
      flashcard.interval = Math.max(newInterval, 1);
    }
    flashcard.dueDate = new Date(
      new Date().getTime() + flashcard.interval * 24 * 60 * 60 * 1000
    );
    await flashcard.save();
    return flashcard;
  }

  static async getFlashcardsByNextReview(req, res) {
    const flashcards = await Flashcard.find({})
      .sort({ dueDate: 1 })
      .exec();
    return flashcards;
  }
}

module.exports = FlashcardService;
