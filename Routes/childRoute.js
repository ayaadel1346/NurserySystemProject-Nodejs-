const express = require('express');
const router = express.Router();
const childController = require('../Controller/childController');
const { insertValidator, updateValidator, deleteValidator, getByIdValidator } = require('../Midelwares/validations/childValidator');
const validationResult = require('../Midelwares/validations/validationResult');
const authenticateToken = require('../Midelwares/authMiddleware'); 


router.use('/children', authenticateToken);

router.get('/children', childController.getAllChildren);

router.get('/children/:_id', getByIdValidator, validationResult, childController.getChildById);

router.post('/children', insertValidator, validationResult, childController.insertChild);

router.patch('/children/:_id', updateValidator, validationResult, childController.updateChild);

router.delete('/children/:_id', deleteValidator, validationResult, childController.deleteChildById);

module.exports = router;
