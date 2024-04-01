const express = require('express');
const router = express.Router();
const teacherController = require('../Controller/teacherController');
const changePasswordController = require('../Controller/changePasswordController teacher');
const { uploadImage } = require('../Controller/uploadController');
const { insertValidator, updateValidator, deleteValidator, getByIdValidator} = require('../Midelwares/validations/teacherValidator');
const validationResult = require('../Midelwares/validations/validationResult');
const authenticateToken = require('../Midelwares/authMiddleware');
const upload = require('../config/multerConfig');
const teacherSwagger = require('../swagger/teacherSwagger'); 


router.get('/api-docs', (req, res) => {
    res.send(teacherSwagger);
});

router.use('/teachers', authenticateToken);


router.get('/teachers', teacherController.getAllTeachers);

router.get('/teachers/:_id', getByIdValidator, validationResult, teacherController.getTeacherById);

router.post('/teachers',uploadImage, insertValidator, validationResult, teacherController.insertTeacher);


router.patch('/teachers/:_id',uploadImage , updateValidator, validationResult, teacherController.updateTeacher);

router.patch('/teachers/change-password/:_id', changePasswordController.changePassword);

router.delete('/teachers/:_id', deleteValidator, validationResult, teacherController.deleteTeacherById);

module.exports = router;

