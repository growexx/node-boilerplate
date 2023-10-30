const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignup');
const UserVerification = require('../../../models/userVerification.model');
const sinon = require('sinon');
const SignUpService = require('../signUpService');
const Email = require('../../../util/sendEmail');
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

        it('As a user I should register as user with leading and trailing white space containing firstName', (done) => {
            const registerUser = {
                email: 'johnsmith@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                firstName: '    John   ',
                lastName: '  smith',
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

describe('Signup Account MFA', () => {
    try {
        let sendVerificationSMSSpy;
        let sendVerificationEmailSpy;
        before(() => {
            sendVerificationSMSSpy = sinon.stub(SignUpService, 'sendVerificationSMS').resolves(true);
            sendVerificationEmailSpy = sinon.stub(Email, 'sendVerificationEmail').resolves(true);
        });

        after(() => {
            sendVerificationSMSSpy.restore();
            sendVerificationEmailSpy.restore();
        });

        it('As a user, I Signup the user in MFA', (done) => {
            // Password: 123456
            const reqObj = {
                'email': 'admin@growexx.com',
                'phoneNumber': '+919409805584',
                'password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                'uniqueString': 'test',
                'userType': 1
            };

            request(process.env.BASE_URL)
                .post('/auth/signup-mfa')
                .send(reqObj)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user, I Signup the user in MFA is not active', (done) => {
            // Password: 123456
            const reqObj = {
                'email': 'admin@growexx.com',
                'phoneNumber': '+919409805584',
                'password': '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
                'userType': 1
            };

            request(process.env.BASE_URL)
                .post('/auth/signup-mfa')
                .send(reqObj)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Verify MFA Account', async () => {
    try {
        let userVerificationDetails;
        const userVerificationObj = {
            userId: '653f52a9928bce5f1104e5ca',
            uniqueString: '7628ffd6-ad5b-4676-93e6-0fb8d0cf76d3653f52a9928bce5f1104e5ca',
            otp: '905211',
            expiresAt: '2023-10-30T08:02:47.598+00:00'
        };
        before(() => {
            userVerificationDetails = sinon.stub(UserVerification, 'findOne').resolves(userVerificationObj);
        });

        after(() => {
            userVerificationDetails.restore();
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

