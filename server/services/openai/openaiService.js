const openai = require('../../util/openaiConfig');

/**
 * Class represents services for openai services.
 */
class OpenaiService {
    /**
   * @desc This function is being used to generate text from openai
   * @author Growexx
   * @since 25/07/2023
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} locale Locale passed from request
   * @param {Object} res Response
   */
    static async textGenerator (req) {
        const { prompt } = req.body;
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        };
        const response = await openai.chat.completions.create(data);
        return response.data;
    }
}

module.exports = OpenaiService;
