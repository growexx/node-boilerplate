const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect, assert } = chai;
const request = require('supertest');
const TestCase = require('./pushNotification');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};


// User Token
const user = {
    id: '5f083c352a7908662c334532',
    email: 'user@mailinator.com'
};
const requestPayloadUser = {
    token: jwt.sign(user, process.env.JWT_SECRET, tokenOptionalInfo)
};



describe('Create Notification', () => {
    try {
        // Check all validation;
        TestCase.createNotification.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/user/create-notification')
                    .send(data.options)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        console.log(res.body);
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



describe('Update Token', () => {
    try {
        // Check all validation;
        TestCase.updatePushNotificationToken.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/update-push-notification-token')
                    .send(data.options)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Validate push notification token', () => {
    try {
        // Check all validation;
        TestCase.validatePushNotificationToken.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/user/validate-push-notification-token')
                    .send(data.options)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


describe('Send batch notification', () => {
    try {
        // Check all validation;
        TestCase.sendBatchNotification.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/user/send-batch-notification')
                    .send(data.options)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


describe('Send individual notification', () => {
    try {
        // Check all validation;
        TestCase.sendIndividualNotificationToWeb.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/user/individual-push-notification-for-web')
                    .send(data.options)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



describe('Android - Send individual notification', () => {
    try {
        // Check all validation;
        TestCase.sendIndividualNotificationToAndroid.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/user/individual-push-notification-for-android')
                    .send(data.options)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        console.log(res.body);
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
