const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);

describe('OCR extract text from bill', () => {
    try {
        it('As a user, I should not be able to upload bill', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/ocr/extract')
                .attach('photo', '');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should upload valid bill', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/ocr/extract')
                .attach('photo', 'test/mock-data/bill.png');
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload same vendor bill again', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/ocr/extract')
                .attach('photo', 'test/mock-data/bill.png');
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
