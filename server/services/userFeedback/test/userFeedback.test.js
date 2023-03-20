const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./userFeedback');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Invalid Token
const invalidToken = {
    token: ''
};

// Invalid
const invaliduser = {
    id: '5f083c352a7908662c334531',
    email: 'user@mailinator.com'
};
const requestPayloadInvalid = {
    token: jwt.sign(invaliduser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Inactive
const inactiveUser = {
    id: '5f083c352a7908662c334535',
    email: 'inactive@mailinator.com'
};
const requestPayloadInactive = {
    token: jwt.sign(inactiveUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// User Token
const user = {
    id: '5f083c352a7908662c334532',
    email: 'user@mailinator.com'
};
const requestPayloadUser = {
    token: jwt.sign(user, process.env.JWT_SECRET, tokenOptionalInfo)
};

const validRequestBody = {
    title: 'New Feature related',
    description: 'As per user request, you have build new feature amazingly. Thanks!!!'
};

const validFeedbackId = '6413f8f1c273693bebffb620';
const validFeedbackId1 = '6413f8de20047d3b6cd13af3';
const validQueryParams = { page: 1, limit: 10, sort: 1, sortBy: 'createdAt' };

describe('Add User Feedback', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .post('/user/feedback')
                .set({ Authorization: invalidToken.token })
                .send(validRequestBody)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .post('/user/feedback')
                .set({ Authorization: requestPayloadInvalid.token })
                .send(validRequestBody)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        TestCase.addFeedback.forEach(data => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/user/feedback')
                    .set({ Authorization: requestPayloadUser.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('Add user feedback', (done) => {
            request(process.env.BASE_URL)
                .post('/user/feedback')
                .set({ Authorization: requestPayloadUser.token })
                .send(validRequestBody)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Get User Feedback', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .get(`/user/feedback/${validFeedbackId}`)
                .set({ Authorization: invalidToken.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .get(`/user/feedback/${validFeedbackId}`)
                .set({ Authorization: requestPayloadInvalid.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        TestCase.getFeedback.forEach(data => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .get(`/user/feedback/${data.options.id}`)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('check feedback found or not', (done) => {
            request(process.env.BASE_URL)
                .get(`/user/feedback/${validFeedbackId}`)
                .set({ Authorization: requestPayloadUser.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('List User Feedback', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .get('/user/feedback/list')
                .set({ Authorization: invalidToken.token })
                .query(validQueryParams)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .get('/user/feedback/list')
                .set({ Authorization: requestPayloadInvalid.token })
                .query(validQueryParams)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        TestCase.listFeedback.forEach(data => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .get('/user/feedback/list')
                    .set({ Authorization: requestPayloadUser.token })
                    .query(data.options)
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

describe('Delete User Feedback', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .delete(`/user/feedback/${validFeedbackId}`)
                .set({ Authorization: invalidToken.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .delete(`/user/feedback/${validFeedbackId}`)
                .set({ Authorization: requestPayloadInvalid.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        TestCase.deleteFeedback.forEach(data => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete(`/user/feedback/${data.options.id}`)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('check feedback found for update or not', (done) => {
            request(process.env.BASE_URL)
                .delete(`/user/feedback/${validFeedbackId}`)
                .set({ Authorization: requestPayloadUser.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('InActive User Feedback', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .patch(`/user/feedback/${validFeedbackId1}`)
                .set({ Authorization: invalidToken.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .patch(`/user/feedback/${validFeedbackId1}`)
                .set({ Authorization: requestPayloadInvalid.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        TestCase.inActiveFeedback.forEach(data => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .patch(`/user/feedback/${data.options.id}`)
                    .set({ Authorization: requestPayloadUser.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('check feedback found for inactivation or not', (done) => {
            request(process.env.BASE_URL)
                .patch(`/user/feedback/${validFeedbackId1}`)
                .set({ Authorization: requestPayloadUser.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

