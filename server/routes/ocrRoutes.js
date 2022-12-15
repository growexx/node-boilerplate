const router = require('express').Router();
const UploadMiddleWare = require('../middleware/upload');
const OcrController = require('../services/ocr/ocrController');

router.post('/extract', UploadMiddleWare.single('photo'), OcrController.getText);

module.exports = router;
