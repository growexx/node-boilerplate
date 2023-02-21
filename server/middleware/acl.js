const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');

module.exports = function (req, res, next) {
  const accessList = {
    1: [
      { method: 'GET', path: '/user/details' },
      { method: 'PUT', path: '/user/picture' },
      { method: 'DELETE', path: '/user/picture' },
    ],
    4: [
      { method: 'GET', path: '/user/details' },
      { method: 'PUT', path: '/user/picture' },
      { method: 'DELETE', path: '/user/picture' },
      { method: 'GET', path: '/product' },
      { method: 'GET', path: '/product/details' },
      { method: 'POST', path: '/product' },
      { method: 'PUT', path: '/product' },
      { method: 'DELETE', path: '/product' },
    ],
  };
  const role = res.locals.user.role;
  const isAllowed = _.find(accessList[role], {
    method: req.method,
    path: req.originalUrl.split('?')[0],
  });

  if (isAllowed) {
    next();
  } else {
    const responseObject = Utils.errorResponse();
    responseObject.message = res.__('ACCESS_DENIED');
    res.status(HTTPStatus.NOT_ACCEPTABLE).send(responseObject);
    return;
  }
};
