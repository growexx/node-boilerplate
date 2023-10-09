const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
const { AWS_REGION, AWS_SECRET_NAME } = require('./constants');

module.exports = async () => {
    const region = AWS_REGION;
    const client = new SecretsManagerClient({ region });

    const secretId = `${process.env.NODE_ENV}-${AWS_SECRET_NAME}`;

    const command = new GetSecretValueCommand({ SecretId: secretId });
    const response = await client.send(command);
    const secretsJSON = JSON.parse(response.SecretString);
    let secretsString = '';

    Object.keys(secretsJSON).forEach((key) => {
        secretsString += `${key}=${secretsJSON[key]}\n`;
    });

    return secretsString;
};
