const { body, param, query } = require("express-validator");
const Teacher = require('../../models/teacherModel');
const { checkUsernameExistence,checkEmailExistence} = require("../../Controller/checkController");

exports.insertValidator = [
  body("fullname")
    .isString()
    .withMessage("Teacher fullName should be a string")
    .isLength({ min: 3 })
    .withMessage("Teacher fullName length should be greater than 3"),

  body("username")
    .isString()
    .withMessage("Teacher username should be a string")
    .isLength({ min: 4 })
    .withMessage("Teacher username length should be greater than 4")
    .custom(async (value, { req }) => {
      const usernameExists = await checkUsernameExistence(value,Teacher);
      if (usernameExists) {
        throw new Error("please enter another username");
      }
      return true;
    }),

    

  body('password')
    .isLength({ min: 6 })
    .withMessage("Password minimum length should be 6"),

  body('email')
    .isEmail()
    .withMessage("Teacher email is invalid")
    .custom(async (value, { req }) => {
      const emailExists = await checkEmailExistence(value,Teacher);
      if (emailExists) {
        throw new Error("please enter another email");
      }
      return true;
    }),

  body("role")
    .optional()
    .isIn(["teacher", "admin"])
    .withMessage("Teacher role must be either 'teacher' or 'admin'")
    .default("teacher"),
  
  body('image')
    .optional()
    .custom((value, { req }) => {
      if (typeof value !== 'string') {
        throw new Error('Teacher image should be a string');
      }
      return true;
    }),
];

exports.updateValidator = [
  body("_id")
    .optional()
    .isInt()
    .withMessage("Teacher ID should be an integer"),

  body("fullname")
    .optional()
    .isString()
    .withMessage("Teacher fullName should be a string")
    .isLength({ min: 3 })
    .withMessage("Teacher fullName length should be greater than 3"),

  body("username")
    .optional()
    .isString()
    .withMessage("Teacher username should be a string")
    .isLength({ min: 4 })
    .withMessage("Teacher username length should be greater than 4")
    .custom(async (value, { req }) => {
      const usernameExists = await checkUsernameExistence(value,Teacher);
      if (usernameExists) {
        throw new Error("please enter another username");
      }
      return true;
    }),

  body('password')
    .optional()
    .isLength({ min: 6 }),

  body('email')
    .optional()
    .isEmail()
    .custom(async (value, { req }) => {
      const emailExists = await checkEmailExistence(value,Teacher);
      if (emailExists) {
        throw new Error("please enter another email");
      }
      return true;
    }),

  body("role")
    .optional()
    .isIn(["teacher", "admin"])
    .withMessage("Teacher role must be either 'teacher' or 'admin'")
    .default("teacher"),
  
  body('image')
    .optional()
    .custom((value, { req }) => {
      if (typeof value !== 'string') {
        throw new Error('Teacher image should be a string');
      }
      return true;
    }),
];

exports.deleteValidator = [param('_id').isInt().withMessage('Teacher ID must be an integer')];

exports.getByIdValidator = [param('_id').isInt().withMessage('Teacher ID must be an integer')];
