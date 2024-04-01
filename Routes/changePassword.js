const express = require('express');
const router = express.Router();
const changePasswordControllerteacher = require('../Controller/changePasswordController teacher');
const changePasswordControllerchildren = require('../Controller/changePasswordController children');
const authenticateToken = require('../Midelwares/authMiddleware'); 

router.use('/change-password', authenticateToken);
router.patch('/teachers/change-password/:_id', changePasswordControllerteacher.changePassword);
router.patch('/children/change-password/:_id', changePasswordControllerchildren.changePassword);

module.exports = router;
