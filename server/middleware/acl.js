const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');

module.exports = function (req, res, next) {
    const accessList = {
        1: [
            { method: 'GET', path: '/user/details' },
            { method: 'PUT', path: '/user/picture' },
            { method: 'DELETE', path: '/user/picture' },
            { method: 'POST', path: '/user/individual-push-notification-for-android' },
            { method: 'POST', path: '/user/individual-push-notification-for-web' },
            { method: 'POST', path: '/user/create-notification' },
            { method: 'PUT', path: '/user/update-push-notification-token' },
            { method: 'POST', path: '/user/send-batch-notification' },
            { method: 'POST', path: '/user/validate-push-notification-token' }
        ],
        4: [
            { method: 'GET', path: '/user/details' },
            { method: 'PUT', path: '/user/picture' },
            { method: 'DELETE', path: '/user/picture' },
            { method: 'POST', path: '/user/individual-push-notification-for-android' },
            { method: 'POST', path: '/user/individual-push-notification-for-web' },
            { method: 'POST', path: '/user/create-notification' },
            { method: 'PUT', path: '/user/update-push-notification-token' },
            { method: 'POST', path: '/user/send-batch-notification' },
            { method: 'POST', path: '/user/validate-push-notification-token' }
        ]
    };

    const role = res.locals.user.role;
    const isAllowed = _.find(accessList[role], { method: req.method, path: req.originalUrl.split('?')[0] });

    if (isAllowed) {
        next();
    } else {
        const responseObject = Utils.errorResponse();
        responseObject.message = res.__('ACCESS_DENIED');
        res.status(HTTPStatus.NOT_ACCEPTABLE).send(responseObject);
        return;
    }
};


