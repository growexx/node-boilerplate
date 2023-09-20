const { w3cwebsocket } = require('websocket');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const jwt = require('jsonwebtoken');
const Socket = require('../socket');
const sinon = require('sinon');
const MESSAGES = require('../../locales/en.json');

chai.use(chaiHttp);

const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const expiredTokenOptionalInfo = {
    algorithm: 'HS256'
};

const userData = {
    id: 'fd604030-6fb5-11ec-8827-193cece4754a',
    email: 'super@mailinator.com'
};

const expiredUserData = {
    id: 'fd604030-6fb5-11ec-8827-193cece4754a',
    email: 'super@mailinator.com',
    exp: 1654606501
};

const validSocketToken = {
    token: jwt.sign(userData, process.env.JWT_SECRET, tokenOptionalInfo)
};
const expiredSocketToken = {
    token: jwt.sign(expiredUserData, process.env.JWT_SECRET, expiredTokenOptionalInfo)
};

describe('Socket events', () => {
    try {
        let client;
        let externalApiMock;
        const authBody = { action: 'registerUser', jwt: validSocketToken.token };
        const expiredAuthBody = { action: 'registerUser', jwt: expiredSocketToken.token };

        // eslint-disable-next-line no-undef
        beforeEach((done) => {
            externalApiMock = sinon.stub(Socket, 'externalApiCall');
            client = new w3cwebsocket(process.env.SOCKET_BASE_URL);
            client.connected;
            done();
        });

        // eslint-disable-next-line no-undef
        afterEach((done) => {
            externalApiMock.restore();
            client && client.close();
            done();
        });

        it('should successfully register a new user', (done)=>{
            client.onmessage = (e) => {
                const message = JSON.parse(e.data);
                if (message.action === 'connected' ) {
                    client.send(JSON.stringify(authBody));
                } else if (message.action === 'registerUser') {
                    assert.equal(message.text, MESSAGES.AUTHORIZED);
                    done();
                }
            };
        });

        it('should successfully handle registration of an existing user', (done)=>{
            let registered = false;

            client.onmessage = (e) => {
                const message = JSON.parse(e.data);
                if (message.action === 'connected' ) {
                    client.send(JSON.stringify(authBody));
                } else if (message.action === 'registerUser') {
                    if (!registered) {
                        client.send(JSON.stringify(authBody));
                        registered = true;
                    } else {
                        assert.equal(message.text, MESSAGES.AUTHORIZED);
                        done();
                    }
                }
            };
        });

        it('should not register user with an expired jwt', (done)=>{
            client.onmessage = (e) => {
                const message = JSON.parse(e.data);
                if (message.action === 'connected' ) {
                    client.send(JSON.stringify(expiredAuthBody));
                } else if (message.action === 'registerUser') {
                    assert.equal(message.text, MESSAGES.REGISTER_FAILED);
                    done();
                }
            };
        });

        it('should successfully send data to the authorized client', (done)=>{
            externalApiMock.returns(123456);

            client.onmessage = (e) => {
                const message = JSON.parse(e.data);
                if (message.action === 'connected' ) {
                    client.send(JSON.stringify(authBody));
                } else if (message.action === 'registerUser' && message.text === MESSAGES.AUTHORIZED) {
                    client.send(JSON.stringify({ action: 'sendData', token: message.token }));
                } else if (message.action === 'data') {
                    expect(message).to.have.property('value');
                    done();
                }
            };
        });

        it('should not send data to unauthorized client', (done)=>{
            client.onmessage = (e) => {
                const message = JSON.parse(e.data);
                if (message.action === 'connected' ) {
                    client.send(JSON.stringify(authBody));
                } else if (message.action === 'registerUser' && message.text === MESSAGES.AUTHORIZED) {
                    client.send(JSON.stringify({ action: 'sendData', token: '123456' }));
                } else if (message.action === 'data') {
                    assert.equal(message.text, MESSAGES.UNAUTHORIZED);
                    done();
                }
            };
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }

});
