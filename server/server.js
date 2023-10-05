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
const redis = require('redis');
const methodOverride = require('method-override');
const i18n = require('i18n');
const morgan = require('morgan');
const helmet = require('helmet');
const Connection = require('./connection');

let redisClient = redis.createClient();

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

app.set('trust proxy', true);
(async () => {
    redisClient = redis.createClient();
    await redisClient.connect();
    redisClient.on('error', (error) => console.error(`Error : ${error}`));
    console.log('Redis server Connected');
})();

app.use(async (req, res, next) => {
    try {
        const key = req.ip;
        const isExist = await redisClient.get(key);

        if (!isExist) {
            const data = {
                count: 1,
                time: MOMENT().unix()
            };
            await redisClient.set(key, JSON.stringify(data));
            return next();
        }

        const existingData = JSON.parse(isExist);
        const currentTime = MOMENT().unix();
        const difference = (currentTime - existingData.time) / 60;

        if (difference >= 1) {
            const body = {
                count: 1,
                time: MOMENT().unix()
            };
            await redisClient.set(key, JSON.stringify(body));
            return next();
        } else {
            if (existingData.count >= process.env.RATE_LIMIT) {
                return res.json({ 'error': 1, 'message': 'throttled limit exceeded...' });
            }
            existingData.count++;
            await redisClient.set(key, JSON.stringify(existingData));
            return next();
        }
    } catch (err) {
        return err;
    }
});


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


module.exports = app;
