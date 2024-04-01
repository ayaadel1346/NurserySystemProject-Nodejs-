const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const { insertValidator } = require('../Midelwares/validations/teacherValidator');
const validationResult = require('../Midelwares/validations/validationResult');
const { registerTeacher, loginTeacher } = require('../Controller/authController');
const { uploadImage } = require('../Controller/uploadController');
const authSwagger = require('../swagger/authSwagger');

router.post('/register', uploadImage, insertValidator, validationResult, registerTeacher);

router.post('/login', loginTeacher);
router.get('/swagger', (req, res) => {
    res.type('text/plain').send(authSwagger);
});

module.exports = router;
