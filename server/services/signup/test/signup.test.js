const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignup');
const sinon = require('sinon');
const axios = require('axios');
const constants = require('../../../util/constants');
chai.use(chaiHttp);
const trueDataStatus = 1;
let validRegistration;

describe('Signup Account', () => {
    try {
        TestCase.registerAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should validate if email is already registered and password is incorrect.', (done) => {
            const registerUser = {
                email: 'super@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
                otp: 123456
            };
            validRegistration = registerUser;
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 422);
                    done();
                });
        });

        it('As a user I should register as user', (done) => {
            const registerUser = {
                email: 'john@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                otp: 123456
            };
            validRegistration = registerUser;
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.USER);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I should validate if email is already registered but not verified', (done) => {
            const registerUser = {
                email: 'john@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });

        it('As a user I should validate if email is already registered and login', (done) => {
            const registerUser = {
                email: 'super@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
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

describe('Signup Account with facebook account', () => {
    let axiosGetStub;
    const token = 'facebookToken';
    beforeEach(() => {
        axiosGetStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        axiosGetStub.restore();
    });

    try {
        it('As a user I should register as user', (done) => {
            const response = {
                data: {
                    id: 'id',
                    email: 'example@example.com',
                    first_name: 'fakeFirstName',
                    last_name: 'fakeLastName',
                    picture: {
                        data: {
                            url: 'fakePictureUrl'
                        }
                    }
                }
            };
            axiosGetStub.withArgs(`${constants.FACEBOOK_AUTH_URL}${token}`).resolves(response);
            const payload = {
                platform: 'facebook',
                token
            };
            request(process.env.BASE_URL)
                .post('/auth/social-signup')
                .send(payload)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I should login if i am already register with email', (done) => {
            const response = {
                data: {
                    id: 'id',
                    email: 'example@example.com',
                    first_name: 'fakeFirstName',
                    last_name: 'fakeLastName',
                    picture: {
                        data: {
                            url: 'fakePictureUrl'
                        }
                    }
                }
            };
            axiosGetStub.withArgs(`${constants.FACEBOOK_AUTH_URL}${token}`).resolves(response);
            const payload = {
                platform: 'facebook',
                token
            };
            request(process.env.BASE_URL)
                .post('/auth/social-signup')
                .send(payload)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I should not register as user if facebook token is invalid', (done) => {
            axiosGetStub.withArgs(`${constants.FACEBOOK_AUTH_URL}${token}`).rejects(new Error('Invalid Token'));
            const payload = {
                platform: 'facebook',
                token
            };
            request(process.env.BASE_URL)
                .post('/auth/social-signup')
                .send(payload)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Signup Account with apple and google account', () => {
    try {
        it('As a user I should register as user from google account', (done) => {
            const payload = {
                platform: 'google',
                token: 'token',
                firstName: 'test',
                lastName: 'user',
                email: 'test@google.com',
                picture: 'url',
                id: 'id'
            };
            request(process.env.BASE_URL)
                .post('/auth/social-signup')
                .send(payload)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
        it('As a user I should register as user from apple account', (done) => {
            const payload = {
                platform: 'apple',
                token: 'token',
                firstName: 'test',
                lastName: 'user',
                email: 'test@apple.com',
                picture: 'url',
                id: 'id'
            };
            request(process.env.BASE_URL)
                .post('/auth/social-signup')
                .send(payload)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
        it('As a user I should not register as user if platform is invalid', (done) => {
            const payload = {
                platform: 'microsoft',
                token: 'token',
                firstName: 'test',
                lastName: 'user',
                email: 'test@microsoft.com',
                picture: 'url',
                id: 'id'
            };
            request(process.env.BASE_URL)
                .post('/auth/social-signup')
                .send(payload)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
describe('Verify Account', () => {
    try {
        TestCase.verifyAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/verify-account')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should verify existing user user', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/verify-account')
                .send({ email: validRegistration.email, otp: validRegistration.otp })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Resend OTP', () => {
    try {
        TestCase.resendOTP.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/resend-otp')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should send resend OTP to user', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/resend-otp')
                .send({ email: validRegistration.email })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
