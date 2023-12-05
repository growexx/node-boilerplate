const { expect } = require('chai');
const DateService = require('../dateService');


describe('Date parser', () => {
    it('should parse date with default format', async () => {

        const date = '1-1-11';

        const parsedDate = DateService.parseDate(date);

        expect(parsedDate).to.be.not.null;
        expect(parsedDate).to.deep.equal({
            isValid: true,
            parsedDate: '2011-01-01',
            inputFormat: 'D-M-YY'
        });
    });

    it('should parse date with given format', async () => {

        const date = '1-5-11';
        const format = 'YYYY/DD/MM';

        const parsedDate = DateService.parseDate(date, format);

        expect(parsedDate).to.be.not.null;
        expect(parsedDate).to.deep.equal({
            isValid: true,
            parsedDate: '2011/01/05',
            inputFormat: 'D-M-YY'
        });
    });

    it('should return error response if format is not valid ', async () => {

        const date = '1-January-2001';
        const parsedDate = DateService.parseDate(date);

        expect(parsedDate).to.be.not.null;
        expect(parsedDate).to.deep.equal({
            isValid: false,
            parsedDate: null,
            inputFormat: null
        });
    });
});
