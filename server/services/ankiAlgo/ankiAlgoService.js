const LinkedInConnection = require('../../models/flashcards.model');

/**
 * Class represents services for anki Algo.
 */
class AnkiAlgoService {

    /**
     * @desc This function is being used to get next card to review
     * @author Growexx
     * @since 04/09/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async review (req) {
      const dueConnections = await LinkedInConnection.find({
        lastInteractionDate: { $lte: new Date() },
      }).lean();

      if (dueConnections.length === 0) {
        throw new Error('No connections are due for review.');
      }

      dueConnections.sort((a, b) => {
        const priorityScoreA = this.calculatePriorityScore(a);
        const priorityScoreB = this.calculatePriorityScore(b);
        return priorityScoreB - priorityScoreA;
      });
      const nextConnection = dueConnections[0];
      return nextConnection;
    }

    static async listConnectionsByPriority() {
      const connections = await LinkedInConnection.find({}).lean();
  
      connections.sort((a, b) => {
        const priorityScoreA = this.calculatePriorityScore(a);
        const priorityScoreB = this.calculatePriorityScore(b);
        return priorityScoreB - priorityScoreA;
      });
  
      return connections;
    }

    /**
     * @desc This function is being used to provide feedback on a reviewed flashcard
     * @author Growexx
     * @since 04/09/2023
     * @param {Object} req Request
     * @param {Object} res Response
     * @param {function} next exceptionHandler Calls exceptionHandler
     */
    static async interaction (req, res) {
      const { id, interactionTime } = req.body;
      const connection = await LinkedInConnection.findById(id);
      if (!connection) {
        throw ('Flashcard not found.');
      }
      this.updateInteraction(connection, interactionTime);
      await connection.save();
      return 'Review recorded successfully.';
    }

    static updateInteraction(connection, interactionTime) {
      connection.interactionTime = interactionTime;
      connection.lastInteractionDate = new Date();
      connection.priorityScore = this.calculatePriorityScore(connection);
    }

    static calculatePriorityScore(connection) {
      const daysSinceLastInteraction = Math.floor((new Date() - connection.lastInteractionDate) / (1000 * 60 * 60 * 24));
      return (connection.interactionTime * 0.2) + (connection.relevanceScore * 0.3) - (daysSinceLastInteraction * 0.5);
    }

    static formatNextReviewTime(timestamp) {
      const reviewTime = new Date(timestamp);
      const now = new Date();
      const timeDifference = reviewTime - now;
      if (timeDifference < 60000) {
          return `${Math.floor(timeDifference / 1000)} seconds`;
      } else if (timeDifference < 3600000) {
          return `${Math.floor(timeDifference / 60000)} minutes`;
      } else {
          return `${Math.floor(timeDifference / 3600000)} hours`;
      }
    }

    static async addConnections (req, res){
      const {name, title, company, lastInteractionDate, relevanceScore, interactionTime, notes} = req.body;
      const data = {name, title, company, lastInteractionDate, relevanceScore, interactionTime, notes}
      return await LinkedInConnection.create(data)
    }
}

module.exports = AnkiAlgoService;
