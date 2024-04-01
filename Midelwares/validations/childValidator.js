const { body, param, query } = require("express-validator");
const Child = require('../../models/childModel');
const { checkUsernameExistence } = require("../../Controller/checkController");

exports.insertValidator = [
  body("username")
    .isString()
    .withMessage("Teacher username should be a string")
    .isLength({ min: 4 })
    .withMessage("Teacher username length should be greater than 4")
    .custom(async (value, { req }) => {
      const usernameExists = await checkUsernameExistence(value, Child);
      if (usernameExists) {
        throw new Error("please enter another username");
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 })
    .withMessage("Password minimum length should be 6"),

  body("fullName")
    .isString()
    .withMessage("Child fullName should be a string")
    .isLength({ min: 3 })
    .withMessage("Child fullName length should be at least 3 characters"),

  body("age")
    .isInt({ min: 1 })
    .withMessage("Age shouldn't be a negative integer"),

  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must be PreKG or KG1 or KG2"),

  body("address.city")
    .isString()
    .withMessage("City should be a string"),

  body("address.street")
    .isString()
    .withMessage("Street should be a string"),

  body("address.building")
    .isString()
    .withMessage("Building should be a string"),

  
];

exports.updateValidator = [
  body("_id")
    .optional()
    .isInt()
    .withMessage("Child ID should be an integer"),

  body("username")
    .optional()
    .isString()
    .withMessage("Teacher username should be a string")
    .isLength({ min: 4 })
    .withMessage("Teacher username length should be greater than 4")
    .custom(async (value, { req }) => {
      const usernameExists = await checkUsernameExistence(value, Child);
      if (usernameExists) {
        throw new Error("please enter another username");
      }
      return true;
    }),

  body('password')
    .optional()
    .isLength({ min: 6 }),

  body("fullName")
    .optional()
    .isString()
    .withMessage("Child fullName should be a string")
    .isLength({ min: 3 })
    .withMessage("Child fullName length should be at least 3 characters"),

  body("age")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Age shouldn't be a negative integer"),

  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must be: PreKG or KG1 or KG2"),

  body("address.city")
    .optional()
    .isString()
    .withMessage("City should be a string"),

  body("address.street")
    .optional()
    .isString()
    .withMessage("Street should be a string"),

  body("address.building")
    .optional()
    .isString()
    .withMessage("Building should be a string"),

];

exports.deleteValidator = [param('_id').isInt().withMessage('_id Must be an integer')];

exports.getByIdValidator = [param('_id').isInt().withMessage('_id Must be an integer')];
