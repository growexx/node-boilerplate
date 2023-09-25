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
      const { id } = req.body;
      const connection = await LinkedInConnection.findById(id);
      if (!connection) {
        throw ('Flashcard not found.');
      }
      this.updateInteraction(connection);
      await connection.save();
      return 'Review recorded successfully.';
    }

    static updateInteraction(connection) {
      connection.lastInteractionDate = new Date();
      connection.priorityScore = this.calculatePriorityScore(connection);
    }

    static calculatePriorityScore(connection) {
      const interactionTypePriorities = {
        casual: 0.5,
        social: 0.3,
        formal: 0.2,
      };
      const interactionTypeWeight = interactionTypePriorities[connection.interactionType] || 0;
      const daysSinceLastInteraction = Math.floor((new Date() - new Date(connection.lastInteractionDate)) / (1000 * 60 * 60 * 24));
      const daysWeighted = Math.pow(daysSinceLastInteraction + 1, 1.5);

      return interactionTypeWeight * daysWeighted;
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
      const connections  = req.body;

      if (!Array.isArray(connections) || connections.length === 0) {
        throw new Error('Invalid input. Expected an array of connections.');
      }
      for (const connection of connections) {
        connection.priorityScore = this.calculatePriorityScore(connection);
      }

      const result = await LinkedInConnection.insertMany(connections);

      return result;
    }

    static async getUsersByInteractionType (req, res) {
      const connections = await LinkedInConnection.find({}).lean();

      const groupedConnections = connections.reduce((result, connection) => {
        const { interactionType } = connection;

        if (!result[interactionType]) {
          result[interactionType] = [];
        }

        result[interactionType].push(connection);
        return result;
      }, {});

      for (const interactionType in groupedConnections) {
        if (groupedConnections.hasOwnProperty(interactionType)) {
          const connectionsInGroup = groupedConnections[interactionType];
          connectionsInGroup.sort((a, b) => {
            const priorityScoreA = this.calculatePriorityScore(a);
            const priorityScoreB = this.calculatePriorityScore(b);
            return priorityScoreB - priorityScoreA;
          });
        }
      }
      return groupedConnections;
    }
}

module.exports = AnkiAlgoService;
