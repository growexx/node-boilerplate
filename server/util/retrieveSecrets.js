const AWS = require('aws-sdk');
const { AWS_REGION, AWS_SECRET_NAME } = require('./constants');

module.exports = () => {
    const region = AWS_REGION;
    const client = new AWS.SecretsManager({ region });

    const secretId = `${process.env.NODE_ENV}-${AWS_SECRET_NAME}`;
    return new Promise((resolve, reject) => {
        client.getSecretValue({ SecretId: secretId }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const secretsJSON = JSON.parse(data.SecretString);
                let secretsString = '';
                Object.keys(secretsJSON).forEach((key) => {
                    secretsString += `${key}=${secretsJSON[key]}\n`;
                });
                resolve(secretsString);
            }
        });
    });
};
