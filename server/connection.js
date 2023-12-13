const mongoose = require('mongoose');

let dbUrl = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
if (process.env.DB_USERNAME) {
    const cred = `${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}`;
    dbUrl = `mongodb+srv://${cred}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
}
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: true
};
class Connection {

    static async connectToDB () {
        await mongoose.connect(dbUrl, options).then(() => {
            CONSOLE_LOGGER.info('MongoDB is connected');
        }).catch((err) => {
            CONSOLE_LOGGER.info('DB Connection err', err);
            CONSOLE_LOGGER.info('MongoDB connection unsuccessful, retry after 0.5 seconds.');
            setTimeout(Connection.connectToDB, 500);
        });
        return mongoose.connection.readyState;
    }

    static async checkConnection () {
        return new Promise(async (resolve) => {
            const db = await mongoose.connection.readyState;
            if (db !== 1) {
                const dbStatus = await Connection.connectToDB();
                resolve(dbStatus);
            } else {
                resolve(db);
            }
        });
    }

}

module.exports = Connection;
