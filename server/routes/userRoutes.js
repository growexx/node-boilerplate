const router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const ACLMiddleWare = require('../middleware/acl');
const UploadMiddleWare = require('../middleware/upload');
const userProfileController = require('../services/userProfile/userProfileController');

router.get('/details', AuthMiddleWare, ACLMiddleWare, userProfileController.getUserDetails);
router.put('/picture', AuthMiddleWare, ACLMiddleWare, UploadMiddleWare.single('photo'), userProfileController.updateProfilePicture);
router.delete('/picture', AuthMiddleWare, ACLMiddleWare, userProfileController.deleteProfilePicture);
router.put('/password', AuthMiddleWare, userProfileController.changePassword);

module.exports = router;
