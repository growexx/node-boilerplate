/**
 * @name Server Configuration
 */

const compression = require('compression');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('swagger-jsdoc');
const swaggerDef = require('./public/swagger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sesRoutes = require('./routes/sesRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const i18n = require('i18n');
const morgan = require('morgan');
const helmet = require('helmet');
const WebSocket = require('ws');
const Connection = require('./connection');

// initialize a simple http server
const server = require('http').Server(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const Socket = require('./util/socket');

// Global Variables
global.DB_CONNECTION = require('mongoose');
global.CONSOLE_LOGGER = require('./util/logger');
global.CONSTANTS = require('./util/constants');
global.MESSAGES = require('./locales/en.json');
global.MOMENT = require('moment');
global._ = require('lodash');

const connectionToDb = () => {
    Connection.checkConnection();
};

connectionToDb();

if (process.env.LOCAL === 'true') {
    app.use(express.static('../jsdocs/jsdocs'));
    app.use(
        '/auth/coverage',
        express.static(`${__dirname}/../coverage/lcov-report`)
    );
}

// Configure i18n for multilingual
i18n.configure({
    locales: ['en'],
    directory: `${__dirname}/locales`,
    extension: '.json',
    prefix: '',
    logDebugFn (msg) {
        if (process.env.LOCAL === 'true') {
            CONSOLE_LOGGER.debug(`i18n::${CONSTANTS.LOG_LEVEL}`, msg);
        }
    }
});

app.use(compression());
app.use(helmet());
app.use(i18n.init);
app.use(cookieParser());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));

app.use(morgan('dev'));
app.use(methodOverride());

const spec = swaggerDoc(swaggerDef);
if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(spec));
}
// Landing Page
app.get('/', (req, res) => {
    res.send({
        status: 'ok',
        date: MOMENT()
    });
});
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/template', sesRoutes);


wss.getUniqueID = function () {
    function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return `${s4()}${s4()}-${s4()}`;
};


wss.on('connection', (ws) => {
    ws.id = wss.getUniqueID();
    ws.on('message', (message) => {
        const messageBody = JSON.parse(message);
        try {
            CONSOLE_LOGGER.info('messageBody', messageBody);
            switch (messageBody.action) {
                case 'registerUser':
                    Socket.registerUser(ws, messageBody);
                    break;
                case 'sendData':
                    Socket.sendData(ws, messageBody);
                    break;
                case 'disconnectUser':
                    Socket.disconnectClient(ws);
                    break;
                default:
                    Socket.sendResponseToClient(ws,
                        {
                            'action': 'invalid',
                            'data': messageBody
                        });
                    break;
            }
        } catch (e) {
            Socket.sendResponseToClient(ws,
                {
                    'action': 'Error',
                    'data': e
                });
        }
    });

    // handling what to do when Server disconnects from server
    wss.on('close', (error) => {
        CONSOLE_LOGGER.info('Disconnecting Server Due to Close Event ', error);
    });
    // handling server connection error
    wss.onerror = function (error) {
        CONSOLE_LOGGER.info('Disconnecting Server Due to Error Event ', error);
    };

    // handling what to do when clients disconnects from server
    ws.on('close', (error) => {
        CONSOLE_LOGGER.info('Client Disconnected Due to Close Event ', error);
        // Socket.disconnectClient(ws);
    });
    // handling client connection error
    ws.onerror = function (error) {
        CONSOLE_LOGGER.info('Client Triggered and Error Event ', error);
    };

    // send immediatly a feedback to the incoming connection
    Socket.sendResponseToClient(ws,
        {
            'action': 'connected',
            'message': 'Hi there, I am a WebSocket server'
        });
});

module.exports = server;
