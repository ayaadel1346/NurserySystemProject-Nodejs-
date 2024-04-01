const express = require('express');
const router = express.Router();
const classController = require('../Controller/classController');
const { insertValidator, updateValidator, deleteValidator, getByIdValidator } = require('../Midelwares/validations/classValidator');
const validationResult = require('../Midelwares/validations/validationResult');
const authenticateToken = require('../Midelwares/authMiddleware');

router.use('/classes', authenticateToken);

router.get('/classes', classController.getAllClasses);

router.get('/classes/:_id', getByIdValidator, validationResult, classController.getClassById);

router.post('/classes', insertValidator, validationResult, classController.insertClass);

router.patch('/classes/:_id', updateValidator, validationResult, classController.updateClass);

router.delete('/classes/:_id', deleteValidator, validationResult, classController.deleteClassById);

module.exports = router;
