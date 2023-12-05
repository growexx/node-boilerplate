const CONSTANTS = require('./constants');
const MOMENT = require('moment');

/**
 * This class represents common utilities for date parsing
 */
class DateService {

    /**
     * @desc This function is being used to parse date from various formats
     * @author Growexx
     * @since 05/12/2023
     */
    static parseDate (date, outputFormat = 'YYYY-MM-DD') {
        for (const format of CONSTANTS.DATE_FORMAT) {
            const parsedDate = MOMENT(date, format, true);
            if (parsedDate.isValid()) {
                return {
                    isValid: true,
                    parsedDate: parsedDate.format(outputFormat),
                    inputFormat: format
                };
            }
        }
        return {
            isValid: false,
            parsedDate: null,
            inputFormat: null
        };
    }
}

module.exports = DateService;
