const jwt = require('jsonwebtoken');
const MOMENT = require('moment');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

const registeredUser = {};
const sessionTokens = {};
let interval;

class Socket {
    static validateUser (ws, payload) {
        return (_.has(registeredUser, ws.id) && sessionTokens[ws.id] === payload.token);
    }

    static registerUser (ws, payload) {
        if (!_.has(registeredUser, ws.id)) {
            const decodedJwt = jwt.decode(payload.jwt, { complete: true });
            const decodedJwtPayload = decodedJwt.payload;
            const compareDate = MOMENT().utc().unix();
            if (decodedJwtPayload.exp >= compareDate) {
                const token = uuidv4();
                sessionTokens[ws.id] = token;
                registeredUser[ws.id] = payload.jwt ;
                Socket.sendResponseToClient(ws,
                    {
                        'socketId': ws.id,
                        'status': true,
                        'action': payload.action,
                        'text': MESSAGES.AUTHORIZED,
                        token
                    });
            } else {
                Socket.sendResponseToClient(ws,
                    {
                        'status': false,
                        'action': payload.action,
                        'text': MESSAGES.REGISTER_FAILED
                    });

            }
        } else {
            const token = sessionTokens[ws.id];

            Socket.sendResponseToClient(ws,
                {
                    'socketId': ws.id,
                    'status': true,
                    'action': payload.action,
                    'text': MESSAGES.AUTHORIZED,
                    token
                });
        }
    }

    static async disconnectClient (ws) {
        delete registeredUser[ws.id];
        delete sessionTokens[ws.id];

        CONSOLE_LOGGER.info('Client Disconnected > ', ws.id);
        ws.close();

        if (Object.keys(registeredUser).length === 0) {
            clearInterval(interval);
        }
    }

    static async sendData (ws, payload) {
        if (Socket.validateUser(ws, payload)) {
            if (process.env.NODE_ENV !== 'testing') {
                interval = setInterval(() => {
                    Socket.sendResponseToClient(ws,
                        {
                            action: 'data',
                            value: Socket.externalApiCall()
                        });

                }, 1000);
            } else {
                Socket.sendResponseToClient(ws,
                    {
                        action: 'data',
                        value: Socket.externalApiCall()
                    });
            }
        } else {
            Socket.sendResponseToClient(ws,
                {
                    action: 'data',
                    'status': 'error',
                    'text': MESSAGES.UNAUTHORIZED
                });
        }
    }

    static sendResponseToClient (ws, responseObj) {
        CONSOLE_LOGGER.info('sendResponseToClient Websocket', ws.id, JSON.stringify(responseObj));
        ws.send(JSON.stringify(responseObj));
    }

    // this function contains external api calls
    // here, this function contains very basic code to demonstrate mocking
    static externalApiCall () {
        return Math.random().toString(10).slice(-6);
    }
}

module.exports = Socket ;
