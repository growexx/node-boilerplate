const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const DbMiddleware = require('../middleware/serverless');
const userProfileController = require('../services/userProfile/userProfileController');

router.get('/details',DbMiddleware, AuthMiddleWare, ACLMiddleWare, userProfileController.getUserDetails);
router.put('/picture',DbMiddleware, AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('photo'), userProfileController.updateProfilePicture);
router.delete('/picture',DbMiddleware, AuthMiddleWare, ACLMiddleWare, userProfileController.deleteProfilePicture);
router.put('/password',DbMiddleware, AuthMiddleWare, userProfileController.changePassword);
router.post('/ftp/upload',DbMiddleware, userProfileController.ftpFileUpload);
router.post('/ftp/download',DbMiddleware, userProfileController.ftpFileDownload);

module.exports = router;
