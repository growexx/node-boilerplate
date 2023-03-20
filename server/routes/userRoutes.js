const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const userProfileController = require('../services/userProfile/userProfileController');
const userFeedbackController = require('../services/userFeedback/userFeedbackController');

router.get('/details', AuthMiddleWare, ACLMiddleWare, userProfileController.getUserDetails);
router.put('/picture', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('photo'), userProfileController.updateProfilePicture);
router.delete('/picture', AuthMiddleWare, ACLMiddleWare, userProfileController.deleteProfilePicture);
router.put('/password', AuthMiddleWare, userProfileController.changePassword);
router.post('/ftp/upload', userProfileController.ftpFileUpload);
router.post('/ftp/download', userProfileController.ftpFileDownload);

// user feedback
router.post('/feedback', AuthMiddleWare, ACLMiddleWare, userFeedbackController.addUserFeedback);
router.get('/feedback/list', AuthMiddleWare, ACLMiddleWare, userFeedbackController.listUserFeedback);
router.get('/feedback/:id', AuthMiddleWare, ACLMiddleWare, userFeedbackController.getUserFeedback);
router.delete('/feedback/:id', AuthMiddleWare, ACLMiddleWare, userFeedbackController.deleteUserFeedback);
router.patch('/feedback/:id', AuthMiddleWare, ACLMiddleWare, userFeedbackController.inActiveUserFeedback);

module.exports = router;
